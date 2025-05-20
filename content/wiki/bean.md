---
title: 스프링 빈 등록과 사용
slug: "bean"
---

## 개요

- `Spring`에서 **Bean**은 `Spring 컨테이너`가 관리하는 객체를 말한다.
- 애플리케이션 내에서 객체를 직접 생성하고 관리하는 대신, `Spring`이 이를 관리해주며 의존성 주입을 통해 객체간의 관계를 설정할 수 있다.
- Bean은 애플리케이션의 비즈니스 로직을 구성하는 `서비스 클래스`, `DAO`, `Util`을 포함할 수 있다.

## Vs Enum, Static class

- 장점:
  - 의존성 관리, 객체 생명주기 관리: Spring이 자동으로 관리
  - 유연성: 다양한 스코프 지원, 런타임 중에 의존성 변경 가능
  - 테스트 용이성: Mocking을 통해 의존성 주입을 쉽게 대체하여 테스트가 용이
- 단점:
  - 초기화 성능: 초기화 및 의존성 주입 과정에서 성능 저하 가능성
  - 코드 복잡성, 프레임워크 종속성

## Bean 등록 방법

### 1. 어노테이션 기반 등록

- Bean을 정의하는 가장 일반적인 방법
- `@Component`, `@Service`, `@Repository`, `@Controller` 등의 어노테이션을 클래스에 붙여 해당 클래스가 `Spring 컨테이너`에 의해 관리 되는 `Bean`임을 표시한다.

```java
import org.springframework.stereotype.Service;

@Service
public class MyService {
    public void performTask() {
        System.out.println("Task performed!");
    }
}
```

### 3. java config 기반 등록

- Java Config 클래스에서 직접 `@Bean`어노테이션을 사용하여 Bea을 정의할 수도 있다.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }
}

```

### 3. XML 기반 등록

- XML 파일에 Bean을 등록할 수 있지만, 과거의 방식은 설정 방식이 복잡하다.

```java
<beans xmlns="http://www.springframework.org/schema/beans">
    <bean id="myService" class="com.example.MyService"/>
</beans>
```

## Bean사용 방법

### 의존성 주입 방식

- Spring의 핵심 기능으로 객체간의 의존성을 Spring이 자동으로 관리해 줍니다.

```
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

// Service Layer - 비즈니스 로직을 수행하는 클래스
@Service
public class MyService {
    public void performTask() {
        System.out.println("Task performed!");
    }
}

// Controller Layer - 사용자 요청을 처리하는 클래스
@Component
public class MyController {

    private final MyService myService;

    // 생성자 주입 방식으로 의존성 주입
    @Autowired
    public MyController(MyService myService) {
        this.myService = myService;
    }

    public void executeTask() {
        myService.performTask();
    }
}
* 장점
	* 유연성: 객체 간의 결합도가 낮아지며, 유지보수와 확장에 유리하다.
	* 테스트 용이성: Mock객체를 사용해 테스트 가능
```

### ApplicationContext를 사용한 Bean 직접 조회

- `ApplicationContext`는 `Spring 컨테이너` 역할을 하며, 필요한 Bean을 직접 조회할 수 잏다.
- 이 방법은 **의존성 주입**을 사용하지 않고 컨텍스트에 Bean을 직접 가져오는 방식

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

// Service Layer - 비즈니스 로직을 수행하는 클래스
@Service
public class MyService {
    public void performTask() {
        System.out.println("Task performed!");
    }
}

// Main Application - 직접 Bean을 조회하여 사용
public class MainApp {
    public static void main(String[] args) {
        // Spring 컨테이너(ApplicationContext) 생성
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 컨텍스트에서 MyService Bean을 직접 조회
        MyService myService = context.getBean(MyService.class);
        myService.performTask();  // "Task performed!" 출력
    }
}
```

- 장점
  - 필요할 때만 Bean을 조회
- 단점
  - 스프링 컨테이너에 대한 의존: 코드가 복잡해진다.
  - 의존성 주입의 장점 소실
