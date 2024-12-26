---
title: item 2. 빌더 패턴
slug: "effective-java-item-2"
---

---
title: Effective Java - Item 2: 객체 생성과 정적 팩토리 메서드
slug: "effective-java-item-2"
---

객체 생성 방식은 소프트웨어 설계의 중요한 요소 중 하나로, 선택적 매개변수 처리가 복잡할수록 적절한 패턴 선택이 필수적이다. 생성자와 정적 팩토리 메서드는 흔히 사용되는 방법이지만, 매개변수가 많을 경우 그 한계가 분명해진다. 이를 해결하기 위한 세 가지 접근법에 대해 논의한다.

## 대안 1: 점층적 생성자 패턴 (Telescoping Constructor Pattern)
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
   * 객체 초기화 코드가 명확하고 유연하다.
   * 특정 속성만 초기화하거나, 필요에 따라 동적으로 설정 가능하다.
2. **단점**:
   * 객체가 불완전한 상태로 생성될 가능성이 있으며, 이는 런타임 에러를 유발할 수 있다.
   * 불변 객체(Immutable Object)를 생성할 수 없다는 구조적 제한이 존재한다.

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
   * 필수 매개변수를 통해 빌더 객체를 생성한다.
   * 빌더 객체의 메서드를 체이닝 방식으로 호출하여 선택적 매개변수를 설정한다.
   * 최종적으로 `build()` 메서드를 호출하여 객체를 반환한다.
2. **장점**:
   * 불변 객체를 손쉽게 생성할 수 있다.
   * 코드의 명확성과 유지보수성이 높아진다.
3. **단점**:
   * 클래스 설계와 구현이 상대적으로 복잡하다.
   * 추가적인 메모리 소비가 발생할 수 있다.

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

## 결론
세 가지 접근법은 각각 고유한 장단점을 가지고 있으며, 상황에 따라 적합한 방식을 선택해야 한다. 특히 선택적 매개변수가 많고 객체의 불변성이 요구되는 경우, 빌더 패턴은 가장 이상적인 해결책으로 여겨진다. 이는 객체 생성의 명확성과 안정성을 보장함과 동시에, 코드 유지보수성을 극대화할 수 있기 때문이다.

