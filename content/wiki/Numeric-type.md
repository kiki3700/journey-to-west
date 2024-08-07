---
title: Numeric Type
slug: "numeric-type"
---

## Numeric types

### postgreSql Numeric Type

- numeric 타입은
  - 2, 4 8 바이트의 정수
  - 4, 8 바이트의 부동소숫점 숫자
  - 선택가능한 정밀도를 가진 소수점 수
    로 이뤄져있다.

| 이름             | 저장 크기 | 설명                          | 범위                                                    |
| ---------------- | --------- | ----------------------------- | ------------------------------------------------------- |
| smallint         | 2 바이트  | 작은 범위 정수                | -32,768 ~ +32,767                                       |
| integer          | 4 바이트  | 일반적으로 사용되는 정수      | -2,147,483,648 ~ +2,147,483,647                         |
| bigint           | 8 바이트  | 큰 범위 정수                  | -9,223,372,036,854,775,808 ~ +9,223,372,036,854,775,807 |
| decimal          | 가변      | 사용자 지정 정밀도, 정확한 값 | 소수점 앞 최대 131,072자리; 소수점 뒤 최대 16,383자리   |
| numeric          | 가변      | 사용자 지정 정밀도, 정확한 값 | 소수점 앞 최대 131,072자리; 소수점 뒤 최대 16,383자리   |
| real             | 4 바이트  | 가변 정밀도, 부정확한 값      | 6자리 소수점 정밀도                                     |
| double precision | 8 바이트  | 가변 정밀도, 부정확한 값      | 15자리 소수점 정밀도                                    |
| smallserial      | 2 바이트  | 작은 자동 증가 정수           | 1 ~ 32,767                                              |
| serial           | 4 바이트  | 자동 증가 정수                | 1 ~ 2,147,483,647                                       |
| bigserial        | 8 바이트  | 큰 자동 증가 정수             | 1 ~ 9,223,372,036,854,775,807                           |

- numeric 타입들은 수리 연산과 함수를 사용할수 있다.

### Integer Types

- `smallint`, `integer`, `bigint` 유형은 전체 숫자, 즉 소숫점 이하 부분이 없는 다양한 숫자 범위를 저장한다. 범위를 넘어선 수를 저장하면 에러가 발생한다.
- 각 데이터 타입의 용도와 디스크 용량을 고려하여 타입을 선택하라

### Arbitrary Precision Numbers

- 자릿수가 매우큰 숫자를 저장할 수 있는 타입이다. 정확도가 요구되는 금액이나 수량을 저장할 때 추천된다. 계산 역시 정확하지만 속도가 느리다는 단점이 있다.
- `Precision`은 숫자의 전체 자릿수를 의미한다. `Scale`은 소수부 자릿수를 의미한다. ex) 23.5141의 precision은 6, scale은 4이다.
- 자릿수는 다음 과 같이 설정할 수 있다.

```
NUMERIC(precision, scale)
// presicion은 양수지만, scale은 양수, 0, 음수가 가능하다.(음수면 올림)
```

- 설정시 presicion과 scale 설정을 없다면 크기에 제한 없이 숫자값이 저장된다.
- Numeric 타입은 선행/후행 제로저장을 안하여 데이터의 효율적인 저장을 가능하게한다. `precision`과 `scale`은 각 데이터가 점유할 수 있는 최대치를 의미한다.
- 네 자리 소수점 마다 2바이트의 공간을 사용하고, 3~8바이트의 추가 오버헤드가 필요하다. 이 오버헤드는 타입관리 데이터 정합성 유지 등을 위해 필요한 메타데이터 정보와 관리 정보를 포함한다.
- `Infinity`, `-Infinity`, `NaN` 값을 가질 수 있다. 값을 넣기 위해 따옴표로 감싸야한다.
- `decimal` 타입과 `numeric` 타입은 동등하다. 두타입 모두 SQL 표준의 일부이다.
- 값을 반올림할 때, `numeric` 타입은 0에서 멀어지는 방향으로 반올림하며, 대부분의 기계에서 `real`과 `double precision`타입은 가장 가까운 짝수로 반올림한다.

```
SELECT x,
  round(x::numeric) AS num_round,
  round(x::double precision) AS dbl_round
FROM generate_series(-3.5, 3.5, 1) as x;
  x   | num_round | dbl_round
------+-----------+-----------
 -3.5 |        -4 |        -4
 -2.5 |        -3 |        -2
 -1.5 |        -2 |        -2
 -0.5 |        -1 |        -0
  0.5 |         1 |         0
  1.5 |         2 |         2
  2.5 |         3 |         2
  3.5 |         4 |         4
(8 rows)
```

### Floating-Point Type

- `real`과 `double precision`은 부정확한, 가변 정밀도를 가진 수치 타입이다.
  - 부정확한: 일부 값들이 내부 형식으로 정확히 변환될 수 없고 근사치로 저장된다.
  - 가변 정밀도는 저장할수 있는 값의 범위와 정밀도가 고정되어 있지 않은 것을 의미한다.
- `real`은 최소 6자리 정밀도를 갖고 `Double precision`은 15자리의 정밀도를 갖는다.
- `floating` 타입은 저장된 이진값을 가능한 가장 짧고 정확한 십진수 표현 형태로 텍스트로 출력한다.
- `Infinity`, `-Infinity`, `NaN` 값을 가질 수 있다.
- `float(p)`를 지원하는데 `p`를 통해 이진 자릿수로 최소 허용 정밀도를 지정한다. 1~24까지 `real`타입을 선택하고 25~53까지는 `double precision`을 선택한다. 허용 범위 밖의 `p`값은 오류를 발생시킨다. 미지정시 `double precision`이 선택된다.

### Serial Types

- `smallserial`, `seiral`, `bigserial`은 진짜 타입은 아니다. 고유 식벌자 컬럼을 편하게 생성하는데 사용할 수 있다.
