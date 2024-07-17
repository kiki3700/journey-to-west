---
title: Dispatcher Servlet
slug: "dispatcher-servlet"
---
## 스프링 MVC는 어떤 순서로 요청을 처리하는가?
* Spring MVC는 클라이언트 요청을 처리하기 위해 DipatcherServlet을 중심으로 동작한다.
	* Servlet: 자바 서버측 인터페이스로 웹 요청을 처리하고 그에대한 응답(동적 컨텐츠)를 생성하는 역할
	* DispatcherServlet: SpringMVC의 핵심 서블릿으로, 모든 클라이언트의 요청을 중앙에서 처리
![dispatcher-servlet](../../src/images/dispatcher-servlet.png)
1. 클라이언트 요청: 클라이언트가 서버로 HTTP 요청을 보냅니다.
2. DispatcherServlet: 요청을 받아 HandlerMapping을 통해 적절한 컨트롤러를 찾습니다.
3. HandlerMapping: 요청을 처리할 컨트롤러를 결정합니다.
4. 컨트롤러: 요청을 처리하고 Model과 논리적인 뷰 이름을 반환합니다.
5. ViewResolver: 논리적인 뷰 이름을 실제 뷰로 변환합니다.
6. 뷰 렌더링: 뷰를 렌더링하여 HTML 응답을 생성합니다.
7. 응답 반환: 렌더링된 뷰를 클라이언트에게 응답으로 반환합니다

## MVC에서 Dispatcher Servlet을 사용하는 이유
* MVC 패턴 자체도 웹 애플리케이션을 개발하는데 있어, Controller가 사용자 요청을 받아 적절한 서비스 로직을 호출하고, 결과를 모델에 담아 뷰로 전달하여, 데이터와 비즈니스 로직, 사용자 인터페이스를 분리하여 확장성과 유지보수성을 얻을 수 있었다.
* 기존의 직접적으로 서블릿을 구현하는 방식은 **HttpServlet** 클래스를 확장하여 서블릿을 구현했고, 웹 요청 응답에 대해 직접 구현을 담당해야했다.
* DispatcherServlet: 직접 적인 구현 없이 웹 요청과 응답을 구현을 분리하여, 비즈니스 로직 개발에 집중할 수 있게 하였다.
	* 단일 책임 원칙 강화: 웹 요청에 대한 처리와 응답은 MVC에서 처리하고, 개발자는 컨트롤러, 서비스 등 손쉽게 각계층의 응집도를 높일 수 있다.
	* 간단한 설정과 관리: 기존 서블릿 방식은 url을 web.xml 설정을 통해 서블릿에 매핑해줬는데, 에너테이션(GetMapping, PostMapping)등을 사용하여 쉽게 매핑이가능하다.
