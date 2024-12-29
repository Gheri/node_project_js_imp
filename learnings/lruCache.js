// access(k) ==> k should not be considerd for eviction as this recently used
// this function ensured that it evits least recently used key
// capacity for cache ==> of we keep on adding keys in cache this would not evit anhything as
// there is still capacity
// let lrc = new lruCache(capacity=3)
// lrcCache.access(1) --> 
// lrcCache.access(2) --> this should ensure somehow that we can differentiate order of access is [2,1]
// lrcCache.access(3) --> this should ensure somehow that we can differentiate order of access is [2,1]
// lrcCache.printAll() --> [3,2,1]
// lrcCache.access(4) --> this should evit key 1 as we execceeded the capcity and key 1 is first 
// lrcCache.printAll() --> [4,3,2]
// lrcCache.access(3) --> [3,4,2]


// we need the doubly linked list so that we would ensure the order of access
// 3-->2-->1-->null
// delete that node from list
// put in the front
// 2-->3-->1-->null
// Map(key, references)
import { DoublyLinkedList, Node } from "./datastructures/dll.js";
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.keyVsNode = new Map();
    this.keysList = new DoublyLinkedList();
  }

  addKeyInFrontOfListAndUpdateInMap(key) {
    let node = new Node(key);
    this.keysList.insertFromFront(node);
    this.keyVsNode.set(key, node);
    console.log("Added new key in cache "+ key);
  }

  access(key) {
   if(this.keyVsNode.size < this.capacity){
    this.addKeyInFrontOfListAndUpdateInMap(key);
    return;
   }
   let nodeToBeRemoved = null;
   // if element is not present then
   // remove the last element of list from DL and Map
   // add new element in first of DL and add entry in the map
   if(!this.keyVsNode.has(key)) {
    nodeToBeRemoved = this.keysList.getTail();
   } else {
    nodeToBeRemoved = this.keyVsNode.get(key);
   }
    this.keysList.remove(nodeToBeRemoved);
    this.keyVsNode.delete(nodeToBeRemoved.value);
    this.addKeyInFrontOfListAndUpdateInMap(key);
  }

  printAll() {
    this.keysList.printList();
  }
}

let lruCache = new LRUCache(3);
lruCache.access(1);
lruCache.printAll();
lruCache.access(2);
lruCache.printAll();
lruCache.access(3);
lruCache.printAll();
lruCache.access(4);
lruCache.printAll();
lruCache.access(2);
lruCache.printAll();