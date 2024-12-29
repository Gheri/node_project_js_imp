export class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    toString() {
        return this.data.toString();
    }
  }
  
export class LinkedHashSet {
    constructor() {
        this.map = new Map();
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
  
    getSize() {
        return this.size;
    }

    getHead() {
       return this.head;
    }

    getTail() {
       return this.tail;
    }

    add(newNode) {
        if (!this.map.has(newNode.toString())) {
            this.map.set(newNode.toString(), newNode);
            if (!this.tail) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
            this.size++;
        }
    }
  
    addFromFront(newNode) {
        if (!this.map.has(newNode.toString())) {
            this.map.set(newNode.toString(), newNode);
            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
            this.size++;
        }
    }
  
    removeFromRear() {
        if (this.tail) {
            const data = this.tail.data;
            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                const prevNode = this.tail.prev;
                prevNode.next = null;
                this.tail = prevNode;
            }
            this.map.delete(this.tail.toString());
            this.size--;
            return data;
        }
        return null;
    }
  
    delete(node) {
        if (this.map.has(node.toString())) {
            if (node === this.head && node === this.tail) {
                this.head = null;
                this.tail = null;
            } else if (node === this.head) {
                this.head = this.head.next;
                this.head.prev = null;
            } else if (node === this.tail) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            this.map.delete(node.toString());
            this.size--;
        }
    }
  
    has(node) {
        return this.map.has(node.toString());
    }
  
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.toString());
            current = current.next;
        }
        return result;
    }
  
    getSize() {
        return this.size;
    }
  }
  
  /*
  // Example usage
  const set = new LinkedHashSet();
  set.add(new Node(1));
  set.add(new Node(2));
  set.add(new Node(3));
  set.add(new Node(2)); // Adding duplicate element, it won't be added
  
  console.log("Set:", set.toArray()); // Output: Set: [1, 2, 3]
  
  set.removeFromRear();
  
  console.log("Set after remove rear", set.toArray()); // Output: Set after deleting 2: [1, 3]
  
  set.addFromFront(new Node(0));
  set.addFromFront(new Node(-1));
  
  console.log("Set after adding from front:", set.toArray()); // Output: Set after adding from front: [-1, 0, 1, 3]
  
  console.log("Removed from rear:", set.removeFromRear()); // Output: Removed from rear: 3
  
  console.log("Set after removing from rear:", set.toArray()); // Output: Set after removing from rear: [-1, 0, 1]
  */