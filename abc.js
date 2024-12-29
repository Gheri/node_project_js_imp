const randomNumberBetween1And10 = Math.floor(Math.random() * 10) + 1;

const randomNumberBetween50And100 = Math.floor(Math.random() * 51) + 50;

console.log(randomNumberBetween1And10);
console.log(randomNumberBetween50And100); // between (50) & 50+(50)

let array = ['1','2', '3','4'];
// adding in the end
array.push('5');
console.log(array);

// deleting from end
array.pop();
console.log(array);

// deleting from first
array.shift();
console.log(array);

// add in beginning
array.unshift('1');
console.log(array);

// create array and fill with som default
const a = new Array(6).fill(10);
console.log(a);

// create 2d array
console.log("Creating 2D Array.....");
const myArray = [];
for (let i = 0; i < 3; i++) {
  myArray[i] = [];
  for (let j = 0; j < 4; j++) {
    myArray[i][j] = i * j;
  }
}

console.log(myArray);

// Array Examples
console.log("Array forEach.....")
const myArray1 = ['apple', 'banana', 'cherry'];

myArray1.forEach(function(element) {
  console.log(element);
});

console.log("Array forOf.....")
const myArray2 = ['apple', 'banana', 'cherry'];
for (let element of myArray2) {
  console.log(element);
}

// do operation for every element
const myArray3 = [1, 2, 3];
const mappedArray = myArray3.map(function(element) {
  return element * 2;
});
console.log(mappedArray); // Output: [2, 4, 6]

// Where and Select 
const myArray6 = [1, 2, 3, 4, 5];
const filteredArray = myArray6.filter(function(element) {
  return element % 2 === 0;
});
console.log(filteredArray)

// reduce aggregate functions
const myArray7 = [1, 2, 3];
const reducedValue = myArray7.reduce(function(acc, element) {
  return acc + element;
}, 0);
console.log(reducedValue); // Output: 6

// sorting array ascending order
// slice clones the array
const myArray10 = [3, 1, 4, 1, 5];
const sortedArray1 = myArray10.slice().sort(function(a, b) {
  return a - b;
});
console.log(myArray10); // Output: [3, 1, 4, 1, 5]
console.log(sortedArray1); // Output: [1, 1, 3, 4, 5]

// subset of array
const fruits = ["Banana", {a: 1, b: 2}, "Lemon", "Apple", "Mango"];
const citrus = fruits.slice(1, 3);
fruits[1].a = 10;
console.log(citrus);
console.log(fruits);

// map examples
// map maintains order of insertion and uniqueness as well
// while set does not main order of insertion
const contacts = new Map();
contacts.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });
contacts.has("Jessie"); // true
contacts.get("Hilary"); // undefined
contacts.set("Hilary", { phone: "617-555-4321", address: "321 S 2nd St" });
contacts.get("Jessie"); // {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.delete("Raymond"); // false
contacts.delete("Jessie"); // true
console.log(contacts.size); // 1

// iterate map
const myMap2 = new Map();
myMap2.set(0, "zero");
myMap2.set(1, "one");

for (const [key, value] of myMap2) {
  console.log(`${key} = ${value}`);
}
// 0 = zero
// 1 = one

for (const key of myMap2.keys()) {
  console.log(key);
}
// 0
// 1

for (const value of myMap2.values()) {
  console.log(value);
}
// zero
// one

for (const [key, value] of myMap2.entries()) {
  console.log(`${key} = ${value}`);
}
// 0 = zero
// 1 = one

// map can be merged with array
const first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

const second = new Map([
  [1, "uno"],
  [2, "dos"],
]);

// Merge maps with an array. The last repeated key wins.
const merged = new Map([...first, ...second, [1, "eins"]]);

console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three


// sort map
const myMap11 = new Map();
myMap11.set(100, 'value1');
myMap11.set(10, 'value3');
myMap11.set(11, 'value2');
const sortedMap = new Map(Array.from(myMap11).sort((a, b) => a[0] > b[0] ? 1 : -1));
console.log(sortedMap);

// overwrite the equals method in Mao
function equals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
const myMap13 = new Map([[{key: 'value'}, 'data1'], [{key: 'value'}, 'data2']], equals);
console.log(myMap13.get({key: 'value'})); // Output: "data2"


// set examples union, filter , insersection
const mySet1 = new Set();
mySet1.add(1);
mySet1.add(2);
mySet1.add(3);

// intersection
const mySet2 = new Set([1, 2, 3, 4]);
const mySet3 = new Set([3, 4, 5 ,6])
const diffrence = new Set([...mySet2].filter(x => !mySet3.has(x)));
const insection = new Set([...mySet2].filter(x => mySet3.has(x)));
console.log(diffrence);
console.log(insection);

// sort set
const arr = new Set([2,3,1,100]);
const sortedSet = [...arr].sort((a,b) => a - b);
console.log(sortedSet);

// overrite equals method in Set
function equals2(a, b) {
  return a.prop === b.prop;
}
const mySet = new Set([{prop: 'value1'}, {prop: 'value2'}], equals2);
console.log(mySet.has({prop: 'value1'})); // Output: true


// iterate set

// heap

// export modules
import { sum } from "./index.js"
console.log(sum(1,2))

function isSuperset(set, subset) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

function union(setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function intersection(setA, setB) {
  const _intersection = new Set();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function symmetricDifference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }
  return _difference;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

// Examples
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 3]);
const setC = new Set([3, 4, 5, 6]);

console.log(isSuperset(setA, setB)); // returns true
console.log(union(setA, setC)); // returns Set {1, 2, 3, 4, 5, 6}
console.log(intersection(setA, setC)); // returns Set {3, 4}
console.log(symmetricDifference(setA, setC)); // returns Set {1, 2, 5, 6}
console.log(difference(setA, setC)); // returns Set {1, 2}


// delete first key in map
const myMap12 = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3']
]);

const firstKey = myMap12.keys().next().value;
myMap2.delete(firstKey);

console.log(myMap2);

// Get the Unix timestamp for the current time
const currentTimestamp = Math.floor(Date.now() / 1000);

// Get the Unix timestamp for the current time plus one minute
const nextMinute = Math.floor((Date.now() + 60 * 1000) / 1000);

console.log("Current timestamp:", currentTimestamp);
console.log("Timestamp for next minute:", nextMinute);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let now = new Date();

// get epoc time in millis in UTC
console.log(Date.now());

// format date till hour
console.log(now.getFullYear() + '-' + ('0' + (now.getMonth()+1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' + ('0' + now.getHours()).slice(-2) + ':00');

// format date till minute
console.log(now.getFullYear() + '-' + ('0' + (now.getMonth()+1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2));

// format date till seconds
console.log(now.getFullYear() + '-' + ('0' + (now.getMonth()+1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2));

/**
 * // elapsed time percentage
	const elapsedTimePercentage = ( currentTimeInSeconds % intervalInSeconds ) / intervalInSeconds;

	console.log("Elapsed Time Percent Approach 1: " + elapsedTimePercentage);

	const elapsedTime2 = (currentTimeInSeconds - Math.floor(currentTimeInSeconds / intervalInSeconds) * 60) / intervalInSeconds;
	console.log("Elapsed Time Percent Approach 2: " + elapsedTime2);
 */

  /*
import Heap from "heap";
// decending heap
this.heap = new Heap(function(a, b) {
			return b.s - a.s;
		});
    this.heap.updateItem(item);
    this.heap.push(item);
  */

    /*
    let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
} */


/***
 * function next(arr, target, end)
{
	// Minimum size of the array should be 1
	if(end == 0) return -1;
	
	// If target lies beyond the max element, than the index of strictly smaller
	// value than target should be (end - 1)
	if (target > arr[end - 1]) return end-1;

	let start = 0;

	let ans = -1;
	while (start <= end)
	{
		let mid = (start + end) / 2;

		// Move to the left side if the target is smaller
		if (arr[mid] >= target)
		{
			end = mid - 1;
		}

		// Move right side
		else
		{
			ans = mid;
			start = mid + 1;
		}
	}
	return start;
}
 */
// SOLID
// S -- there should be one reason to change the class
// O -- donet change, extend
// L -- LS derived class can be passed as parent class or interface without probelm
// I -- 
// D -- it should depend on interface or abstract class

/*
public int q(int t) {
        int lo = 0, hi = times.length - 1;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (times[mid] <= t) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return leads[lo];
    }

    function isNumber(value) {
  return typeof value === 'number';
}

let str = "abc";
let num = parseInt(str);

if (!isNaN(num)) {
    console.log(num);
} else {
    console.log("Not a number");
}

function isNumber(str) {
  return !isNaN(str);
}


console.log(isNumber("123"));   // true
console.log(isNumber("abc"));   // false
console.log(isNumber("1.23"));  // true

*/

/**
 * findGreatestElementLessThanOrEqualTo(key, arr) {
    if(arr.length === 0) {
      throw new Error();
    }
    if(arr.length === 1) {
      return arr[0];
    }

    let lo = 0, hi = times.length - 1;
    while (lo <= hi) {
        let mid = lo + (hi-lo)/2;
        if (arr[mid] == key) {
            return mid;
        } if( arr[mid] < key) {
          lo = mid + 1;
        } 
        else {
            hi = mid - 1;
        }
    }
    return hi;
  }
 */

  // Define a custom object to wrap the value and comparator
class CustomObject {
  constructor(value) {
      this.value = value;
  }
}

// Create a custom comparator function
function customComparator(obj1, obj2) {
  // Implement your custom comparison logic here
  // For example, compare the value property of the objects
  return obj1.value === obj2.value;
}

// Create a Set with the custom comparator
const customSet = new Set();
customSet.compare = customComparator;

// Add elements to the Set using custom objects
const obj1 = new CustomObject('value1');
const obj2 = new CustomObject('value2');
const obj3 = new CustomObject('value1'); // Duplicate of obj1

customSet.add(obj1);
customSet.add(obj2);
customSet.add(obj3); // Will not be added due to custom comparison

// Check the size of the Set
console.log(customSet.size); // Output: 2

// Iterate over the elements in the Set
customSet.forEach(obj => {
  console.log(obj.value);
});

// Define a custom Map class
class CustomMap {
  constructor(comparer) {
      this.map = new Map();
      this.comparer = comparer;
  }

  // Define a custom method to set a key-value pair
  set(key, value) {
      for (const [existingKey] of this.map) {
          if (this.comparer(existingKey, key)) {
              // If the key already exists, update its value
              this.map.set(existingKey, value);
              return this;
          }
      }
      // If the key doesn't exist, add a new key-value pair
      this.map.set(key, value);
      return this;
  }

  // Define a custom method to get the value associated with a key
  get(key) {
      for (const [existingKey, value] of this.map) {
          if (this.comparer(existingKey, key)) {
              return value;
          }
      }
      return undefined;
  }

  // Define a custom method to check if a key exists
  has(key) {
      for (const existingKey of this.map.keys()) {
          if (this.comparer(existingKey, key)) {
              return true;
          }
      }
      return false;
  }
}

// Define a custom comparer function
function customComparer(obj1, obj2) {
  // Implement your custom comparison logic here
  // For example, compare the properties of the objects
  return obj1.id === obj2.id;
}

// Create a custom Map with the custom comparer
const myMap = new CustomMap(customComparer);

// Create objects to use as keys
const key1 = { id: 1, name: "Object 1" };
const key2 = { id: 2, name: "Object 2" };

// Set key-value pairs in the custom Map
myMap2.set(key1, "Value 1");
myMap2.set(key2, "Value 2");

// Get values from the custom Map
console.log(myMap2.get(key1)); // Output: Value 1
console.log(myMap2.get(key2)); // Output: Value 2

// Check if keys exist in the custom Map
console.log(myMap2.has({ id: 1, name: "Object 1" })); // Output: true
console.log(myMap2.has({ id: 3, name: "Object 3" })); // Output: false

const DaysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
};

// Example usage:
console.log(DaysOfWeek.MONDAY);

// Date utilites
new Date(new Date().toUTCString())

const sourceArray = [1, 2, 3, 4, 5];
const startIndex = 1;
const endIndex = 3;

const copiedElements = sourceArray.slice(startIndex, endIndex + 1);

console.log(copiedElements); // Output: [2, 3]

const numbers = [5, 2, 9, 1, 5, 6];

// Sorting integers in ascending order
numbers.sort((a, b) => a - b);

console.log(numbers); // Output: [1, 2, 5, 5, 6, 9]


const str = "Hello, world!";
const substring = str.substring(startIndex, endIndex);

console.log(substring); // Output: "lo"


const str2 = "Hello, world!";
const substring2 = str.substr(startIndex, length);

console.log(substring); // Output: "llo

const str3 = "Hello, world!";
const substring3 = str.slice(startIndex, endIndex);

console.log(substring); // Output: "lo"


// enum
const Colors = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE'
};

console.log(Colors.RED); // Output: RED

function getRandomInt(min, max) {
  min = Math.ceil(min);  // Ensure the minimum is an integer
  max = Math.floor(max); // Ensure the maximum is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 10)); // Output: A random integer between 1 and 10 (inclusive)

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

console.log(getRandomFloat(1, 10)); // Output: A random float between 1 and 10


