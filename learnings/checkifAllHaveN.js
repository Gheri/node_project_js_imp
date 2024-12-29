let matrix = [[1,1,1],[1,2,3],[1,2,3]];
let k =3;

function getExpectedElements() {
    let expectedElements = new Set();
    expectedElements.add(1);
    expectedElements.add(2);
    expectedElements.add(3);
    return expectedElements;
}

function isValid() {
// check all rows
for(let r = 0; r <3; r++) { // 0
    let expElements = getExpectedElements();
    for(let c = 0 ; c < 3; c++) {
       let currNum = matrix[r][c]; // 1, 2, 3
       expElements.delete(currNum);
    }
    if(expElements.size != 0) {
        return false;
    }
}

// check all cols
for(let c = 0; c <3; c++) {
    let expElements = getExpectedElements();
    for(let r = 0 ; r < 3; r++) {
       let currNum = matrix[r][c]; // [0,0] [0,1] [0,2]
       expElements.delete(currNum);
    }
    if(expElements.size != 0) {
        return false;
    }
}

return true;
}

console.log(isValid());
