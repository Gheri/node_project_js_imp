export class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

export class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertAfter(nodeToInsert, node) {
        if (!nodeToInsert || !node) {
            return;
        }
        if (node === this.tail) {
            nodeToInsert.prev = this.tail;
            this.tail.next = nodeToInsert;
            this.tail = nodeToInsert;
        } else {
            nodeToInsert.next = node.next;
            nodeToInsert.prev = node;
            node.next.prev = nodeToInsert;
            node.next = nodeToInsert;
        }
        this.size++;
    }
    

    insertBefore(nodeToInsert, node) {
        if (!nodeToInsert || !node) {
            return;
        }
        if (node === this.head) {
            nodeToInsert.next = this.head;
            this.head.prev = nodeToInsert;
            this.head = nodeToInsert;
        } else {
            nodeToInsert.prev = node.prev;
            nodeToInsert.next = node;
            node.prev.next = nodeToInsert;
            node.prev = nodeToInsert;
        }
        this.size++;
    }

    add(node) {
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.size++;
    }

    insertFromFront(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.size++;
    }

    getTail() {
        return this.tail;
    }

    getHead() {
        return this.head;
    }

    remove(node) {
        if (node === this.head) {
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            }
            if (!this.head) {
                this.tail = null;
            }
        } else if (node === this.tail) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this.size--;
        return;
    }

    printList(asString) {
        let current = this.head;
        let result = "";
        while (current) {
            if(asString) {
                result += JSON.stringify(current.data) + "----";
            } else {
                result += current.data + " ";
            }
            
            current = current.next;
        }
        console.log(result.trim());
    }

    printObjects() {
        console.log("Printing DLL having Size: "+ this.size);
        let current = this.head;
        let index = 0;
        while (current) {
            console.log("Printing Node At -------------" + index);
            console.log(current);
            current = current.next;
            index++;
        }
    }

    getSize() {
        return this.size;
    }
}


