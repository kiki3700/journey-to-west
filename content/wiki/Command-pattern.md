---
title: Command pattern
slug: "command-patter"
---

## 정의

- 요청을 객체의 형태로 캡슐화 하여, 객체를 서로다른 요청 내역에 따라 매개변수화할 수 있다. 이에 따라 요청을 큐에 저장하거나 로깅 취소등의 기능을 사용할 수 있다.
-     요청 하는 객체와 요청을 수행하는 객체를 분리할 수 있다.

## 구성

[command-pattern](../src/images/command-pattern.png)

- Invoker: 클라이언트로 명령을 성정 받고 이를 실행한다
- Command: 특정 행동과 리시버를 연결해준다. 인보케에서 exceute를 호출하면 커맨드는 receiver를 호출한다.
- receiver: 실제로 작업을 수행하는 클래스

## 특징

- Invoker와 Receiver 간의 읜존성을 줄여서 시스템의 유연성을 높일 수 있다.
- 커맨드를 캡슐화 함으로써 명령 취소, 큐에 저장 등의 기능을 사용할 수 있다.
