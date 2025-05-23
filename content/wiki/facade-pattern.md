---
title: 파사드 패턴
slug: "facade-pattern"
---

## 정의

- 서비스시템에 있는 일련의 인터페이스를 통합 인터페이스로 묶어준다. 또한 고수준 인터페이스도 정의하므로 서브 시스템을 더 편리하게 사용할 수 있다.

## 다이어그램

![facade-pattern](../../src/images/facade-pattern.png)

- 클라이언트는 단순한 인터페이스를 사용하여, 일련의 서브시스템을 편리하게 사용할 수 있다.
- 클라이언트에서 특정 인터페이스가 필요하다면 서브시스템 클래스를 그냥 사용하면된다.
- 클라이언트와 서브시스템을 분리하기 때문에 서비스템이 변경되더라도 클라이언트는 그대로 파사드를 사용할 수 있다.
