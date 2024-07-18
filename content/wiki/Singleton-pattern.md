---
title: Singleton-pattern
slug: "singleton-pattern"
---

## 싱글턴 패턴

### 정의

- 클래스 인스턴스를 하나만 만들고, 그 인스턴스의 전역 접근을 제공한다.
-

### 필요한 이유

- 객체가 하나가 필요한 경우
  - 자원을 불필요하게 잡아먹는 경우
  - 2개 이상의 인스턴스로 인해 버그가 발생할 수 있는경우
- 전역 변수 보다 싱글턴 패턴이 좋은 이유는?
  - 전역 변수는 애플리케이션이 시작할 때 생성되기 때문에 쓸때없이 자원을 잡아 먹을 수 있다.
  - 싱글턴 패턴은 필요할 때 생성 할 수 있다.

### 고전적인 싱글턴 구현법

```java
public class Singleton {
	private static Singleton uniqueInstance;

	private Singleton() {} //private 접근자를 통해 생성자를 구현

	// getInstance를 통해 이미 생성된 객체를 반환하거나 새로 객체를 만들어
	// 반환할 수 있다.
	public Singleton getInstance() {
		if (uniqueInstance == null) {
			uniqueInstance = new Singleton();
		}
		return uniqueInstance;
	}
	...
}
```

### 주의 사항

- 고전적 접근 법에서는 멀티스레딩에서 오류가 발생할 수 있다.
- 직렬화 역직렬화 사용시 문제가 될 수 있다. 역직렬화 시 객체가 새로 생성된다.
- 리플렉션 사용시 문제가 된다. 레플렉션은 접근제한자에 상관없이 클래스의 필드나 메서드에 접근할 수있다.

### 해결법

- Enum 사용
  - 이넘은 자바에서 본질적으로 싱클턴이다.
  - jvm이 이넘을 로드할때 한 번만 인스턴스화 된다.
    - 위에서 말한 전역변수와 구현된 싱글턴 패턴의 문제를 방지할 수 있다.

```java
public enum Singleton {
	UNIQUE_INSTANCE;
	...
}
```
