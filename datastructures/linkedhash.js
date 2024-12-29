export class LinkedHashSet {
    constructor() {
     this.queue = [];
     this.set = new Set();
    }
 
    addToFront(item) {
     this.queue.push(item);
     this.set.add(item.toString());
    }
 
    removeFromRear() {
     let removedItem = this.queue.shift();
     this.set.delete(removedItem.toString());
    }
 
    contains(item) {
     return this.set.has(item.toString());
    }
 
    size() {
     return this.queue.length;
    }
 
    getLast() {
     return this.queue[this.size() - 1];
    }
 
    getFirst() {
     return this.queue[0];
    }
 }