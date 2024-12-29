import { isNumberInt } from "./datastructures/utilies.js";

let expression = "(1+(4+5+2)-3)+(6+8)";

let numStack = [];
let OpStack = [];

function isOperator(str) {
    if(str == "*" || str == "/" || str == "+" || str == "-") {
        return true;
    }
    return false;
}

// return true if op1 is high priority than op2
function isHighPrecendence(op1, op2) {
    if((op1 == "*" || op1 == "/") && (op2 == "*" || op2 == "/" || op2 == "+" || op2 == "-")) {
        return true;
    }
    return false;
}

function getTop(arr) {
    if(arr.length == 0) {
        return null;
    }
    return arr[arr.length - 1];
}

function ApplyOperation(num2, num1, op) {
    if(op == "+") {
        return num1 + num2;
    } else if(op == "-") {
        return num1 - num2 ;
    } else if(op == "*") {
        return num1 * num2 ;
    } else if (op == "/") {
        return num1 / num2;
    }
    return null;
}

// let expression = "10 + 2 * 6";
// let expression = "10 * 2 + 6";
// let expression = "(1+(4+5+2)-3)+(6+8)";
for(let i = 0; i < expression.length; i++) {
    if(expression[i] == " ") {
       continue;
    }
    if(expression[i] >= '0' && expression[i] <= '9') {
        console.log("Number");
    }
    if(isNumberInt(expression[i])) {
       numStack.push(parseInt(expression[i]));
    } else if(expression[i] == "(") {
        OpStack.push(expression[i]);
    } else if(isOperator(expression[i])) {
      let top = getTop(OpStack)
      if(top && isHighPrecendence(top, expression[i])) {
        numStack.push(ApplyOperation(numStack.pop(), numStack.pop(), OpStack.pop()));
      }
      OpStack.push(expression[i]);
    } else if(expression[i] == ")") {
        while(getTop(OpStack) != "(") {
            numStack.push(ApplyOperation(numStack.pop(), numStack.pop(), OpStack.pop()));
        }
        OpStack.pop();
    }
}

while(OpStack.length > 0) {
    numStack.push(ApplyOperation(numStack.pop(), numStack.pop(), OpStack.pop()));
}

console.log(numStack[0]);