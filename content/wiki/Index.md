---
title: Index
slug: "index"
---
## 개념
* 기본 구조: 일반적으로 `B 트리`나 `Hash` 구조를 사용하여 구현된다. 이러한 구조는 조회 성능을 높이는데 사용된다.
* 키와 값: 인덱스는 키와 해당 키가 가르키는 값(레코드 위치)로 구성되어 있다.

## 인덱스 종류
1. 단일 열 인덱스(Single Column Index): 하나의 컬럼에 대해 생성되는 인덱스
2. 복합 인덱스(Composite Index): 두 개 이상의 컬럼에 대해 생성되는 인덱스
3. 유니크 인덱스(Unique Index): 인덱스가 생성된 컬럼에 대해 중복값을 허용하지 않는 인덱스
4. 풀 텍스트 인덱스(Full Text Index): 텍스트 검색을 효율적으로 수행하기 위해 사용되는 인덱스

## 장단점
### 장점
1. 빠른 검색 속도: 조회 성능이 크게 향상되는데, 위의 설명과 같이 해당 키가 가르키는 레코드 위치를 저장하고 있기 때문이다.
2. 정렬과 그룹화 최적화: 인덱스 사용시 `ORDER BY`, `GROUP BY` 와 같은 연산이 더 효율 적으로 수행된다.
3. 중복 방지: 유니크 인덱스를 사용하면 특정 컬럼값이 중복되지 않도록 보장할 수 있다.
### 단점
1. 추가 저장공간: 인덱스를 위한 추가 저장공간이 필요하다.
2. 쓰기, 수정, 삭제 성능 저하: 쓰기, 수정, 삭제 연산을 진행할 때, 인덱스에도 추가 작업을 해야되기 때문에 성능이 저하될 수 있다.
3. 복잡성 증가: 너무 많은 인덱스를 사용하면 인덱스 관리가 복잡해지고, 오히려 성능이 저하된다.

## 인덱스 사용 고려사항
1. 조회 빈도 높은 컬럼에 사용: 자주 조회되는 컬럼에 인덱스를 사용하여, 조회 성능을 향상 시켜라
2. 적절한 인덱스 수: 너무 많은 인덱스를 생성하면, 성능에 저하가 생길 수 있다.
3. 쿼리 패턴 분석: 쿼리의 실행 계획을 분석하여 인덱스가 실제로 쿼리 성능을 개선시키는지 확인해야된다.
4. 배치 삽입 사용: 많은 데이터를 삽입할 때 배치 삽입을 사용하여 인덱스 업데이트 오버헤드를 줄일 수 있다.
