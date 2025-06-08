---
title: Update문 정리 (join/sub-query)
slug: "update-sub-query-join"
---

## SQL UPDATE 문법 정리 (with JOIN)

---

### 1. 기본 UPDATE 문

```sql
UPDATE 테이블명
SET 컬럼1 = 값1, 컬럼2 = 값2, ...
WHERE 조건;
```

#### 예시

```sql
UPDATE orders
SET tax = 0
WHERE ticker = '005930';
```

- 가장 기본적인 단일 테이블 업데이트
- WHERE 없으면 전체 행이 수정됨 (주의)

---

### 2. 서브쿼리를 이용한 조건 필터링

```sql
UPDATE orders
SET tax = 0
WHERE ticker IN (
  SELECT ticker
  FROM stock
  WHERE type = 'etf'
);
```

- 다른 테이블의 값을 조건 필터링에만 사용
- 값을 직접 SET 하진 않음

---

### 3. 조인을 이용한 값 복사 (`UPDATE ... FROM`)

```sql
UPDATE orders o
SET tax = s.tax_rate
FROM stock s
WHERE o.ticker = s.ticker
  AND s.type = 'etf';
```

- 다른 테이블에서 값을 가져와 업데이트
- PostgreSQL, SQL Server 등에서 지원

---

### 4. 여러 테이블 조인

```sql
UPDATE orders o
SET tax = 0
FROM stock s,
     market m
WHERE o.ticker = s.ticker
  AND s.stock_id = m.stock_id
  AND s.type = 'etf'
  AND m.region = 'KR';
```

- 복수 테이블 조인 가능
- 조인 조건 반드시 WHERE에 명시해야 함
- SET은 항상 대상 테이블 컬럼만 가능

---

### 안전 체크리스트

| 체크 항목                    | 설명                                        |
| ---------------------------- | ------------------------------------------- |
| `FROM` 절 올바른가?          | 조인할 테이블들 모두 포함됐는지 확인        |
| `WHERE` 절 조건 정확한가?    | 조인 키, 필터 조건 빠짐 없이 적었는지       |
| `SET` 대상 맞는가?           | 업데이트 대상은 반드시 메인 테이블의 컬럼만 |
| 사전 `SELECT` 테스트 했는가? | UPDATE 전에 SELECT로 변경 대상 확인         |

---

### 팁

- 조건만 필요할 땐 `IN` / `EXISTS`가 가독성 좋고 안전
- 다른 테이블 값 참조하려면 `FROM` 절 조인 필요
- 실수 방지 위해 `BEGIN; ... ROLLBACK;` 구조로 테스트 권장
