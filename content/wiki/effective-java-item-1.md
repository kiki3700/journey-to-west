---
title: item 1. 정적 팩토리 메소드
slug: "effective-java-item-1"
---
* 정적 팩터리 메서드는 GOF 의 팩토리 메서드 패턴과는 다르다.
* 정적 팩터리 메서드는 public 생성자를 사용하지 않고, 해당 클래스의 인스턴스를 반환하는 단순한 정적 메서드를 말한다.
```java
public static Boolean valueOf(boolean b){
    return b? Boolean.TRUE : Boolean.FALSE;
}
```
### 장점
1. 이름을 가질 수 있다. 
    * 생성할 객체의 특성을 담아 이름을 지을 수 있다.
    * 생성자는 하나의 시그니처로 하나의 생성자만 만들 수 있지만, 정적 팩터리 메서드는 다르다.
2. 호출될 때 마다 객체를 생성하지 않아도 된다.
    * 호출시 이미 생성된 인스턴스를 반환 할 수 있어, 불필요한 객체 생성을 방지 할 수 있다.
3. 반환 타입의 하위 타입 객체를 반환할 수 있다.
    * 구체적인 반환 타입을 숨길 수 있기 때문에 API를 작게 유지할 수 있다.
4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환 할 수 있다.
5. 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재 하지 않아도 된다.
4~5번은 3번에서 파생된 장점이라고 생각한다.

## 단점
1. 하위클래스를 만들수 없을 수도 있다.
    * 상속시 public 이나 protected 생성자가 필요한데, private 생성자와 정적 팩터리 메서드만 사용하면, 상속을 할 수 잇따.
    * 오히려 상속보다 합성을 장려하여 장점이라고 받아드릴 수 있다.