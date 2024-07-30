---
title: Liskov Substitution Principle
slug: "liskov-substitution-principle"
---
## 개념
* LSP(Liskov Substitution Principle)는 `하위 타입(서브 타입)`은 언제나 `상위 타입(기반 타입)`으로 치환 가능 해야한다는 원칙.
	* 즉 상위 타입의 객체를 사용하는 모든 곳에서 하위 타입의 객체를 대체해도 프로그램의 기능에 문제가 없어야한다.

## LSP의 중요성
* 코드의 유연성과 재사용성 증대: 서브타입을 기반타입으로 치환해도 프로그램이 올바르게 작동하기 때문에 코드에 유연성이 높아지고, 재사용성이 증대된다.
* 유지보수 용의성: 서브타입을 도입하거나 변경하더라도, 다른 부분에 영향을 최소화하여 유지보수성이 높아진다.
* 예측 가능성: 코드의 동작을 쉽게만들어 버그를 줄일 수 있다.
* 테스트 용이성 
  
## 상세 원칙
1. 행동적 일관성 (Behavioral Consistency):
	* 서브 타입은 기반 타입의 행동을 유지해야한다. 즉, 서브타입의 인스턴스를 기반 타입의 인스턴스와 같이 사용하더라도 기대되는 행동이 변하지 않아야한다.
	* 기반 타입의 계약(사전 조건, 사후 조건)을 위반하지 않았음을 의미
2. 사전 조건 (Preconditions):
	* 서브 타입의 메서드는 기반 타입의 메서드보다 강한 사전 조건을 요구해서는 안된다.
	* 기반 타입의 메서드가 받을 수 있는 모든 입력을 서브 타입의 메서드도 받아드릴 수 있어야한다.
	```java
	// 잘못된 예시
	class Bird {
	    void fly(int altitude) {
		if (altitude < 0) {
		    throw new IllegalArgumentException("Altitude must be non-negative");
		}
		System.out.println("Flying at altitude " + altitude);
	    }
	}

	class Sparrow extends Bird {
	    @Override
	    void fly(int altitude) {
		if (altitude < 100) {
		    throw new IllegalArgumentException("Penguins can only fly at altitudes of 100 or higher");
		}
		System.out.println("Sparrow flying at altitude " + altitude);
	    }
	}
	```
4. 사후 조건 (Postconditions):
	* 서브 타입의 메서드는 기반 타입의 메서드가 보장하는 사후 조건을 최소한 유지해야하거나 강화해야한다.
	* 기반 타입의 메서드가 제공하는 모든 출력을 서브 타입의 메서드도 제공할 수 있어야한다.
5. 불변 조건 (Invariants):
	* 서브 타입은 기반 타입의 불변 조건을 유지해야한다.
	* 클래스가 항상 특정 조건을 만족해야함을 의미한다.
6. 매개 변수의 반공병성 (Constravariance of Method Arguments):
	* 메서드 인수 타입이 기반 타입의 메서드 인수 타입보다 더 일반적수 있다.
	* 메서드 오버라이딩 시 인수 타입을 더 구체적인 타입을 바꾸는 것을 허용하지 않음을 의미
	* 서브 클래스가 더 일반적인 매개변수를 받도록 허용하면, 서브 클래스가 기반 클래스의 모든 상황을 처리할 수 있어 유연성과, 코드 재사용성이 높아진다.
	```java
	// 잘못된 예시
	class Animal {}

	class Dog extends Animal {}

	class AnimalHandler {
	    void handle(Animal animal) {
		System.out.println("Handling an animal");
	    }
	}

	// 클래스가 기반 클래스를 확장하지 못했다.
	class DogHandler extends AnimalHandler {
	    @Override
	    void handle(Dog dog) {
		System.out.println("Handling a dog");
	    }
	}
	```
7. 공변 반환 타입 (Covariance of Return Types):
	* 메서드 반환 타입이 기반 타입의 메서드 반환 타입보다 더 구체적일 수 있다.
