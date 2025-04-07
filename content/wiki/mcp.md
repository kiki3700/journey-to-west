---
title: MCP
slug: "mcp"
---

## MCP 소개

MCP(Model Context Protocol)는 Anthropic Claude에서 개발한 오픈소스 프로토콜로, AI 모델과 개발 환경 간의 통합된 컨텍스트 상호작용을 제공하는 것을 목표로 한다. MCP는 컨텍스트 정보를 표준 방식으로 접근할 수 있도록 하여, AI 모델이 코드나 데이터 등을 더 잘 이해하고 처리할 수 있도록 돕는다. 일종의 브릿지 역할을 하며, 개발자는 다양한 AI 애플리케이션과 데이터 소스를 하나의 표준으로 연결할 수 있게 된다.

예를 들어 Claude 데스크탑 앱에서 MCP 프로토콜을 통해 GitHub 프로젝트를 관리할 수 있다. 프로젝트 생성부터 코드 요청 제출까지 복잡한 작업을 빠르게 처리할 수 있으며, LLM(Large Language Model) 기반 애플리케이션이 데이터를 연결하기 어려웠던 기존 문제를 해결하고, 다양한 데이터 소스를 개별적으로 통합할 필요 없이 MCP 하나로 해결할 수 있다.

### 적용 시나리오

#### 코드 관리 및 개발

Claude는 MCP 프로토콜을 통해 GitHub에 직접 연결할 수 있다. 개발자는 Claude를 활용해 코드 작성, 저장소 생성, 코드 푸시, 이슈 생성, 브랜치 생성, PR 생성 등의 작업을 채팅 인터페이스 안에서 수행할 수 있다.

#### 데이터 관리 및 상호작용

##### 로컬 리소스 관리

MCP는 로컬 리소스(파일 시스템, SQLite 등)의 접근 및 조작을 지원한다. Claude는 로컬 서버에 안전하게 연결되어 파일 생성, 읽기, 수정, 데이터베이스 쿼리, 업데이트 등 다양한 작업을 수행할 수 있다.

##### 원격 리소스 연동

GoogleDrive나 Slack 같은 원격 리소스와도 연동이 가능하다. 다양한 비즈니스 도구, 콘텐츠 라이브러리, 개발 환경 등과 쉽게 연결할 수 있다.

#### 지능형 비서 애플리케이션 구축

대규모 모델이 챗봇에서 지능형 에이전트로 발전함에 따라, MCP는 AI 시스템을 더 똑똑하고 강력하게 만들어준다. 다양한 내부 시스템(DB, 파일서버 등) 및 외부 도구와 연결하여 AI가 복잡한 작업을 자동으로 처리하게 만들 수 있다.

### MCP의 장점과 단점

#### 장점

- 데이터 연결의 간소화
- 데이터 상호작용의 보안 강화
- AI 애플리케이션 기능 확장
- 뛰어난 확장성
- 다양한 데이터 포맷 지원

#### 단점

- 업계 표준 경쟁 심화
- 호환성 문제 가능성
- 프로토콜 본질에 대한 의문
- 현재 로컬에서만 사용 가능 (원격 서버는 개발 중)

## MCP 아키텍처

MCP는 클라이언트-호스트-서버 아키텍처를 따르며, 각 호스트는 여러 클라이언트 인스턴스를 실행할 수 있다. JSON-RPC 기반의 상태 유지형(session-based) 프로토콜이며, 클라이언트와 서버 간의 컨텍스트 교환 및 샘플링 조정을 중심으로 설계되었다.

### Claude MCP 아키텍처

세 가지 주요 구성요소가 있다: 호스트, 서버, 클라이언트

- **호스트 (Host)**: LLM 애플리케이션(예: Claude 데스크탑, IDE 플러그인 등). 클라이언트의 라이프사이클을 관리하고 서버와의 통신을 조정함.
- **클라이언트 (Client)**: 서버와 1:1 연결을 유지. 사용자 입력/출력 처리, 세션 관리, 메시지 라우팅 담당.
- **서버 (Server)**: 클라이언트에게 컨텍스트, 도구, 프롬프트 제공. 로컬/원격 자원을 관리하고 요청을 처리.

각 구성요소는 JSON-RPC로 통신하며, 호스트는 여러 클라이언트를 관리할 수 있고, 각 클라이언트는 하나의 서버와 연결된다.

## MCP 프로토콜

MCP는 클라이언트-호스트-서버 구조의 통신 프로토콜이며, 모든 메시지는 JSON-RPC 2.0 형식을 따라야 한다.

### 메시지 유형

- **request**: 요청 메시지 (클라이언트 ↔ 서버)
- **response**: 요청에 대한 응답
- **notification**: 응답이 필요 없는 단방향 알림 메시지

### 요청 메시지 예시

```json
{
  "jsonrpc": "2.0",
  "id": "string | number",
  "method": "string",
  "param?": {
    "key": "value"
  }
}
```

### 응답 메시지 예시

```json
{
  "jsonrpc": "2.0",
  "id": "string | number",
  "result?": {
    "[key: string]": "unknown"
  },
  "error?": {
    "code": "number",
    "message": "string",
    "data?": "unknown"
  }
}
```

### 알림 메시지 예시

```json
{
  "jsonrpc": "2.0",
  "method": "string",
  "params?": {
    "[key: string]": "unknown"
  }
}
```

### 세션 생명주기 (Life Cycle)

#### 초기화 단계 (Initialize Stage)

- 프로토콜 버전 협상
- 기능(capability) 협상

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": { "listChanged": true },
      "sampling": {}
    },
    "clientInfo": {
      "name": "ExampleClient",
      "version": "1.0.0"
    }
  }
}
```

#### 초기화 응답 예시

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "logging": {},
      "prompts": { "listChanged": true },
      "resources": { "subscribe": true, "listChanged": true },
      "tools": { "listChanged": true }
    },
    "serverInfo": {
      "name": "ExampleServer",
      "version": "1.0.0"
    }
  }
}
```

#### 초기화 완료 알림

```json
{
  "jsonrpc": "2.0",
  "method": "initialized"
}
```

### 작동 단계 (Operate Stage)

- 협상된 기능 사용
- 정상적인 요청/응답 메시지 송수신

### 종료 단계 (Close Stage)

- 클라이언트 또는 서버가 연결 종료
- 리소스 정리 수행

## 전송 메커니즘 (Transport Mechanism)

### stdio 방식

- 클라이언트가 MCP 서버를 서브프로세스로 실행
- stdin으로 메시지 전송, stdout으로 응답 수신
- 개행 문자로 메시지 구분
- stderr는 로그용 출력

### HTTP + SSE 방식

- SSE는 서버 → 클라이언트 실시간 메시지 푸시
- 클라이언트는 HTTP POST로 메시지 전송
- 서버는 SSE 엔드포인트와 POST 엔드포인트 제공

### 사용자 정의 전송 방식

- WebSocket, gRPC 등 커스텀 구현 가능
- JSON-RPC 형식과 세션 라이프사이클만 지키면 됨
