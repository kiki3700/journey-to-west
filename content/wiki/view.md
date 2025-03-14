---
title: View
slug: "view"
---

## View?

- 뷰(view)란 데이터베이스에서 테이블의 일부 또는 특정 조건에 따라 필터링된 데이터만 포함하는 가상 테이블 이다.
- 데이터 베이스에 저장된 명명된 쿼리이다.
- 실제로 데이터르 저장하지 않고, 기존 테이블의 데이터를 기반으로 쿼리를 실행하여 필요한 정보를 반환한다.

## 특징

### 장점

뷰는 테이블 구조가 바뀌더라도 일관된 인터페이스를 제공하여, 테이블의 디테일한 구조를 캡슐화 할 수 있다.

- 간편한 쿼리 작성: 복잡한 쿼리를 이미 수행한 view를 만들면 간편한 쿼리를 사용할 수 있다.
- 일관된 인터페이스/유지보수성: 모델의 변경에도 일관된 인터페이스를 사용할 수 있다.
- 보안 및 접근 제어: 기존 테이블에 대한 접근 권한을 제한할 수 있다.
- 재사용성: 다른 쿼리나 뷰에서 재사용할 수 있어 생산성을 향상

### 단점

- 업데이트 제약: 테이블 구조나 데이트 벼경시, 뷰를 업데이트 해야한다.
- 성능 문제: 실제 쿼리가 성능이 좋지않을 때 발생한다. 캐싱을 사용하는 물리화 된 뷰를 사용할 수 도있다.
- 의존성 증가: 뷰가 복잡해 짐에 따라 의존성이 증가하여 변경 작업에 어려움이 발생하기도 한다.

## 쿼리

### 생성

```SQL
CREATE VEIW [view name] AS [select query]
```

### View 수정

```sql
CREATE OR REPLACE VIEW [view name] AS [select query]
```

### View 이름 수정

```sql
ALTER VIEW [current view name] RENAME TO [new view name]
```

### View 삭제

```sql
DROP VIEW IF EXISTS [view name]
```
