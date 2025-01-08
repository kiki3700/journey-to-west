---
title: 조건문과 필터링 기법
slug: "condition-filtering"
---

## SQL 조건문과 필터링 기법 통합 정리

SQL에서 데이터를 필터링하는 방법은 다양한 조건문과 기법을 통해 구현됩니다. 여기서는 WHERE, IN, HAVING과 같은 기본 조건문과 함께 추가적인 필터링 기법을 통합하여 정리합니다.

---

### **1. 기본 조건문과 필터링 기법**

#### **1.1 WHERE**

- 데이터를 필터링하기 위한 가장 기본적인 조건문.
- 집계 함수가 실행되기 이전에 조건을 적용하며, 개별 데이터 행을 기준으로 필터링을 수행.

##### **문법**

```sql
SELECT column1, column2
FROM table_name
WHERE 조건;
```

##### **연산 과정**

1. **데이터 조회 (`FROM`)**: 테이블에서 모든 데이터를 가져옵니다.
2. **조건 필터링 (`WHERE`)**: WHERE 조건에 맞는 데이터만 남깁니다.
3. **결과 반환 (`SELECT`)**: 필터링된 데이터를 반환합니다.

##### **예제**

```sql
SELECT *
FROM employees
WHERE department = 'HR';
```

- `department` 열이 `'HR'`인 행만 반환합니다.

---

#### **1.2 IN**

- 특정 열의 값이 지정된 리스트나 서브쿼리 결과에 포함되는지를 확인.
- 여러 값을 비교할 때 `OR` 조건을 반복하는 대신 간단히 사용할 수 있음.

##### **문법**

```sql
SELECT column1, column2
FROM table_name
WHERE column1 IN (value1, value2, ...);
```

##### **연산 과정**

1. **데이터 조회 (`FROM`)**: 테이블에서 데이터를 가져옵니다.
2. **조건 필터링 (`WHERE IN`)**: 열의 값이 IN 리스트에 포함되는지 확인합니다.
3. **결과 반환 (`SELECT`)**: 조건을 만족하는 데이터를 반환합니다.

##### **예제**

```sql
SELECT *
FROM orders
WHERE position_position_id IN (1, 2, 3);
```

- `position_position_id` 값이 1, 2, 3 중 하나인 행만 반환합니다.

---

#### **1.3 HAVING**

- 집계 함수 결과에 조건을 적용하기 위해 사용.
- `GROUP BY`와 함께 사용하며, 집계 연산이 완료된 이후 데이터를 필터링.

##### **문법**

```sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1
HAVING aggregate_function(column2) 조건;
```

##### **연산 과정**

1. **데이터 조회 (`FROM`)**: 테이블에서 데이터를 가져옵니다.
2. **조건 필터링 (`WHERE`)**: WHERE 절이 있다면 데이터를 필터링합니다.
3. **그룹화 (`GROUP BY`)**: 데이터를 그룹별로 묶습니다.
4. **집계 연산**: 각 그룹에 대해 SUM, COUNT 등의 집계 함수를 계산합니다.
5. **필터링 (`HAVING`)**: 집계 결과를 기준으로 조건을 적용합니다.
6. **결과 반환 (`SELECT`)**: 최종 데이터를 반환합니다.

##### **예제**

```sql
SELECT department, SUM(sales) AS total_sales
FROM sales
GROUP BY department
HAVING SUM(sales) > 1000;
```

- 각 `department`의 `sales` 합계를 계산한 후, 합계가 1000 이상인 부서만 반환합니다.

---

#### **1.4 BETWEEN**

- 값이 특정 범위 내에 있는지를 확인.

##### **문법**

```sql
SELECT column1, column2
FROM table_name
WHERE column1 BETWEEN value1 AND value2;
```

##### **예제**

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 3000 AND 5000;
```

- `salary`가 3000 이상 5000 이하인 행만 반환합니다.

---

#### **1.5 LIKE**

- 특정 패턴과 일치하는 데이터를 찾을 때 사용.

##### **문법**

```sql
SELECT column1, column2
FROM table_name
WHERE column1 LIKE 'pattern';
```

##### **패턴 문자**

- `%`: 0개 이상의 임의 문자.
- `_`: 1개의 임의 문자.

##### **예제**

```sql
SELECT *
FROM employees
WHERE name LIKE 'A%';
```

- 이름이 'A'로 시작하는 모든 행을 반환합니다.

---

#### **1.6 IS NULL**

- 열의 값이 NULL인지 확인.

##### **문법**

```sql
SELECT column1, column2
FROM table_name
WHERE column1 IS NULL;
```

##### **예제**

```sql
SELECT *
FROM employees
WHERE manager_id IS NULL;
```

- `manager_id`가 NULL인 행만 반환합니다.

---

### **2. 필터링 기법 조합하기**

#### **2.1 논리 연산자 사용**

- 여러 조건을 `AND`, `OR`, `NOT`과 결합하여 복합적인 필터링 가능.

##### **예제**

```sql
SELECT *
FROM employees
WHERE (department = 'HR' AND salary > 3000)
   OR manager_id IS NULL;
```

- `department`가 `'HR'`이면서 `salary`가 3000 이상인 행, 또는 `manager_id`가 NULL인 행을 반환합니다.

#### **2.2 중첩 조건**

- 서브쿼리와 조합하여 복잡한 조건을 구현.

##### **예제**

```sql
SELECT *
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE location = 'New York'
);
```

- `location`이 'New York'인 부서에 속한 직원만 반환합니다.

---
