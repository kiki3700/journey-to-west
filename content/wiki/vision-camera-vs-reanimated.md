---
title: 'React Native Frame Processor: JSI 런타임 격리와 크래시 원인 분석'
slug: 'vision-camera-vs-reanimated' 
---
## 서론 
엣지 디바이스 형식으로 객체 인식 모델을 카메라에 올리는 작업을 진행하며 다중 런타임 환경에서 발생한 이슈들을 정리한다.

## 앱 구성
* new-architecture: true
* 의존성
    * expo sdk 54
    * react-native-reanivatie: v3
    * vision-camera: v4
    * react-native-worklets-core: 1.6.2
    * skia: 2.2.12
## 1. 문제 현상
* 앱 초기화 크래쉬 현상 `Property '_WORKLET' doesn't exist` 
    `reanimatedV4`사용시 `vision-camera`와 동일한 이름의 C++ 클래스나 함수를 다르개 구현하여 사용하여, 네이티브 모듈 로딩 단계에서 크래시 발생 -> `reanimatedV3`로 변경
* 프레임 프로세서에서 발생한 두가지 크래시 상황
```js
const sv = useSharedValue(0);

useFrameProcessor((frame) => {
  'worklet';
  // 1. 데이터 갱신 실패 (값 복사 문제)
  sv.value = frame.width; 
  
  // 2. 앱 강제 종료 (SIGSEGV)
  runOnJS(callback)(frame.width); 
}, []);
```

## 2. 원인 분석: 서로 다른 런타임 의존성

가장 근본적인 원인은 두 라이브러리가 사용하는 Worklet 시스템(JSI 런타임 구현체)이 서로 다르기 때문이다.

Vision Camera: react-native-worklets-core (Margelo) 기반의 런타임 사용

Reanimated: 자체 react-native-worklets (Software Mansion) 기반의 런타임 사용

이 두 런타임은 C++ 레벨에서 메모리 구조나 객체 처리 방식이 호환되지 않으며, 이로 인해 다음과 같은 두 가지 현상이 발생한다.

### A. HostObject 연결 끊김 (Silent Failure)

Vision Camera 런타임으로 Reanimated의 객체(SharedValue 등)가 전달될 때, 해당 런타임은 이 객체를 처리할 수 있는 C++ 바인딩을 가지고 있지 않다.

따라서 JSI는 이 객체를 원본 C++ 메모리와 연결된 HostObject(참조)로 넘기는 것을 포기한다.

대신 연결이 끊긴 **일반 자바스크립트 객체(Plain JS Object)로 값을 복사(Clone)**하여 전달한다.

결과적으로 값을 수정하거나 읽어도, 이는 복제된 껍데기일 뿐 원본 데이터와는 아무런 관련이 없다.

### B. 직접 실행 시 크래시 (Context Crash)

더 심각한 문제는 Reanimated의 함수(runOnJS 등)를 직접 실행할 때 발생한다.

이 함수들은 실행 시 자신이 Reanimated 런타임 컨텍스트 위에 있다고 가정하고, 스레드 로컬 저장소에서 특정 스케줄러나 리소스를 직접 조회(Direct Access)하려 시도한다.

하지만 현재 실행 중인 Vision Camera 스레드에는 해당 리소스가 존재하지 않으므로, 유효하지 않은 메모리 주소에 접근하게 된다.

이로 인해 운영체제는 메모리 보호 위반을 감지하고 프로세스를 강제 종료(SIGSEGV)시킨다.

## 3. 해결: Worklets Core를 이용한 명시적 스레드 전환

이 문제를 해결하는 유일한 방법은 호환되지 않는 런타임에서 무리하게 객체를 조작하거나 함수를 실행하지 않는 것이다. 대신 Vision Camera가 제공하는 Worklets를 사용하여 안전한 JS 스레드로 이동한 후 로직을 수행해야 한다.
``` js
import { Worklets } from 'react-native-worklets-core';

// 1. JS 스레드에서 실행될 함수 생성
// 이 함수는 Vision Camera 런타임에서 호출되더라도, 안전하게 메인 JS 스레드로 전환되어 실행된다.
const handleOnJS = Worklets.createRunOnJS((width) => {
  'worklet';
  console.log('JS 스레드에서 안전하게 실행됨:', width);
  // 여기서는 Reanimated를 쓰든, 상태 관리를 하든 자유롭게 가능
});

useFrameProcessor((frame) => {
  'worklet';
  
  // 2. 필요한 데이터만 추출 (Primitive Value)
  const width = frame.width;
  
  // 3. 스레드 전환 함수 호출
  handleOnJS(width);
}, []);

```
