---
title: 모든 객체의 공통 메서드
slug: "common-methods-of-all-objects"
---

## item 10. equals 메서드는 일반 규약을 지켜 정의하라

- 꼭 필요한 경우가 아니라면 equals를 재정의하지 말자
- 다음과 같은 상황일 때는 `equals` 메서드를 재정의 하지 않는 것이 좋다.

  1. 각 인스턴스가 본직적으로 고유하다. ex) 값을 표현하는 게 아니라 동작하는 개체를 표현하는 클래스
  2. 인스턴스의 '논리적 동치성(logical equality)' 를 검사할 일이 없다.
  3. 상위 클래스에서 재정의한 equals가 하위 클래스에도 딱 맞는다.
  4. 클래스가 private 이거나 package-private이고 equals 메서드를 호출할 일이 없다.

- `equals`를 재정의할 때는 객체의 식별성(물리적으로 같은가)이 아니라, 논리적 동치성을 확인해야 한다.
  - `Integer`와 `String` 처럼 값을 표현하는 클래스는 논리적 동치성을 확인해야한다.
- equals 메서드는 동치 관계(equivalence relation)를 구현하며, 다음을 만족한다.
  - 반사성(reflexivity): null이 아닌 모든 참조 값 x에 대해, x.equals(x)는 true이다.
  - 대칭성(symmetry): null이 아닌 모든 참조 값 x, y에 대해 x.equals(y)가 true면 y.equals(x)도 true다.
  - 추이성(transitivity): null이 아닌 모든 참조 값 x, y, z에 대해, x.equals(y)가 true이이고 y.equals(z)가 true이면, x.equals(z)도 true이다.
  - 일관성(consistency): null이 아닌 모든 참조 값 x, y에 대해, x.equals(y)를 반복해서 호출하면 항상 true를 반환하거나 항상 false를 반환한다.
  - null-아님: null이 아닌 모든 참조 값 x에 대해, x.equals(null)은 false이다.
- 양질의 equals 메서드 구현 팁
  1. `==`연산자를 사용해 입력이 자기 자신의 참조인지 확인한다.
  2. `instancsof` 연산자로 입력이 올바른 타입인지 확인한다.
  3. 입력을 올바른 타입으로 형변환한다.
  4. 입력 객체와 자기 자신의 대응되는 **핵심** 필드들이 모두 일치하는지 하나씩 검사한다.
- 주의사항
  - `equals`를 재정의할 땐 `hashCode`도 반드시 재정의하자
  - 너무 복잡하게 해결하려 들지 말자
  - `Object` 외의 타입을 매개변수로 받는 `equals` 메서드는 선언하지자말자

## item 11. equals를 재정의하려거든 hasCode도 재정의하라

- `equals`를 재정의한 클래스 모두에서 `hashCode`도 재정의 해야한다.
- hashCode 일반규약을 어기게되면, HashMap이나 HashSet과 같은 컬랙션의 원소로 사용할 때 문제를 일으킨다.
- Object클래스 명세의 hashCode와 관련된 규약

  1. `equals` 비교에서 사용되는 정보가 변경되지 않았다면, 애플리케이션이 실행되는 동안 그 객체의 `hashCode` 메서드는 몇 번을 호출해도 일관되게 항상 같은 값을 반환해야한다. 단, 애플리케이션을 다시 실행한다면 이 값이 달라져도 상관없다.
  2. `eequals(Object)` 가 두 객체를 같다고 판단했다면, 두 객체의 `hashCode`는 똑같은 값을 반환해야한다.
  3. `quals(Object)` 가 두 객체를 다르게 판단했더라도, 두 객체의 `hashCode`가 서로 다른 값을 반환할 필요는 없다. 단 다른 객체에 대해서는 다른 값을 반환해야 해시테이블의 성능이 좋아진다.

- `2번` 규칙을 지키기위해서 `equals` 메서드를 재정의하면, `hashCode` 값을 재정의해야한다. 해당 규약을 지키지 않으면, HashMap과 HashSet이 의도치 않게 동작하게된다.
- 해시값을 고르게 분포해야 탐색성능이 늘어가게 된다. 잘못 작성된 hashCode 메서드를 사용하면, 한 버킷에 값들이 쌓여, `linked list`와 같이 자료를 탐색해야 해서 성능이 나빠진다.

### 해시 코드 구현 방법

1. 기본 int 변수 선언 (result)
   임의의 비영(非 0) 상수 값으로 초기화 (일반적으로 31 사용).
   31은 홀수이면서 소수(prime number)라 해시 충돌을 줄이는 데 효과적.

```java
@Override
public int hashCode() {
    int result = 17; // 초기값 (임의의 소수)
```

2.  필드를 하나씩 추가하며 31을 곱해 누적
    result = 31 \* result + (필드의 해시값) 형태로 계산.
    31을 곱하면 순서가 다른 객체라도 서로 다른 해시값을 가질 확률이 높아짐.

```java
@Override
public int hashCode() {
    int result = 17;   // 초기값
    result = 31 * result + name.hashCode();  // 문자열 해시 추가
    result = 31 * result + age;  // 기본형 int 추가
    return result;
}
```

3. 다양한 필드 유형 고려

| **타입**                       | **해시 계산법**                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `boolean`                      | `(b ? 1 : 0)`                                                                                               |
| `byte`, `char`, `short`, `int` | 값 그대로 사용 (`result = 31 * result + value`)                                                             |
| `long`                         | `(int) (value ^ (value >>> 32))` (비트 시프트 활용)                                                         |
| `float`                        | `Float.floatToIntBits(value)` 사용                                                                          |
| `double`                       | `Double.hashCode(value)` 또는 `(int) (temp ^ (temp >>> 32))` (`long temp = Double.doubleToLongBits(value)`) |
| `Object`                       | `Objects.hashCode(value)` (`null` 처리 포함)                                                                |
| `Array`                        | `Arrays.hashCode(array)` 사용                                                                               |

- 성능이 아쉽지만 `Ojbects`클래스의 `hash`메서드를 사용하면 간단하기 구현할 수 있다.

### tips

- 클래스가 불변이고, 해시코드 계산에 비용이 크게든다면, 캐시를 고려하라
- 성능을 높인답시고, 해시코드를 계산할때 핵심 필드를 생략해서는 안된다.
- hashCode 가 반환하는 값의 생성 규칙을 API 사용자에게 자세히 공표하지 말자

## item 12. toString을 항상 재정의하라

- `toString`의 규약을 살펴보면 모든 하위 클래스에서 재정의해야 한다.
  - 간결하면서 사람이 읽기 쉬운 형태의 유익한 정보를 제공해야한다.
  - 오버라이딩을 하지 않으면 `클래스_이름@16진수로_표시한_해시코드` 값을 반환한다.
  - `toString` 메서드는 많은 곳에서 호출 되기 때문에, 잘 정의한다면, 정보를 파악하기 쉽게한다.

### 법칙

- 객체가 가진 주요 정보를 모두 반환하는 게 좋다.
- 포맷을 문서화할지 선택하라
  - 포맷을 명시하면 그 객체는 포준적이고, 명확하고 사람이 읽을 수 있게 된다.
  - 하지만 포맷을 명시한다면, 평생 그 포맷에 수많은 코드가 얽매이게 된다.
- 의도를 명확히 밝혀야한다.
- `toString`이 반환하는 모든 값들은 접근자를 제공해야한다.
- `toString`을 자동으로 생성해주는 기능들도 존재하지만, 이는 의미를 정확히 나타내주진 못한다.
