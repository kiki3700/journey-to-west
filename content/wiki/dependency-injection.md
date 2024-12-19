---
title: Dependency Injection
slug: "dependency-injection"
---

### Dependency Injection (DI)란?

Dependency Injection(DI)은 객체의 의존성을 정의하는 과정으로, **생성자 방식**, **팩토리 메서드 방식**, **Setter 방식**을 통해 구현할 수 있습니다.

Spring에서는 빈(bean)을 생성할 때 이러한 의존성을 주입하며, 객체가 스스로 의존성을 선택하거나 관리하지 않고 컨테이너가 이를 통제합니다. 이러한 방식 때문에 **제어의 역전(Inversion of Control, IoC)**이라고도 불립니다.

---

### Dependency Injection의 장점

1. **객체 간 결합도 감소**
   - 객체 간 결합도가 낮아져 유지보수성이 향상됩니다.

2. **코드 재사용성 증가**
   - 의존성을 외부에서 주입받기 때문에 다양한 환경에서 동일한 객체를 재사용할 수 있습니다.

3. **테스트 용이성 증가**
   - 의존성을 모의(mock) 객체로 대체하여 단위 테스트가 쉬워집니다.

4. **의존성 관리 효율화**
   - 컨테이너가 의존성을 관리하므로 객체는 의존성 생성 및 관리에 관여하지 않아도 됩니다.

---

### Dependency Injection의 주요 방식

#### 1. 생성자 기반 의존성 주입 (Constructor-based Injection)

**특징:**
- 객체 생성 시 필요한 의존성을 생성자를 통해 주입받습니다.
- 클래스의 불변성을 유지할 수 있어 안정적인 객체 설계에 유리합니다.

**클래스 예시:**
```java
public class SimpleMovieLister {
    private final MovieFinder movieFinder;

    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

**어노테이션 기반 주입:**
```java
@Configuration
public class MovieListerConfig {

    @Bean
    public MovieFinder movieFinder() {
        return new DefaultMovieFinder();
    }

    @Bean
    public SimpleMovieLister simpleMovieLister(MovieFinder movieFinder) {
        return new SimpleMovieLister(movieFinder);
    }
}
```

#### 2. Setter 기반 의존성 주입 (Setter-based Injection)

**특징:**
- 객체 생성 후 Setter 메서드를 통해 의존성을 주입받습니다.
- 기본값 설정이 가능하며, 객체의 재구성 및 재주입이 가능합니다.

**클래스 예시:**
```java
public class SimpleMovieLister {
    private MovieFinder movieFinder;

    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

**어노테이션 기반 주입:**
```java
@Configuration
public class MovieListerConfig {

    @Bean
    public MovieFinder movieFinder() {
        return new DefaultMovieFinder();
    }

    @Bean
    public SimpleMovieLister simpleMovieLister() {
        SimpleMovieLister lister = new SimpleMovieLister();
        lister.setMovieFinder(movieFinder());
        return lister;
    }
}
```

#### 3. 팩토리 메서드 기반 의존성 주입 (Factory Method Injection)

**특징:**
- 정적 팩토리 메서드를 호출하여 객체를 생성하고, 필요한 의존성을 주입합니다.

**클래스 예시:**
```java
public class SimpleMovieLister {
    private final MovieFinder movieFinder;

    private SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    public static SimpleMovieLister createInstance(MovieFinder movieFinder) {
        return new SimpleMovieLister(movieFinder);
    }
}
```

**어노테이션 기반 주입:**
```java
@Configuration
public class MovieListerConfig {

    @Bean
    public MovieFinder movieFinder() {
        return new DefaultMovieFinder();
    }

    @Bean
    public SimpleMovieLister simpleMovieLister(MovieFinder movieFinder) {
        return SimpleMovieLister.createInstance(movieFinder);
    }
}
```

---

### 순환 의존성 (Circular Dependencies)

생성자 주입을 주로 사용하는 경우, 해결할 수 없는 순환 의존성 문제가 발생할 수 있습니다.

**예시:**

클래스 A는 생성자 주입을 통해 클래스 B의 인스턴스를 필요로 하고, 클래스 B는 생성자 주입을 통해 클래스 A의 인스턴스를 필요로 하는 경우.
Spring IoC 컨테이너는 이러한 순환 참조를 실행 시 감지하고 **`BeanCurrentlyInCreationException`** 예외를 던집니다.

#### 해결 방법

1. 일부 클래스의 소스 코드를 수정해 **세터 주입 방식**으로 구성.
2. 생성자 주입 대신 세터 주입만 사용.

> 하지만 순환 의존성을 세터 주입으로 구성하는 것은 권장되지 않습니다.

#### 순환 의존성의 특징

- 빈 A와 빈 B 간의 순환 의존성은 하나의 빈이 완전히 초기화되기 전에 다른 빈에 주입되는 상황(클래식 "닭이 먼저냐, 달걀이 먼저냐" 문제)을 만듭니다.

#### Spring의 처리 방식

Spring은 **컨테이너 로드 시점**에 구성 문제를 감지합니다.

**예:**
- 존재하지 않는 빈에 대한 참조.
- 순환 의존성 문제.

Spring은 가능한 늦게 속성을 설정하고 의존성을 해결합니다(빈이 실제 생성될 때).

- 그러나, 잘 로드된 컨테이너도 나중에 객체를 요청할 때 문제(예: 누락되었거나 잘못된 속성으로 인해 예외 발생)가 발생할 수 있습니다.
- 이러한 이유로 ApplicationContext 구현체는 기본적으로 **싱글톤 빈을 사전 인스턴스화(pre-instantiate)** 합니다.
- 이는 초기 로드 시 약간의 시간과 메모리 비용이 들지만, 생성 후 문제가 발생하는 것보다 미리 문제를 발견할 수 있습니다.

**단, 싱글톤 빈을 지연 초기화(lazy-initialize)**하도록 기본 동작을 재정의할 수도 있습니다.

---

### 생성자 vs 세터 기반 DI

| 방식               | 장점                            | 단점                   |
| ---------------- | ----------------------------- | -------------------- |
| **생성자 기반 DI**    | - 클래스 불변성 유지 가능- 필수 의존성 보장    | - 의존성이 많아질 경우 가독성 저하 |
| **Setter 기반 DI** | - 선택적 의존성 처리- 객체 재구성 및 재주입 가능 | - 필수 의존성 보장이 어려움     |

---

### 결론

Dependency Injection은 객체 간 결합도를 낮추고, 코드의 재사용성과 테스트 용이성을 높이는 데 유용한 설계 방식입니다. 상황에 따라 적절한 DI 방식을 선택하여 유연하고 확장 가능한 애플리케이션을 설계할 수 있습니다.

