---
title: Lamda and Stream
slug: "lamda-stream"
---

Java 8부터 추가된 람다(Lambda)와 스트림(Stream)은 자바 프로그래밍을 더 간결하고 함수형 스타일로 작성할 수 있도록 도와주는 강력한 도구입니다. 이 글에서는 람다와 스트림의 기본 개념과 사용법을 소개하고, 이를 활용한 간단한 예제를 통해 실제로 어떻게 사용할 수 있는지 알아보겠습니다.

---

### 1. **람다란?**

람다(Lambda)는 **익명 함수(Anonymous Function)** 를 간결하게 표현한 문법입니다. 즉, 메서드를 하나의 표현식으로 작성할 수 있게 해줍니다. 람다는 주로 함수형 인터페이스와 함께 사용되며, 반복적인 익명 클래스 코드를 줄여 가독성을 높여줍니다.

#### **람다 기본 문법**

```java
(parameters) -> expression
```

또는

```java
(parameters) -> { statements }
```

람다 표현식은 **익명 함수**를 정의할 때 사용되며, 자바 8 이상에서 지원됩니다. 익명 함수란 이름이 없는 함수로, 특정 함수형 인터페이스를 구현할 때 간단하게 사용할 수 있습니다. 람다 표현식은 코드를 간결하게 작성하는 데 유리하며, 특히 컬렉션, 스트림과 같은 데이터 처리를 다룰 때 강력한 도구입니다.

람다 표현식은 주로 다음과 같은 방식으로 사용됩니다:

1. **단일 표현식**:
   - 한 줄로 표현 가능한 간단한 코드를 작성할 때 사용.
   - 중괄호(`{}`) 생략 가능.
   ```java
   (x, y) -> x + y
   ```

2. **여러 문장 포함**:
   - 실행해야 할 코드가 여러 줄일 경우 중괄호로 묶어 작성.
   - `return` 키워드를 사용하여 값을 반환 가능.
   ```java
   (x, y) -> {
       int sum = x + y;
       return sum;
   }
   ```

3. **타입 추론 지원**:
   - 컴파일러가 매개변수의 타입을 추론하므로 타입을 명시적으로 작성할 필요가 없음.
   ```java
   x -> x * x // 타입 생략 가능
   ```

```java
(parameters) -> { statements }
```

#### **람다 예제**

```java
// 기존 익명 클래스 사용
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello, World!");
    }
};

// 람다 표현식으로 변환
Runnable runnable = () -> System.out.println("Hello, World!");
```

#### **람다 표현식의 주요 특징**
1. **간결성**: 익명 클래스 구현과 같은 반복적인 코드를 제거하고 더 간단하게 작성할 수 있습니다.
   - 기존 익명 클래스:
     ```java
     Comparator<String> comparator = new Comparator<String>() {
         @Override
         public int compare(String s1, String s2) {
             return s1.compareTo(s2);
         }
     };
     ```
   - 람다 표현식:
     ```java
     Comparator<String> comparator = (s1, s2) -> s1.compareTo(s2);
     ```

2. **타입 추론(Type Inference)**: 람다식의 매개변수 타입을 컴파일러가 추론할 수 있으므로 명시적으로 작성할 필요가 없습니다.
   - 예:
     ```java
     (int x, int y) -> x + y // 명시적 타입 지정
     (x, y) -> x + y        // 타입 추론
     ```

3. **하나의 추상 메서드와 함께 사용**: 함수형 인터페이스(단 하나의 추상 메서드를 가진 인터페이스)와만 사용할 수 있습니다.
   - 예:
     ```java
     @FunctionalInterface
     public interface MyInterface {
         void execute();
     }

     MyInterface myLambda = () -> System.out.println("Executing...");
     myLambda.execute();
     ```

4. **블록 사용**: 여러 줄의 코드가 필요할 경우 중괄호 `{}`를 사용할 수 있습니다.
   - 예:
     ```java
     (x, y) -> {
         int sum = x + y;
         System.out.println("Sum: " + sum);
         return sum;
     };
     ```

#### **람다 표현식과 익명 클래스의 차이**
- **익명 클래스**는 클래스 자체를 구현하며, 여러 메서드를 포함할 수 있습니다.
- **람다 표현식**은 단일 메서드(함수형 인터페이스)를 구현하는 간단한 표현입니다.
- 예:
  ```java
  // 익명 클래스
  Runnable runnable1 = new Runnable() {
      @Override
      public void run() {
          System.out.println("Anonymous Class");
      }
  };

  // 람다 표현식
  Runnable runnable2 = () -> System.out.println("Lambda Expression");
  ```

람다 표현식은 간결하면서도 가독성이 좋고, 익명 클래스보다 직관적입니다. 따라서 함수형 인터페이스를 활용하는 경우 람다를 사용하는 것이 일반적입니다.

---

### 2. **함수형 인터페이스**

람다는 함수형 인터페이스(Functional Interface)와 함께 사용됩니다. 함수형 인터페이스는 단 하나의 추상 메서드를 가지는 인터페이스를 의미하며, 자바에서 람다가 이 인터페이스를 구현합니다.

#### **함수형 인터페이스 정의**

```java
@FunctionalInterface
public interface MyFunctionalInterface {
    void execute();
}
```

#### **람다로 함수형 인터페이스 사용**

```java
MyFunctionalInterface action = () -> System.out.println("Executing...");
action.execute();
```

#### **Java에서 제공하는 주요 함수형 인터페이스**

- **Predicate**: 조건을 검사 (boolean test(T t))
- **Function<T, R>**: 입력값을 변환 (R apply(T t))
- **Consumer**: 입력값을 소비 (void accept(T t))
- **Supplier**: 값을 생성 (T get())

---

### 3. **스트림(Stream)이란?**

Stream은 Java 8에서 도입된 **데이터 처리 파이프라인**으로, 컬렉션 또는 배열 같은 데이터를 함수형 스타일로 처리할 수 있도록 도와줍니다.

#### **Stream의 주요 특징**

1. **선형 처리**: 데이터를 한 번만 순회합니다.
2. **지연 연산(Lazy Evaluation)**: 최종 연산이 호출될 때만 실행됩니다.
3. **불변성**: 원본 데이터를 변경하지 않고 새 데이터를 생성합니다.

#### **스트림 생성**

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
numbers.stream().map(x -> x * x).forEach(System.out::println);(1, 2, 3, 4, 5);
Stream<Integer> stream = numbers.stream();
```

---

### 4. **Stream의 주요 메서드**

#### **1) map()**

- 각 요소를 변환하여 새로운 스트림을 생성.

```java
List<Integer> numbers = List.of(1, 2, 3, 4);
List<Integer> squaredNumbers = numbers.stream()
    .map(x -> x * x)
    .collect(Collectors.toList());
System.out.println(squaredNumbers); // [1, 4, 9, 16]
```

#### **2) filter()**

- 조건에 따라 요소를 걸러냅니다.

```java
List<Integer> numbers = List.of(1, 2, 3, 4);
List<Integer> evenNumbers = numbers.stream()
    .filter(x -> x % 2 == 0)
    .collect(Collectors.toList());
System.out.println(evenNumbers); // [2, 4]
```

#### **3) sorted()**

- 요소를 정렬합니다.

```java
List<String> names = List.of("Alice", "Charlie", "Bob");
List<String> sortedNames = names.stream()
    .sorted()
    .collect(Collectors.toList());
System.out.println(sortedNames); // [Alice, Bob, Charlie]
```

#### **4) forEach()**

- 각 요소를 소비(출력)합니다.

```java
List<String> names = List.of("Alice", "Bob", "Charlie");
names.stream()
    .forEach(System.out::println);
```

#### **5) reduce()**

- 스트림 요소를 하나로 합칩니다.

```java
List<Integer> numbers = List.of(1, 2, 3, 4);
int sum = numbers.stream()
    .reduce(0, Integer::sum);
System.out.println(sum); // 10
```

---

### 5. **람다와 Stream을 활용한 예제**

#### **1) 문자열 리스트 필터링 및 변환**

```java
List<String> names = List.of("Alice", "Bob", "Charlie", "David");
List<String> filteredNames = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
System.out.println(filteredNames); // [ALICE]
```

#### **2) 숫자 리스트 정렬 및 합계 계산**

```java
List<Integer> numbers = List.of(5, 1, 3, 4, 2);
int sum = numbers.stream()
    .sorted()
    .reduce(0, Integer::sum);
System.out.println(sum); // 15
```

#### **3) 객체 리스트에서 특정 필드 추출**

```java
class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }
}

List<Person> people = List.of(
    new Person("Alice", 25),
    new Person("Bob", 30),
    new Person("Charlie", 35)
);

List<String> names = people.stream()
    .map(Person::getName)
    .collect(Collectors.toList());
System.out.println(names); // [Alice, Bob, Charlie]
```

---

### 6. **람다와 스트림을 사용해야 하는 이유**

1. **코드 간결화**: 반복적인 코드를 줄이고 간결하게 작성할 수 있습니다.
2. **가독성 향상**: 함수형 프로그래밍 스타일로 데이터 처리가 직관적입니다.
3. **병렬 처리 지원**: 스트림을 통해 병렬 작업을 쉽게 수행할 수 있습니다.