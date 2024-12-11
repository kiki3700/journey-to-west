---
title: Garbage Collection
slug: garbage-collection
---

- GC(Garbage Collection) JVM에서 더 이상 사용하지 않는 메모리를 자동으로 해제하여 메모리 누수를 방지하고, 효율적인 메모리 관리를 위해 사용하는 메모리 관리 메커니즘 관리를 위해 사용하는 메모리 관리 메커니즘

## 1. GC의 기본 동작 원리

- GC는 `힙 메모리`에서 더이상 사용하지 않는 객체를 찾아 해제한다.
- 모든 객체는 참조 상태에 따라 `생명 주기`를 가지며, 참조가 끊긴 객체는 더이상 사용하지 않는다고 간주하여, 객체들을 자동으로 메모리에서 삭제함으로써 `메모리 누수`를 방지한다.

## Stop-the-world

- GC가 발생할 때 JVM이 일시적으로 멈추는 현상으로 실시간 성능에 영향을 줄수 있다.

## 힙 영역 세대 구분

- GC가 효율적으로 동작하기 위해, JVM의 힙 영역은 `Young Generation`과 `Old Generation`으로 나뉘어 관리한다.
- `Young Generation`은 대부분 짧은 생명 주기를 가지는 객체들이 할당되며, `Old Generation`은 상대적으로 오랫동안 참조되는 객체들이 포함 된다.

### Young Generation

- 새로 생성된 객체들이 저장되는 공간으로`Minor GC`가 발생한다.
- `YoungGeneration`은 `Eden` 과 `Survivor`영역으로 나눠져있다.
- 새로 생성되는 객체는 `Eden`에 할당 된다.
- `Minor Gc` 이후 제거되지 않은 객체들은 Eden 영역에서 Survivor 영역으로 옮겨진다.

## GC 종류

### Minor GC

- 대상: `Yong Generation`
- 작동 방식: YG가 가득 차면, Minor GC 발생하여, 불필요한 객체 제거. 살아남은 객체는 Survivor 영역으로 이동, 일정 주기 동안 생존한 객체는 OG로 이동
- YG를 대상으로 하기에 빠르다

### Major GC

- 대상: `Old Generation`
- 작동 방식: Old Generation을 대상으로 한 GC, Minor GC보다 덜 발생한다.

### Full GC

- 전체 힙 대상으로 메모리 정리
- 모든 객체를 대상으로 검사하기에 오랜 시간이 걸릴 수 있다.

### Old Generation

- `Young Geneartion`에서 오래 살아남아 상대적으로 생명주기가 긴 객체들을 저장하는 공간
- `Old Generation`에서는 `Major GC` 또는 `Full GC` 가 이뤄지게 되며, 힙 전체를 대상으로 하기 때문에 `Minor GC`보다 수행시간이 더 길다.

## GC 동작 과정

- GC는 주로 `Mark and Sweep` 원리로 동작한다.

1. `Mark 단계`: 힙에 있는 모든 객체를 탐색하여 `참조 중인 객체`를 표기한다.
2. `Sweep 단계`: 참조 되지 않은 객체를 메모리에서 해제한다.
3. `Compact 단계`: 메모리 단편화를 방지하기 위해 해제된 메모리르 정리해 객체를 연속되게 재배치한다.

## GC 알고리즘 종류

1. Serial GC: 단일 스레드로 GC를 순차적으로 진행, 작은 메모리, 적은 CPU 코어에서 유리
2. Parllel GC: 멀티스레드로 GC를 수행, 처리량을 극대화가 목적
3. CMS GC:
   - 지연시간 최소화가 목적
   - OG 대상으로 병렬 및 동시 처리
   - 4단계로 수행:
     a. Initial Mark: Old Generation에서 루트 객체를 마킹합니다. 이 단계에서는 Stop-the-world가 발생합니다.
     b. Concurrent Mark: 애플리케이션이 동작하는 동안 Old Generation 내에서 객체 그래프를 따라 마킹 작업을 수행합니다.
     c. Remark: 변경된 참조를 다시 마킹하며, 짧은 Stop-the-world가 발생합니다.
     d. Concurrent Sweep: 불필요한 객체를 병렬로 제거하여 메모리를 해제합니다.

## G1(Garbage-First)

GC는 JDK 9 이후의 JVM에서 기본 GC로 채택된 최신 가비지 컬렉터로, 큰 힙 메모리를 효과적으로 관리하고 지연 시간(latency)을 최소화할 수 있도록 설계된 GC입니다. G1 GC는 기존의 Parallel GC와 CMS GC의 단점을 보완하고, 대용량 메모리 환경에서 성능을 최적화하기 위해 개발되었습니다.

## G1 GC의 주요 특징

### 리전(Region) 단위 관리

G1 GC는 힙을 고정 크기의 작은 리전(Region) 단위로 나누어 관리합니다. 각 리전은 Young Generation과 Old Generation으로 유연하게 할당됩니다.
Young Generation과 Old Generation이 힙 전체에 분포할 수 있으므로, 메모리를 동적으로 활용할 수 있습니다.

### Garbage-First 알고리즘

G1 GC는 청소 우선(Garbage-First) 방식으로, 가비지(쓰레기)가 많은 리전부터 청소하여 효율을 높입니다.
리전을 대상으로 소량의 가비지를 빠르게 청소하여 전체 힙을 정리하는 대신, 필요한 리전만 선택적으로 청소합니다.

### Stop-the-world 시간 예측 가능

G1 GC는 멈춤 시간(goal)을 설정할 수 있어, 애플리케이션의 최대 지연 시간을 예측 가능하게 합니다.
특정 리전만 청소하기 때문에, 이전 GC 방식보다 지연 시간이 짧고 예측 가능하여 지연 시간에 민감한 애플리케이션에 유리합니다.

### 복합적인 GC 과정

G1 GC는 Young GC, Mixed GC, Full GC라는 다양한 단계로 이루어집니다.
`Young GC`는 Young Generation에 대해서만 수행하여, 짧고 빠르게 메모리를 회수합니다.
`Mixed GC`는 Young Generation과 일부 Old Generation 리전에서 가비지를 동시에 청소합니다.
`Full GC`는 메모리 부족이나 시스템의 최적 상태를 위해 힙 전체를 대상으로 수행되며, 이때는 Stop-the-world 시간이 길어질 수 있습니다.

### G1 GC의 작동 과정

`Initial Mark`: Old Generation에서 참조 중인 객체를 마킹합니다. 이 단계에서 Stop-the-world가 발생합니다.
`Concurrent Mark`: 애플리케이션 실행 중 객체 그래프를 따라 참조를 마킹합니다.
`Remark`: 남은 객체를 다시 마킹하여, 마킹 단계의 정확도를 높입니다. 이 단계에서도 Stop-the-world가 발생하지만, 짧게 수행됩니다.
`Cleanup`: 불필요한 객체가 있는 리전을 선택적으로 청소하여 메모리를 회수합니다.
###G1 GC의 장단점

#### 장점:

대규모 힙 메모리 환경에서 효율적으로 동작하며, 병렬 작업과 동시 작업을 활용해 지연 시간을 줄입니다.
예측 가능한 멈춤 시간으로 실시간 응답이 중요한 애플리케이션에 적합합니다.
메모리 단편화 문제를 방지하기 위해 리전을 사용하여, 메모리를 연속된 블록으로 관리합니다.

#### 단점:

G1 GC는 복잡한 설정이 필요할 수 있으며, 튜닝이 요구되는 경우가 많습니다.
리전을 세분화하여 관리하기 때문에, 일부 환경에서는 Parallel GC보다 오히려 성능이 떨어질 수 있습니다.
