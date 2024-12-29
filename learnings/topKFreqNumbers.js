import Heap from "heap";

let words = ["the","day","is","sunny","the","the","the","sunny","is","is"];
let k = 4;
let frequencyMap = new Map();
for(const word of words) {
    let currentCount = frequencyMap.get(word) || 0;
    frequencyMap.set(word, currentCount + 1);
}

console.log(frequencyMap);

let minHeap = new Heap(function(a, b) {
    return a[1] - b[1];
});

for(const entry of frequencyMap) {
    if(minHeap.size() < k) {
        minHeap.push(entry);
    } else {
        let currentMinElement = minHeap.peek()[1];
        let currentElement = entry[1];
        if(currentMinElement < currentElement) {
            minHeap.pop();
            minHeap.push(entry);
        }
    }
}

console.log(minHeap);