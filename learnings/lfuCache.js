// get(k) ==> returns the value of key if existis else -1
// put(k) ==> adds k,v in cache and if cache is eraching capacity it would remove LFU key
// what we have to in that case
// is there any complexity requirement O(1)

// let lfuCache = new LFUCache(3)
// lfuCache.put(1, "One") ==> key 1 is having access coutn as 1
// lfuCache.put(2, "Two") ==> key 2 is having access coutn as 1
// lfuCache.put(3, "Three") ==> key 3 is having access coutn as 1
// lfuCache.get(3) ==> key 3 is having access coutn as 2 ==> O(1)
// lfuCache.get(2) ==> key 2 is having access coutn as 2
// lfuCache.put(4, "four") ==> its overloading so it would pick the lfu key and remove that

// valueMap(key, {value, accessCount}) so that get works in O(1)
// accesskeyMap(acessCount, Node) we need access count for every key


// adding new key
// when we did put
// added in valueMap {4,"Four"}
// added in accessCountMap {4, 1} , olderAccessCount = Not found, newAccessCount =1 
// added in accessLinkedListMap. when we new indexCount is not present in above map, we create node in the front of older index count
// if capacity is more than allowedcapacity we remove the last key of last element of map

// getting key get(3)
// added in accessCountMap {3, 2} , olderAccessCount =1, newAccessCount =2
// added in accessLinkedListMap. when we new indexCount is not present in above map, we create node in the front of older index count
// we add this key in front of new node and remove this key from older index node

import {DoublyLinkedList, Node}from "./datastructures/dll.js"

function createNode(accessCount, keys) {
  return new Node({accessCount, keys});
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.keyValueMap = new Map();
    this.keyAccessCountMap = new Map();
    this.accessCountNodeRefMap = new Map();
    this.accessCountDll = new DoublyLinkedList(this.capacity);
  }
  
  // TODO handle setting existing keys
  put(key, value) {
      if(this.keyValueMap.has(key)) {
        throw new Error("Already Exists Key");
      }
      let accessCount = 1;
      this.keyValueMap.set(key, value);
      this.keyAccessCountMap.set(key, accessCount);
      let nodeWithAccessCount = this.accessCountNodeRefMap.get(accessCount);
      if(!nodeWithAccessCount) {
        nodeWithAccessCount = createNode(accessCount, []);
        this.accessCountNodeRefMap.set(accessCount, nodeWithAccessCount);
      }
      let data = nodeWithAccessCount.getData();
      data.keys.push(key);
      nodeWithAccessCount.setData(nodeWithAccessCount.getData());
      if(this.accessCountDll.getSize() == 0) {
        this.accessCountDll.add(nodeWithAccessCount);
      } else {

      }
      if(this.keyValueMap.size == this.capacity) {
        let nodeWithLeastAccessCount = this.accessCountDll.getTail();
        let keys = nodeWithLeastAccessCount.getData().keys;
        keys.shift();
      }
  }

  get(key) {
    // accessCount
    // oldaccess, new access
    // remove the key from old access, add the key to new access
    // if new access node is not found, we create as insertbefore
    let oldAccessCountForley = this.keyAccessCountMap.get(key);
    let newAccessCountForkey = oldAccessCountForley + 1;
    this.keyAccessCountMap.set(key, newAccessCountForkey);
    let nodeWithOldAccessCount = this.accessCountNodeRefMap.get(oldAccessCountForley);
    let index =nodeWithOldAccessCount.getData().keys.indexOf(key);
    nodeWithOldAccessCount.getData().keys.splice(index,1);
    
    let nodeWithNewAccessCount = this.accessCountNodeRefMap.get(newAccessCountForkey);
    if(!nodeWithNewAccessCount) {
      nodeWithNewAccessCount = createNode(newAccessCountForkey, []);
      this.accessCountDll.insertBefore(nodeWithNewAccessCount, nodeWithOldAccessCount);
      this.accessCountNodeRefMap.set(newAccessCountForkey, nodeWithNewAccessCount);
    }
    nodeWithNewAccessCount.getData().keys.push(key);
    if(nodeWithOldAccessCount.getData().keys.length == 0) {
      this.accessCountDll.remove(nodeWithOldAccessCount);
      this.accessCountNodeRefMap.set(oldAccessCountForley, null);
    }
  }

  printAll() {
    this.accessCountDll.printList(true);
  }
}

let lfuCache = new LFUCache(3)
lfuCache.put(1, "One") //==> key 1 is having access coutn as 1
lfuCache.put(2, "Two") //==> key 2 is having access coutn as 1
lfuCache.put(3, "Three") //==> key 3 is having access coutn as 1
lfuCache.printAll()
lfuCache.put(4, "four") //==> it should remove 1 as its LRU
lfuCache.printAll()
lfuCache.get(3) //==> key 3 is having access coutn as 2 ==> O(1)
lfuCache.printAll()
lfuCache.get(2) //==> key 3 is having access coutn as 2 ==> O(1)
lfuCache.printAll()
lfuCache.get(4) //==> key 3 is having access coutn as 2 ==> O(1)
lfuCache.printAll()
lfuCache.put(5, "Five");
lfuCache.get(5);
lfuCache.printAll()
/*

lfuCache.get(2) //==> key 2 is having access coutn as 2
lfuCache.printAll()
lfuCache.get(1) //==> key 1 is having access coutn as 2
lfuCache.printAll()

*/

