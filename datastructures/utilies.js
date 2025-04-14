export function getNowDateInUTC() {
  // Date utilites
  return new Date(new Date().toUTCString())
}

export function getUnixTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// enum
export function createEnum() {
  const enumType = {
    RED: 'RED',
    GREEN: 'GREEN',
    BLUE: 'BLUE'
  }
  return enumType;
}
/*
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
const Colors = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE'
};
 
console.log(Colors.RED); // Output: RED
*/

export function getRandomInt(min, max) {
  min = Math.ceil(min);  // Ensure the minimum is an integer
  max = Math.floor(max); // Ensure the maximum is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log(getRandomInt(1, 10)); // Output: A random integer between 1 and 10 (inclusive)

export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// overwrite the equals method in Mao
function equals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// console.log(getRandomFloat(1, 10)); // Output: A random float between 1 and 10

export function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isNumberInt(num) {
  if (isFinite(parseInt(num))) {
    return true;
  }
  return false;
}

export function isNumberFloat(num) {
  if (isFinite(parseFloat(num))) {
    return true;
  }
  return false;
}

export function getNumberInt(num) {
  if (isFinite(parseInt(num))) {
    return parseInt(num);
  }
  return null;
}

export function getNumberFloat(num) {
  if (isFinite(parseFloat(num))) {
    return parseFloat(num);
  }
  return null;
}


// shallow copy
export function sliceOrCopyDemo() {
  const sourceArray = [1, 2, 3, 4, 5];
  const startIndex = 1;
  const endIndex = 3;

  const copiedElements = sourceArray.slice(startIndex, endIndex + 1);

  console.log(copiedElements); // Output: [2, 3]
}

export function sortNumsInAscending(numbers) {
  // Sorting integers in ascending order
  numbers.sort((a, b) => a - b);
  return numbers;
}

export function create2dArray(row, col, defaultValue) {
  let myArray = [];
  for (let i = 0; i < row; i++) {
    myArray[i] = [];
    for (let j = 0; j < col; j++) {
      myArray[i][j] = defaultValue;
    }
  }
  return myArray;
}

export function createArray(len, defaultValue) {
  return new Array(len).fill(defaultValue);
}

export function cloneArray(arr) {
  return [...arr];
}

export function cloneDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function removeElements(array, elementsToRemove) {
  const elementsToRemoveSet = new Set(elementsToRemove);
  const newArray = array.filter(element => !elementsToRemoveSet.has(element));
  return newArray;
}

export function removeElement(array, elementToRemove) {
  const newArray = array.filter(element => element !== elementToRemove);
  return newArray;
}

// [0,5,10,15]
export function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1; // 2

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 1
    const midVal = arr[mid]; // 5

    if (midVal === target) {
      return mid; // Found target
    } else if (midVal < target) {
      left = mid + 1; // Continue searching in the right half
    } else {
      right = mid - 1; // Continue searching in the left half // right 0
    }
  }

  // After loop, left points to the smallest number > target
  // return left < arr.length ? arr[left] : null; // Handle case when target is greater than all
  // After the loop, right will be at the greatest number < target
  // return right >= 0 ? arr[right] : null; // Handle case when target is smaller than all
  return right;
}

export function sortMapOnKeysAscending(map) {
  const sortedMap = new Map(Array.from(map).sort((a, b) => a[0] > b[0] ? 1 : -1));
  return sortedMap;
}

export function getDiff(set1, set2) {
  const diffrence = new Set([...set1].filter(x => !set2.has(x)));
  return diffrence;
}

export function getIntersection(set1, set2) {
  const insection = new Set([...set1].filter(x => set2.has(x)));
  return insection;
}

export function union(set1, set2) {
  const union = new Set([...set1, ...set2]);
  return union;
}

export function isSuperset(set, subset) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}
