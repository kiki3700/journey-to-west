---
title: 객체 생성과 파괴
slug: "object-creation-and-destruction"
---

## item 1. 정적 팩토리 메소드

정적 팩토리 메서드는 객체의 생성에 의미를 부여할 수 있다.

- 정적 팩터리 메서드는 GOF 의 팩토리 메서드 패턴과는 다르다.
- 정적 팩터리 메서드는 public 생성자를 사용하지 않고, 해당 클래스의 인스턴스를 반환하는 단순한 정적 메서드를 말한다.

```java
public static Boolean valueOf(boolean b){
    return b? Boolean.TRUE : Boolean.FALSE;
}
```

### 장점

1. 이름을 가질 수 있다.
   - 생성할 객체의 특성을 담아 이름을 지을 수 있다.
   - 생성자는 하나의 시그니처로 하나의 생성자만 만들 수 있지만, 정적 팩터리 메서드는 다르다.
2. 호출될 때 마다 객체를 생성하지 않아도 된다.
   - 호출시 이미 생성된 인스턴스를 반환 할 수 있어, 불필요한 객체 생성을 방지 할 수 있다.
3. 반환 타입의 하위 타입 객체를 반환할 수 있다.
   - 구체적인 반환 타입을 숨길 수 있기 때문에 API를 작게 유지할 수 있다.
4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환 할 수 있다.
5. 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재 하지 않아도 된다.
   4~5번은 3번에서 파생된 장점이라고 생각한다.

## 단점

1. 하위클래스를 만들수 없을 수도 있다.
   - 상속시 public 이나 protected 생성자가 필요한데, private 생성자와 정적 팩터리 메서드만 사용하면, 상속을 할 수 잇따.
   - 오히려 상속보다 합성을 장려하여 장점이라고 받아드릴 수 있다.

## item 2. 빌더 패턴

파라미터가 우후죽순으로 늘어나는 경우 빌더 패턴을 사용해, 안전하게 객체를 생성하며, 편리하게 객체를 생성할 수 있다.
생성자 파라미터가 늘어나는 경우 어떻게 대처할 수 있는지 파악해보자

### 대안 1: 점층적 생성자 패턴 (Telescoping Constructor Pattern)

점층적 생성자 패턴은 객체 생성 시 선택적 매개변수의 기본값을 설정하기 위해 생성자 오버로딩을 활용하는 방법이다. 이 접근법은 간단한 구조에서 유용하나, 매개변수가 많아질수록 유지보수성과 가독성이 심각하게 저하된다.

1. **구조적 단순성**: 필수 매개변수만으로도 객체를 생성할 수 있으며, 추가적인 매개변수는 선택적으로 제공한다.
2. **단점**: 매개변수의 순서에 의존하는 설계로 인해 실수 가능성이 증가하며, 코드의 유연성이 제한된다.

### 예제:

```java
public class NutritionFacts {
    private final int servingSize; // 필수
    private final int servings;    // 필수
    private final int calories;   // 선택
    private final int fat;        // 선택

    public NutritionFacts(int servingSize, int servings) {
        this(servingSize, servings, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories) {
        this(servingSize, servings, calories, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat) {
        this.servingSize = servingSize;
        this.servings = servings;
        this.calories = calories;
        this.fat = fat;
    }
}
```

## 대안 2: 자바빈즈 패턴 (JavaBeans Pattern)

자바빈즈 패턴은 매개변수가 없는 기본 생성자로 객체를 생성한 뒤, `setter` 메서드를 사용하여 값을 설정한다. 이 접근법은 직관적이고 코드의 가독성이 높아 초보 개발자들에게 선호되지만, 심각한 단점을 내포하고 있다.

1. **장점**:
   - 객체 초기화 코드가 명확하고 유연하다.
   - 특정 속성만 초기화하거나, 필요에 따라 동적으로 설정 가능하다.
2. **단점**:
   - 객체가 불완전한 상태로 생성될 가능성이 있으며, 이는 런타임 에러를 유발할 수 있다.
   - 불변 객체(Immutable Object)를 생성할 수 없다는 구조적 제한이 존재한다.

### 예제:

```java
public class NutritionFacts {
    private int servingSize; // 필수
    private int servings;    // 필수
    private int calories;   // 선택
    private int fat;        // 선택

    public NutritionFacts() {}

    public void setServingSize(int servingSize) { this.servingSize = servingSize; }
    public void setServings(int servings) { this.servings = servings; }
    public void setCalories(int calories) { this.calories = calories; }
    public void setFat(int fat) { this.fat = fat; }
}
```

## 대안 3: 빌더 패턴 (Builder Pattern)

빌더 패턴은 복잡한 객체 생성 과정을 효율적으로 관리하며, 특히 선택적 매개변수가 많은 경우에 적합하다. 이 패턴은 객체 생성의 안정성과 가독성을 크게 향상시키며, 계층적으로 설계된 클래스에서도 효과적으로 동작한다.

1. **핵심 원칙**:
   - 필수 매개변수를 통해 빌더 객체를 생성한다.
   - 빌더 객체의 메서드를 체이닝 방식으로 호출하여 선택적 매개변수를 설정한다.
   - 최종적으로 `build()` 메서드를 호출하여 객체를 반환한다.
2. **장점**:
   - 불변 객체를 손쉽게 생성할 수 있다.
   - 코드의 명확성과 유지보수성이 높아진다.
3. **단점**:
   - 클래스 설계와 구현이 상대적으로 복잡하다.
   - 추가적인 메모리 소비가 발생할 수 있다.

### 예제:

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;

    public static class Builder {
        private final int servingSize; // 필수
        private final int servings;    // 필수

        private int calories = 0;      // 기본값
        private int fat = 0;           // 기본값

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val) { this.calories = val; return this; }
        public Builder fat(int val) { this.fat = val; return this; }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
        fat = builder.fat;
    }
}
```

### 결론

세 가지 접근법은 각각 고유한 장단점을 가지고 있으며, 상황에 따라 적합한 방식을 선택해야 한다. 특히 선택적 매개변수가 많고 객체의 불변성이 요구되는 경우, 빌더 패턴은 가장 이상적인 해결책으로 여겨진다. 이는 객체 생성의 명확성과 안정성을 보장함과 동시에, 코드 유지보수성을 극대화할 수 있기 때문이다.

## item 6. 불필요한 개객체 생성을 피하라

### 불필요한 객체 생성 방지
점층적 생성자 패턴은 객체 생성 시 선택적 매개변수의 기본값을 설정하기 위해 생성자 오버로딩을 활용하는 방법이다. 이 접근법은 간단한 구조에서 유용하나, 매개변수가 많아질수록 유지보수성과 가독성이 심각하게 저하된다.

1. **구조적 단순성**: 필수 매개변수만으로도 객체를 생성할 수 있으며, 추가적인 매개변수는 선택적으로 제공한다.
2. **단점**: 매개변수의 순서에 의존하는 설계로 인해 실수 가능성이 증가하며, 코드의 유연성이 제한된다.

### 예제:

```java
public class NutritionFacts {
    private final int servingSize; // 필수
    private final int servings;    // 필수
    private final int calories;   // 선택
    private final int fat;        // 선택

    public NutritionFacts(int servingSize, int servings) {
        this(servingSize, servings, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories) {
        this(servingSize, servings, calories, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat) {
        this.servingSize = servingSize;
        this.servings = servings;
        this.calories = calories;
        this.fat = fat;
    }
}
```

## 대안 2: 자바빈즈 패턴 (JavaBeans Pattern)

자바빈즈 패턴은 매개변수가 없는 기본 생성자로 객체를 생성한 뒤, `setter` 메서드를 사용하여 값을 설정한다. 이 접근법은 직관적이고 코드의 가독성이 높아 초보 개발자들에게 선호되지만, 심각한 단점을 내포하고 있다.

1. **장점**:
   - 객체 초기화 코드가 명확하고 유연하다.
   - 특정 속성만 초기화하거나, 필요에 따라 동적으로 설정 가능하다.
2. **단점**:
   - 객체가 불완전한 상태로 생성될 가능성이 있으며, 이는 런타임 에러를 유발할 수 있다.
   - 불변 객체(Immutable Object)를 생성할 수 없다는 구조적 제한이 존재한다.

### 예제:

```java
public class NutritionFacts {
    private int servingSize; // 필수
    private int servings;    // 필수
    private int calories;   // 선택
    private int fat;        // 선택

    public NutritionFacts() {}

    public void setServingSize(int servingSize) { this.servingSize = servingSize; }
    public void setServings(int servings) { this.servings = servings; }
    public void setCalories(int calories) { this.calories = calories; }
    public void setFat(int fat) { this.fat = fat; }
}
```

## 대안 3: 빌더 패턴 (Builder Pattern)

빌더 패턴은 복잡한 객체 생성 과정을 효율적으로 관리하며, 특히 선택적 매개변수가 많은 경우에 적합하다. 이 패턴은 객체 생성의 안정성과 가독성을 크게 향상시키며, 계층적으로 설계된 클래스에서도 효과적으로 동작한다.

1. **핵심 원칙**:
   - 필수 매개변수를 통해 빌더 객체를 생성한다.
   - 빌더 객체의 메서드를 체이닝 방식으로 호출하여 선택적 매개변수를 설정한다.
   - 최종적으로 `build()` 메서드를 호출하여 객체를 반환한다.
2. **장점**:
   - 불변 객체를 손쉽게 생성할 수 있다.
   - 코드의 명확성과 유지보수성이 높아진다.
3. **단점**:
   - 클래스 설계와 구현이 상대적으로 복잡하다.
   - 추가적인 메모리 소비가 발생할 수 있다.

### 예제:

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;

    public static class Builder {
        private final int servingSize; // 필수
        private final int servings;    // 필수

        private int calories = 0;      // 기본값
        private int fat = 0;           // 기본값

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val) { this.calories = val; return this; }
        public Builder fat(int val) { this.fat = val; return this; }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
        fat = builder.fat;
    }
}
```

### 결론

세 가지 접근법은 각각 고유한 장단점을 가지고 있으며, 상황에 따라 적합한 방식을 선택해야 한다. 특히 선택적 매개변수가 많고 객체의 불변성이 요구되는 경우, 빌더 패턴은 가장 이상적인 해결책으로 여겨진다. 이는 객체 생성의 명확성과 안정성을 보장함과 동시에, 코드 유지보수성을 극대화할 수 있기 때문이다.

## item 3. private 생성자나 열거형 타입으로 싱글턴임을 보증하라

### private 생성자 방식

```java
public class Elvis {
        public static final Elvis INSTANCE = new Elvis();
        private Elvis() { ...}

        public void leaveTheBuilding() {...}
}
```

- private 생성자는 INSTANCE를 초기화할 때 한 번만 호출됨
- API에 싱글턴임을 명확히 할 수 있다.
- 간결하다
- 직렬화시, readResovle 메소드를 제공하지 않으면, 역직렬화 시 새로운 인스턴스가 생성된다.

### 정적 팩토리 방식

```java
public class Elvis {
        private static final Elvis INSTANCE = new Elvis();

        public static Elvis getInstance() {
            return INSTANCE;
        }
```

- 해당 클래스가 싱글턴 패턴을 더 이상 사용하지 않을 때, API를 변경하지 않을 수 있다.
- 정적 팩토리의 메서드 참조를 공급자로 사용할 수 있다
- 직렬화시, readResovle 메소드를 제공하지 않으면, 역직렬화 시 새로운 인스턴스가 생성된다.

### 열거형 타입 방식

```java
public enum Elvis {
    INSTANCE;

    public void leaveTheBuilding() {...}
}
```

- 제일 간견하고, 역직렬화 시 위에서 서술한 문제가 발생하지 않는다.

## item 4. 인스턴트화를 막기위해 private 생성자를 사용하라

- 정적 메서드와 정적 필드만을 담은 클래스(Utils 클래스)를 만들 때, 인슽턴스 생성을 방지하기 위해 private 생성자를 사용해 객체 생성을 막아라

```java
public class Utils {
    public Utils getInstance() {
        throw new AssertionError("No instances allowed!");
    }

    public static void doSomething() {
        ...
    }
```

## item 6. 불필요한 객체 생성을 피하라

### 불필요한 객체 생성 방지

불필요한 객체 생성을 줄이는 것은 특히 자원이 많이 소모되는 애플리케이션에서 성능 문제를 방지하는 데 중요합니다. 동일한 객체를 반복적으로 생성하기보다는 기존 객체를 재사용하는 것이 더 효율적입니다. 아래는 불필요한 객체 생성을 최소화하기 위한 지침과 예제입니다.

---

#### 1. 문자열 리터럴 사용

문자열을 생성할 때 `new String()` 대신 문자열 리터럴을 사용하는 것이 좋습니다. 문자열 리터럴은 문자열 풀(String Pool)에 저장되어 동일한 값을 가진 문자열을 재사용할 수 있습니다.

**예제:**

```java
// 비효율적: 매번 새로운 String 객체를 생성
String str1 = new String("안녕하세요");
String str2 = new String("안녕하세요"); // 새로운 객체 생성

// 효율적: 문자열 풀에서 동일 객체를 재사용
String str1 = "안녕하세요";
String str2 = "안녕하세요"; // 동일 객체 재사용

// 메모리 동작:
// "안녕하세요" 객체는 문자열 풀에 한 번만 저장되며 str1과 str2는 이를 참조합니다.
```

---

---

#### 문자열이 메모리에 저장되는 방식

- **문자열 풀(String Pool):** Java는 문자열 리터럴을 힙 메모리 영역 속 특별한 메모리 영역인 문자열 풀에 저장합니다. 새로운 문자열 리터럴이 생성되면 Java는 동일한 문자열이 풀에 존재하는지 확인하고, 존재하면 기존 객체를 재사용하며, 없으면 새 객체를 생성해 풀에 추가합니다.

**예제:**

```java
String s1 = "예제";
String s2 = "예제"; // s1의 객체 재사용

String s3 = new String("예제"); // 풀 외부에 새로운 객체 생성

// 메모리 동작:
// s1과 s2는 문자열 풀의 동일 객체를 참조
// s3는 힙 영역의 별도 객체를 참조
```

---

#### 2. 정적 팩토리 메서드 사용

정적 팩토리 메서드는 새로운 객체를 생성하는 대신 기존 객체를 반환하여 불필요한 객체 생성을 줄일 수 있습니다.

**예제:**

```java
// Boolean.valueOf를 사용하여 인스턴스 재사용
Boolean b1 = Boolean.valueOf(true); // 미리 생성된 인스턴스 재사용
Boolean b2 = Boolean.valueOf(true); // b1과 동일 인스턴스 반환

// 비효율적 대안:
Boolean b1 = new Boolean(true); // 새로운 객체 생성
Boolean b2 = new Boolean(true); // 또 다른 새로운 객체 생성
```

**설명:**

- `Boolean.valueOf(true)`는 캐싱된 `Boolean.TRUE` 인스턴스를 반환합니다.
- 이를 통해 동일 값에 대해 여러 Boolean 객체를 생성하지 않습니다.

---

#### 3. 클래스 초기화 과정에서 객체 캐싱

생성이 비용이 많이 들고 자주 사용되는 객체는 한 번 초기화하여 캐싱한 후 재사용하는 것이 좋습니다.

**예제:**

```java
// 비효율적: 매번 새로운 Date 객체 생성
public class DateUtility {
    public Date getCurrentDate() {
        return new Date();
    }
}

// 효율적: 객체를 캐싱하여 재사용
public class DateUtility {
    private static final Date EPOCH_DATE = new Date(0); // 캐싱된 인스턴스

    public static Date getEpochDate() {
        return EPOCH_DATE;
    }
}
```

**설명:**

- `EPOCH_DATE`를 캐싱하여 동일한 값의 `Date` 객체를 여러 번 생성하지 않도록 합니다.

---

#### 4. 오토박싱 오버헤드 방지

기본 타입과 래퍼 클래스를 변환할 때 오토박싱은 불필요한 객체를 생성할 수 있습니다. 가능한 경우 기본 타입을 사용하는 것이 좋습니다.

**예제:**

```java
// 비효율적: 오토박싱으로 인해 불필요한 Integer 객체 생성
Integer sum = 0;
for (int i = 0; i < 1000; i++) {
    sum += i; // 매 반복마다 오토박싱 발생
}

// 효율적: 기본 타입 사용
int sum = 0;
for (int i = 0; i < 1000; i++) {
    sum += i;
}
```

**설명:**

- 첫 번째 예제에서는 각 덧셈 연산에서 새로운 `Integer` 객체가 생성됩니다.
- 기본 타입을 사용하면 이러한 오버헤드를 방지할 수 있습니다.

위의 지침을 따르면 불필요한 객체 생성을 줄이고 애플리케이션 성능을 향상시킬 수 있습니다.

## item 7. 다 쓴 객체 참조를 해제하라

- 사용하지 않는 객체들의 참조를 부지런히 해제하면 메모리 누수로 발생하는 이슈들을 방지하고, 성능에 좋은 영향을 미칠 수 있다.
- 참조를 다 썼을 때 명시적으로 null 처리를 통해 참조를 해제할 수 있다. 하지만 너무 오용하다 보면 유지보수성을 떨어트릴 수 있다.
- 변수의 유효범위를 좁히는 것이 더 나은 설계이다.
  - 필요 이상으로 오래 참조를 유지하지 않는 설계
  ```java
  // 권장되는 방식: 유효 범위를 좁게 설계
  public void example() {
     if (someCondition) {
         Object obj = new Object();  // 필요할 때 생성
         // ... 객체 사용 ...
     }  // 유효 범위가 끝나면 obj는 GC의 대상이 됨
  }
  ```

* 캐시를 사용할 때는 `WeakHashMap`을 사용하거나 쓰지 않는 엔트리를 청소할 수 있도록 백그라운드 스레드를 사용할 수 있다.

## item 9. try finaly 보다는 try with resouce를 사용하라

- 사용 후 close()를 호출해 닫아줘야 하는 자원을 사용할 때
  - try-finally 구문을 사용하여 명시적으로 close()를 호출하는 것 보다는
  - try-with-resource 문을 사용하면 자원을 자동으로 닫아줄 수 있다.
  ```java
      String filePath = "example.txt";
      // try-with-resources 구문
      try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
          String line;
          while ((line = br.readLine()) != null) {
              System.out.println(line);
          }
      } catch (IOException e) {
          e.printStackTrace();
      }
  }
  ```
  - java 7 에 생긴 구문으로, Autoclosable 인터페이스를 구현한 모든 자원은 자동으로 close()를 호출한다.
  - 자원을 두개 이상 사용할 때는 다음과 같이 사용할 수 있다.
  ```java
      // 여러 자원을 동시에 열기
      try (
          BufferedReader reader = new BufferedReader(new FileReader(inputFile));
          BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))
      ) {
          String line;
          while ((line = reader.readLine()) != null) {
              writer.write(line);
              writer.newLine();
          }
      } catch (IOException e) {
          e.printStackTrace();
      }
  }
  ```
  - 장점
    - 코드가 간결하다.
      - 기존의 try-finally 구문에서 두개 이상의 자원을 동시에 사용하기 위해 중첩된 try-finally 구문을 사용하여 예외 처리, 더러운 코드등의 다양한 문제를 해결할 수 있다.
    - 예외가 발생했을 때 주요 예외와 리소스 정리 예외를 모두 기록하여 디버깅시 유용하게 사용할 수 있다.
      - 기존의 try-finally 구문을 사용하여 예외가 발생했을 때는 마지막에 발생한 예외가 기존 예외를 덮어 씌웠다.
