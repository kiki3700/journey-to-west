---
title: Ioc Container
slug: "ioc-container"
---

## Ioc container

- 스프링의 핵심 기술중 하나로 제어의 역전을 담당한다. 프로그램의 흐름을 개발자가 제어하지 않고, 프레임워크 또는 컨테이너가 제어하는 디자인 원칙 스프링에서 직접 객체를 생성하고, 의존성을 관리할 수 있다.
- DI(의존성 주입)은 Ioc의 구체적인 구현 방법중 하나이다. 객체의 의존성을 외부에서 주입해 주는 방식으로 관리.
- 객체를 생성하고나 setter를 통해 의존성을 주입하는 것이 아니라 `IoC 컨테이너`가 빈을 생성할때, 의존성을 주입한다. 이러한 과정이 역전되어 IoC라고 명명한다.

- `org.springframework.context.ApplicationContext` 인터페이스는 Spring IoC 컨테이너를 나타내며
  빈의 인스턴스화, 구성, 조립하는 역할을 한다.
- 컨테이너는 **구성 메타데이터** 를 읽어드림으로써 컴포넌트의 인스턴스, 구성, 조립 지침을 얻을 수 있다.
  **구성 메타 데이터** 는 어노테이션, 팩토리메서드, XML, groovy script를 나타낼 수 있다.

## 메타데이터 구성

- `Configuration metadata`는 `IoC 컨테이너`에게 객채를 생성하고, 구성하고, 조립할 수 있게 하는 지침이다.
- 현재는 주로 `JavaBased configuration`을 사용해 구성한다.
  - `Annotation-based configuration`, `Java-based configuration`이 존재한다.
- `Spring configuration`은 컨테이너가 관리해야할 하나이상의 빈 정의로 구성되어야한다.
- 빈 정의는 어플리케이션을 구성하는 실체 객체에 해당한다.
  - DAO, Service, Controller등 인프라 객체를 정의한다.

## 컨테이너 사용하기

ApplicationContext는 빈과 그 의존성을 관리하는 고급 팩토리 인터페이스입니다. T getBean(String name, Class<T> requiredType) 메서드를 사용하여 빈의 인스턴스를 가져올 수 있습니다.

```java
// 빈을 생성하고 구성
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// 구성된 인스턴스 가져오기
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// 구성된 인스턴스 사용하기
List<String> userList = service.getUsernameList();
```
