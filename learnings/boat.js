let people = [3,5,3,4];

let sortedPeople = people.sort(function(a, b) {
    return a - b;
})
let limit = 3;
console.log(sortedPeople);

let left = 0;
let right = people.length - 1;
let numOfBoats = 0;
while(left <= right) {
    if(sortedPeople[left] + sortedPeople[right] > limit) {
        right--;
        numOfBoats++;
    } else {
        left++;
        right--;
        numOfBoats++;
    }
}

console.log(numOfBoats);