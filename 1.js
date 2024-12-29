function evaluateS(S) {
    const stack = [];
    const tokens = S.split(' ');

    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseInt(token));
        } else if (token === 'DUP') {
            if (stack.length === 0) {
                return -1;
            }
            stack.push(stack[stack.length - 1]);
        } else if (token === 'POP') {
            if (stack.length === 0) {
                return -1;
            }
            stack.pop();
        } else if (token === '+') {
            if (stack.length < 2) {
                return -1;
            }
            const a = stack.pop();
            const b = stack.pop();
            stack.push(a + b); // todo handle big integers
        } else if (token === '-') {
            if (stack.length < 2) {
                return -1;
            }
            const a = stack.pop();
            const b = stack.pop();
            if(b - a < 0) {
                return -1
            }
            stack.push(b - a);
        } else {
            return -1;
        }
    }

    if (stack.length === 0) {
        return -1;
    }

    return stack[stack.length - 1];
}

// Example usage:
const S1 = "4 5 6 - 7 +"; // 4 1 7
console.log(evaluateS(S1));  // Output: 8

const S2 = "4 5 + DUP -";
console.log(evaluateS(S2));  // Output: Invalid S: - operation with less than two elements in the stack

const S3 = "4 5 + DUP - POP POP";
console.log(evaluateS(S3));  // Output: Invalid S: POP operation with an empty stack
