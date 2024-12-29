import {Node, DoublyLinkedList} from "./datastructures/dll.js";
class NodeWithKeys extends Node {
    constructor(value) {
        super(value);
        this.keys = new Map();
    }
    
    getCount() {
        return this.keys.size;
    }

    addKey(key) {
        this.keys.set(key, 1);
    }

    delete(key) {
        this.keys.delete(key);
    }
}

class allOne {
   constructor() {
    this.dll = new DoublyLinkedList();
    this.m = new Map();
   }

   inr(key) {
     if(this.m.has(key)) {
        let freqNode = this.m.get(key);
        let currFreqNode = freqNode;
        let nextFreqNode = freqNode.next;
        if(!nextFreqNode || (nextFreqNode.data != currFreqNode.data + 1)) {
            nextFreqNode = new NodeWithKeys(currFreqNode.data + 1);
            this.dll.insertAfter(nextFreqNode, freqNode)
        }
        this.deleteKeyAndClearNodeIfPossible(freqNode, key);
        nextFreqNode.addKey(key);
        this.m.set(key, nextFreqNode);
     } else {
        let head = this.dll.getHead();
        if(!head || head.data != 1) {
            this.dll.insertFromFront(new NodeWithKeys(1));
        }
        let freqNode = this.dll.getHead();
        this.m.set(key, freqNode);
        freqNode.addKey(key);
     }
   }
   dec(key) {
     if(this.m.has(key)) {
        let freqNode = this.m.get(key);
        if(freqNode.data == 1) {
            this.deleteKeyAndClearNodeIfPossible(freqNode, key);
            return;
        }
        let prevFreqNode = freqNode.prev;
        if(!prevFreqNode || prevFreqNode.data != freqNode.data - 1) {
            prevFreqNode = new NodeWithKeys(freqNode.data - 1);
            this.dll.insertBefore(prevFreqNode, freqNode);
        }
        
        this.deleteKeyAndClearNodeIfPossible(freqNode, key)
        
        prevFreqNode.addKey(key);
        this.m.set(key, prevFreqNode);
     } else {
        throw new Error("key Not Found");
     }
   }

   deleteKeyAndClearNodeIfPossible(freqNode,key) {
    freqNode.delete(key);
    this.m.delete(key);
    if(freqNode.getCount() == 0) {
        this.dll.remove(freqNode);
    }
   }

   getMin(key) {
    // console.log(this.dll.getHead());
    return this.dll.getHead();
   }
   getMax(key) {
     // console.log(this.dll.getTail());
     return this.dll.getTail();
   }
   print() {
    this.dll.printObjects();
   }
}


let all_ne = new allOne();

all_ne.inr("a");
all_ne.inr("b");
all_ne.inr("c");
all_ne.inr("a");
all_ne.inr("b");
all_ne.inr("c");
all_ne.inr("d");

all_ne.dec("d");
all_ne.dec("c");
all_ne.dec("c");
all_ne.dec("b");
all_ne.dec("b");
all_ne.inr("g");
all_ne.inr("g");
all_ne.inr("g");



// all_ne.print();

console.log(all_ne.getMin());

console.log(all_ne.getMax());




