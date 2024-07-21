---
title: Abstract factory pattern
slug: "abstract-factory-pattern"
---

## 정의

![abstract-factory-pattern](../../src/images/Abstract_factory_pattern.svg.png)

- 구상화된 클래스를 이용하지 않고, 서로 연결되거나, 의존적 객체로 이뤄진 제품군을 생성하는 인터페이스를 제공, 구상 클래스는 서브 클래스에서 만든다.
- 추상 인터페이스로 일련의 추상 제품을 공급 받을 수 있다.

## 특징

- 구성을 사용해, 클래스를 생성한다.
- 하나의 제품을 생성하는 팩토리 메서드오 다르게, 어떤 구성 생산자를 사용하느냐에 따라, 일련의 제품군을 생성할 수 있다.
- 제품이 추가 되면 모든 인터페이스를 변경해야되는 단점이 있다.
