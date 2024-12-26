---
title: item 2. 빌더 패턴
slug: "effective-java-item-2"
---

## 대안 1: 점층적 생성자 패턴 (Telescoping Constructor Pattern)
* 오버로딩을 활용하여 선택적 매개변수에 기본값을 설정한다.
* 간단한 경우에는 효과적이지만, 매개변수의 수가 많아질수록 코드의 가독성과 유지보수성이 떨어진다.
* 생성자 호출 시 매개변수의 순서를 혼동하기 쉽다.

## 대안 2: 자바빈즈 패턴 (JavaBeans Pattern)
* 매개변수가 없는 기본 생성자를 호출한 뒤, `setter` 메서드들을 이용하여 값을 설정한다.
* 인스턴스 생성 과정이 직관적이고, 코드의 가독성이 높다.
* 하지만 다음과 같은 단점이 있다:
  * 객체가 완전히 초기화되기 전에 불완전한 상태로 사용될 위험이 있다.
  * 클래스를 불변(Immutable)으로 만들 수 없다.

## 대안 3: 빌더 패턴 (Builder Pattern)
* 선택적 매개변수가 많을 때 적합한 방법으로, 객체 생성과정의 가독성과 안정성을 동시에 높인다.
* 빌더 패턴의 사용 과정:
  1. 필수 매개변수를 지정하여 빌더 객체를 생성한다.
  2. 빌더 객체에서 제공하는 메서드들을 체이닝 방식으로 호출하여 선택적 매개변수를 설정한다.
  3. `build()` 메서드를 호출하여 최종 객체를 생성한다.
* 주요 특징:
  * 클래스 내부에 `static` 멤버 클래스 형태로 빌더를 구현한다.
  * 빌더의 메서드는 빌더 인스턴스를 반환하여 체이닝을 가능하게 한다.
  * 계층적으로 설계된 클래스에도 적용하기 쉽다.
* 단점:
  * 코드가 비교적 길어질 수 있다.
  * 객체 생성 시 약간의 오버헤드가 발생할 수 있다.

## 결론
점층적 생성자 패턴, 자바빈즈 패턴, 빌더 패턴 각각의 장단점을 고려하여 상황에 맞는 객체 생성 방식을 선택해야 한다. 특히, 선택적 매개변수가 많거나 객체의 불변성을 보장해야 하는 경우 빌더 패턴이 가장 강력한 대안이 될 수 있다.
