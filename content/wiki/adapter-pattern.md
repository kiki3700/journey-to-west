---
title: 어댑터 패턴
slug: "adapter-pattern"
---

## 정의

- 어댑터 패턴은 클래스 인터페이스를 사용자가 기대하는 다른 인터페이스로 변환하는 패턴으로, 호환성 없는 인터페이스 때문에 함께 동작할 수 없는 클래스들이 함께 작동하도록 해준다.

## 다이어그램

### 객체 어댑터

![adapter-pattern](../../src/images/object-adapter-pattern.png)

1. 클라이언트: 기존 비즈니스 로직이 포함된 클래스
2. 클라이언트 인터페이스: 다른 클래스들이 클라이언트와 공동 작업을 할 수 있도록 따라야 하는 프로토콜을 의미
3. 서비스(adaptee): 일반적으로 타사 또는 레거시 클래스. 클라이언트와 호환되지 않는다.
4. 어댑터: 클라이언트와 서비스 양쪽에서 작동할 수 있는 클래스로, 서비스 객체를 래핑하는 동안 클라이언트 인터페이스를 구현한다. 어댑터는 인터페이스를 통해 클라이언트의 요청을 래핑된 서비스 객체가 이해할수 있는 형식으로 변환하여 호출한다.
   클라이언트 코드는 인터페이스를 통해 어댑터를 작동하는한 구상 어댑터 클래스와 결합하지 않는다.
   덕분에 기존 클라이언트 코드를 손상시키지 않고, 새로운 유형의 어댑터들을 프로그램에 도입할 수 있다.

### 클래스 어댑터

- 클래스 어댑터는 동시에 두 객체의 인터페이스를 상속한다.
- 조합이 아닌 상속을 사용해야한다.
- 다중상속을 사용하므로 C++과 같은 다중상속을 지원하는 프로그래밍 언어에서만 구현할 수 있다.
  ![class-adapter-pattern](../../src/images/class-adapter-pattern.png)

1. 클래스 어댑터: 객체를 래핑하지 않는다. 클라이언트와 서비스 양쪽에서 행동을 상속받는다. 오버라이딩 된 메서드에서 어댑테이션된다.
