---
title: Object 클래스
slug: "object-class"
---

### Object 클래스에 대한 이해

자바의 **`Object` 클래스**는 모든 자바 클래스의 최상위 클래스(superclass)입니다. 자바에서 명시적으로 다른 클래스를 상속하지 않으면, 자동으로 `Object` 클래스를 상속받습니다. 따라서 자바의 모든 클래스는 `Object` 클래스의 메서드를 사용할 수 있습니다.

---

### Object 클래스의 특징

1. **최상위 클래스**

   - 모든 자바 클래스는 `Object` 클래스를 암묵적으로 상속받습니다.
   - 예를 들어, 다음 두 클래스는 동일한 의미를 가집니다:

     ```java
     class MyClass {}

     class MyClass extends Object {}
     ```

2. **메타데이터 제공**

   - `Object` 클래스는 자바 객체의 기본 동작과 메타데이터를 제공합니다.

3. **기본 메서드 제공**

   - `Object` 클래스는 자바 객체의 비교, 문자열 표현, 메모리 관리와 같은 기본 메서드를 제공합니다.

4. **상속받지 않는 경우**
   - 자바에서 기본 데이터 타입(primitive types)은 `Object` 클래스를 상속받지 않습니다. 예를 들어, `int`, `double`, `boolean` 등은 객체가 아니므로 `Object`의 메서드를 사용할 수 없습니다.
   - 그러나, 기본 데이터 타입을 감싸는 래퍼 클래스(`Integer`, `Double`, `Boolean` 등)는 `Object`를 상속받습니다.
     ```java
     int a = 10; // 기본 타입, Object의 메서드 사용 불가
     Integer b = 10; // 래퍼 클래스, Object의 메서드 사용 가능
     System.out.println(b.toString()); // "10" 출력
     ```

---

### Object 클래스의 주요 메서드

#### 1. `toString()`

- 객체를 문자열로 표현합니다. 기본 구현은 객체의 클래스 이름과 해시코드를 반환합니다.
- 오버라이드하여 의미 있는 문자열 표현을 제공할 수 있습니다.
- **기본 구현**:
  ```java
  public String toString() {
      return getClass().getName() + "@" + Integer.toHexString(hashCode());
  }
  ```
- **사용 예제**:

  ```java
  class Person {
      String name;
      int age;

      Person(String name, int age) {
          this.name = name;
          this.age = age;
      }

      @Override
      public String toString() {
          return "Person{name='" + name + "', age=" + age + "}";
      }
  }

  public class Main {
      public static void main(String[] args) {
          Person p = new Person("John", 25);
          System.out.println(p.toString()); // 출력: Person{name='John', age=25}
      }
  }
  ```

#### 2. `equals(Object obj)`

- 두 객체가 논리적으로 같은지 비교합니다.
- 기본 구현은 두 객체의 **참조값**을 비교합니다.
- **오버라이드 예제**:

  ```java
  @Override
  public boolean equals(Object obj) {
      if (this == obj) return true;
      if (obj == null || getClass() != obj.getClass()) return false;

      Person person = (Person) obj;
      return age == person.age && name.equals(person.name);
  }
  ```

#### 3. `hashCode()`

- 객체의 해시코드를 반환합니다.
- `equals()` 메서드를 오버라이드하면 `hashCode()`도 함께 오버라이드해야 합니다.
- **기본 규칙**:
  - 같은 객체(`equals() == true`)는 같은 해시코드를 가져야 합니다.
  - 서로 다른 객체라도 같은 해시코드를 가질 수 있습니다.

#### 4. `getClass()`

- 객체의 런타임 클래스 정보를 반환합니다.
- **예제**:
  ```java
  public class Main {
      public static void main(String[] args) {
          String str = "Hello";
          System.out.println(str.getClass().getName()); // 출력: java.lang.String
      }
  }
  ```

#### 5. `clone()`

- 객체를 복제합니다.
- **주의사항**:
  - `Cloneable` 인터페이스를 구현한 클래스만 사용 가능합니다.
  - 기본 구현은 얕은 복사를 수행합니다.

#### 6. `finalize()`

- 객체가 가비지 컬렉션되기 직전에 호출됩니다.
- 자바 9부터는 비추천(Deprecated)되었습니다.

#### 7. 스레드 동기화 관련 메서드

- `wait()`, `notify()`, `notifyAll()`은 스레드 동기화에서 사용됩니다.
- 이 메서드들은 `synchronized` 블록 내에서 호출해야 합니다.

---

### Object 클래스의 활용 예제

#### 1. 기본 메서드 오버라이드

```java
class Employee {
    String name;
    int id;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    @Override
    public String toString() {
        return "Employee{name='" + name + "', id=" + id + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Employee employee = (Employee) obj;
        return id == employee.id && name.equals(employee.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee("Alice", 101);
        Employee e2 = new Employee("Alice", 101);

        System.out.println(e1.equals(e2)); // true
        System.out.println(e1.hashCode() == e2.hashCode()); // true
    }
}
```

#### 2. `getClass()`와 리플렉션

```java
public class ReflectionExample {
    public static void main(String[] args) {
        Object obj = new String("Hello");

        Class<?> clazz = obj.getClass();
        System.out.println("Class Name: " + clazz.getName()); // java.lang.String
    }
}
```

---

### 요약

- `Object` 클래스는 자바의 모든 클래스의 최상위 클래스입니다.
- 기본 메서드(`toString()`, `equals()`, `hashCode()` 등)를 제공하며, 이를 오버라이드하여 클래스에 맞는 동작을 정의할 수 있습니다.
- 런타임 클래스 정보(`getClass()`)와 스레드 동기화 기능(`wait()`, `notify()`)도 제공합니다.
- 기본 데이터 타입(primitive types)은 `Object`를 상속받지 않지만, 래퍼 클래스는 `Object`를 상속받습니다.
- 자바 프로그램의 기본적인 동작과 구조를 이해하기 위해 반드시 알아야 하는 중요한 클래스입니다.
