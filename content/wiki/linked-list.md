---
title: Linked List
slug: "linked-list"
---

CustomLinkedList는 Java의 LinkedList와 유사한 단일 연결 리스트(Singly Linked List)를 구현하는 클래스입니다.

### **소개**

연결 리스트는 노드(Node)들의 연속된 체인으로 구성되며, 각 노드는 데이터와 다음 노드를 가리키는 참조를 포함합니다.
`CustomLinkedList`는 동적 데이터 구조로서 배열과는 달리 요소를 **중간에 삽입/삭제**하는 데 효율적입니다.

### **구현 목표**:

이 클래스를 직접 구현하며 다음과 같은 기능을 완성해 보세요.
**주요 기능**:

1. **add(T value)**:

- 리스트의 끝에 새로운 노드를 추가합니다.

2. **addFirst(T value)**:

- 리스트의 맨 앞에 새로운 노드를 추가합니다.

3. **get(int index)**:

- 특정 인덱스의 노드에 저장된 데이터를 반환합니다.
- 유효하지 않은 인덱스에 접근하면 IndexOutOfBoundsException을 발생시킵니다.

4. **remove(int index)**:

- 특정 인덱스의 노드를 삭제합니다.
- 삭제된 노드의 참조를 연결해 리스트를 유지합니다.

5. **size()**:

- 현재 리스트에 저장된 노드의 개수를 반환합니다.

6. **printList()**:

- 리스트에 저장된 요소를 출력합니다. 예: [10 -> 20 -> 30]

### **시간 복잡도**:

- `add`: O(1)
- `addFirst`: O(1)
- `get`: O(n)
- `remove`: O(n)

```java
public class CustomLinkedList<T> {

    public static void main(String[] args) {
        CustomLinkedList<Integer> list = new CustomLinkedList<>();
        list.add(10);
        list.printList(); // 출력: [10]
        list.add(20);
        list.printList(); // 출력: [10 -> 20]
        list.addFirst(5);
        list.printList(); // 출력: [5 -> 10 -> 20]
        list.remove(1);
        list.printList(); // 출력: [5 -> 20]
    }

    // 내부 노드 클래스
    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node<T> head; // 리스트의 첫 번째 노드를 가리키는 포인터
    private int size;     // 리스트의 요소 개수

    // 생성자: 초기화
    public CustomLinkedList() {
        this.head = null;
        this.size = 0;
    }

    // 리스트 끝에 요소 추가
    public void add(T value) {
        var node = new Node(value);
        if (head == null) {
            this.head = node;
            size++;
            return;
        }
        var current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = node;
        size++;
    }

    // 리스트 맨 앞에 요소 추가
    public void addFirst(T value) {
        var newHead = new Node(value);
        newHead.next = this.head;
        this.head = newHead;
        this.size++;
    }

    // 특정 인덱스의 요소 가져오기
    public T get(int index) {
        if ( index < 0 || this.size < index) {
            throw new ArrayIndexOutOfBoundsException();
        }
        var node = this.head;
        for (int i = 0; i < index; i++) {
            node = node.next;
        }
        return node.data;
    }

    // 특정 인덱스의 요소 삭제
    public void remove(int index) {

        if (index == 0) { // 첫 번째 노드 삭제
            head = head.next;
        } else {
            Node<T> prev = null;
            Node<T> current = head;

            for (int i = 0; i < index; i++) {
                prev = current;
                current = current.next;
            }
            prev.next = current.next;
        }
        size--;
    }

    // 리스트의 크기 반환
    public int size() {
        return this.size; // 임시 반환값
    }

    // 리스트 출력
    public void printList() {
        Node<T> current = head;
        System.out.print("[");
        while (current != null) {
            System.out.print(current.data);
            if (current.next != null) {
                System.out.print(" -> ");
            }
            current = current.next;
        }
        System.out.println("]");
    }
}
```
