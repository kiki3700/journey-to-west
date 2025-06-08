---
title: Array List
slug: "array-list"
---

### 소개

Java의 기본 배열은 크기가 고정되어 있습니다. 하지만 실제로는 크기가 유동적인 데이터를 저장해야 할 때가 많습니다.

- `CustomArray`는 이러한 필요를 충족하기 위해 **동적 배열**을 직접 구현한 예제입니다.
- 이 클래스는 배열이 가득 차면 자동으로 **크기를 두 배로 확장**하며, 요소의 추가, 삭제, 조회 등의 기능을 제공합니다.
- 이를 통해 ArrayList의 핵심 원리를 학습할 수 있습니다.

-

### 구현 목표

- 이 클래스를 직접 구현하며 다음과 같은 기능을 완성해 보세요.

### 주요 기능

1. **add(T value)**:
   - 배열 끝에 새로운 요소를 추가합니다.
   - 배열이 가득 차면 resize()를 호출해 용량을 두 배로 확장됩니다.
2. **get(int index)**:
   - 특정 인덱스에 있는 요소를 반환합니다.
   - 유효하지 않은 인덱스에 접근하면 IndexOutOfBoundsException을 발생합니다.
3. **remove(int index)**:
   - 특정 인덱스의 요소를 삭제합니다.
   - 삭제된 요소 뒤에 있는 모든 요소를 왼쪽으로 한 칸씩 이동시킵니다.
   - 마지막 요소를 `null`로 초기화해 데이터 유실을 방지합니다.
   - 요소 삭제 후 `size` 값을 감소시킵니다.
4. **resize()**:
   - 배열 용량이 가득 찼을 때, 현재 용량의 두 배 크기로 배열을 확장합니다.
   - 기존 데이터를 새로운 배열에 복사해야 합니다.
5. **size()**:

   - 현재 저장된 요소의 개수를 반환합니다.

6. **capacity()**:

   - 현재 배열의 용량을 반환합니다.

7. **printArray()**:
   - 배열의 현재 상태를 출력합니다. 예: [10, 20, 30]

### 시간 복잡도

- `add`: 평균 O(1), 최악 O(n) (resize 발생 시)
- `get`: O(1)
- `remove`: O(n)
- `resize`: O(n)

### 사용 예시

```java
CustomArray<Integer> customArray = new CustomArray<>(2);
customArray.add(10);
customArray.add(20);
customArray.add(30); // 배열 확장 발생

customArray.printArray(); // 출력: CustomArray: [10, 20, 30]
customArray.remove(1);
customArray.printArray(); // 출력: CustomArray: [10, 30]

System.out.println("Size: " + customArray.size()); // 출력: 2
System.out.println("Capacity: " + customArray.capacity()); // 출력: 4
```

### 구현 예시

```java
public class CustomArray<T> {
  private Object[] data; // 제네릭 데이터를 저장할 배열
  private int size;   // 현재 요소 개수
  private int capacity; // 배열 용량

  // 생성자: 초기 용량을 설정합니다.
  public CustomArray(int initialCapacity) {
      this.capacity = initialCapacity;
      this.data = new Object[capacity];
      this.size = 0;
  }

  // 배열 끝에 요소 추가 (동적 확장 포함)
  public void add(T value) {
      if (size == capacity) {
          resize();
      }
      data[size] = value;
      size++;
  }

  // 특정 인덱스의 요소 가져오기
  public T get(int index) {
      if (index < 0 || index >= this.size) {
          throw new ArrayIndexOutOfBoundsException();
      }
      return (T) data[index];
  }

  // 특정 인덱스의 요소 삭제
  public void remove(int index) {
      if (index < 0 || index >= this.size) {
          throw new ArrayIndexOutOfBoundsException();
      }
      for (int i = index; i < size; i++) {
          data[i] = data[i + 1];
      }
      data[size - 1] = null;
  }

  // 현재 저장된 요소 개수 반환
  public int size() {
      return this.size;
  }

  // 배열 용량 반환
  public int capacity() {
      return this.capacity;
  }

  // 배열 용량을 동적으로 확장
  private void resize() {
      this.capacity *= 2;
      Object[] newData = new Object[capacity];
      System.arraycopy(data, 0, newData, 0, size);
      data = newData;
  }

  // 배열 상태 출력
  public void printArray() {
      System.out.print("CustomArray: [");
      for (int i = 0; i < size; i++) {
          System.out.print(data[i] + (i < size - 1 ? ", " : ""));
      }
      System.out.println("]");
  }
  public boolean contains(T value) {
      for (int i = 0; i < size; i++) {
          if(data[i].equals(value)){
              return true;
          }
      }
      return false;
  }

  public int  indexOf(T value) {
      for (int i = 0; i < size; i++) {
          if(data[i].equals(value)){
              return i;
          }
      }
      return -1;
  }

  public void clear() {
      for (int i = 0; i < size; i++) {
          data[i] = null;
      }
      size =0;
  }
}
```
