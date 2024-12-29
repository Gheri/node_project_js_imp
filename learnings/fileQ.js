/**
 * Given a list of [FileName, FileSize, [Collection]] - Collection is optional, i.e., a collection can have 1 or more files. Same file can be a part of more than 1 collection.
How would you design a system

    To calculate total size of files processed.
    To calculate Top K collections based on size.
    Example:

file1.txt(size: 100)
file2.txt(size: 200) in collection "collection1"
file3.txt(size: 200) in collection "collection1"
file4.txt(size: 300) in collection "collection2"
file5.txt(size: 100)

Output:

Total size of files processed: 900
Top 2 collections:
- collection1 : 400
- collection2 : 300

 */

import Heap from "heap";
class File {
  constructor(fileName, size) {
    this.fileName = fileName;
    this.size = size;
  }

  getName() {
    return this.fileName;
  }
  getSize() {
    return this.size;
  }
}

class Collection {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.files = new Map();
  }

  addFile(fileName, fileSize) {
    if(this.files.has(fileName)) {
      return false;
    }
    let newFile = new File(fileName, fileSize);
    this.files.set(fileName, newFile);
    return true;
  }

  // TODO
  // this can be improved by calculating size upfront in addFile method
  // can be optimized
  getSize() {
    let totalSize = 0;
    for(const [fileName, file] of this.files) {
      totalSize += file.getSize();
    }
    return totalSize;
  }

  getName() {
    return this.collectionName;
  }
}

class FileManager {
  constructor(fileManagerId) {
    this.fileManagerId = fileManagerId;
    this.collections = new Map();
    this.files = new Map();
    this.size = 0;
    // decending heap
this.maxHeap = new Heap(function(a, b) {
  return b.getSize() - a.getSize();
});
this.minHeap = new Heap(function(a, b) {
  return a.getSize() - b.getSize();
});
  }

  addFile(collectionName, fileName, fileSize) {
    let collection = this.collections.get(collectionName);
    if(!collection) {
      collection = new Collection(collectionName);
      this.collections.set(collectionName, collection);
    }
    let success = collection.addFile(fileName, fileSize); 
    if(success && !this.files.has(fileName)) {
       this.files.set(fileName, true)
       this.size += fileSize;
    }
    return success;
  }

  getTop(k) {
    this.maxHeap.clear();
    for(const [collectionName, collection] of this.collections){
      this.maxHeap.insert(collection);
    }
    let result = [];
    for(let i = 0; i < k ; i++) {
       result.push(this.maxHeap.pop());
    }
    return result;
  }

  getTop1(k) {
    this.minHeap.clear();
    let result = [];
    for(const [collectionName, collection] of this.collections){
      if(this.minHeap.size() < k) {
        this.minHeap.push(collection);
        continue;
      }
      let currentMin = this.minHeap.top();
      if(currentMin.getSize() < collection.getSize()) {
        this.minHeap.pop();
        this.minHeap.push(collection);
      }
    }
    
    for(let i = 0; i < k ; i++) {
       result.push(this.minHeap.pop());
    }
    return result;
  }

  getSize() {
    return this.size;
  }
}

/**
 * file1.txt(size: 100)
file2.txt(size: 200) in collection "collection1"
file3.txt(size: 200) in collection "collection1"
file4.txt(size: 300) in collection "collection2"
file5.txt(size: 100)
 */

let fileManager = new FileManager();
fileManager.addFile("", "f1", 100);
fileManager.addFile("c1", "f2", 200);
fileManager.addFile("c1", "f3", 200);
fileManager.addFile("c2", "f4", 100);
fileManager.addFile("c4", "f6", 500);
fileManager.addFile("c4", "f7", 500);
fileManager.addFile("", "f5", 100);
console.log(fileManager.getSize());
console.log(fileManager.getTop(2));
console.log(fileManager.getTop1(2));