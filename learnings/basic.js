let s = "(1+(4+5+2)-3)+(6+8)"; // 7
s= s.trim();

let numbersStack = [];
let operations = []; 
// [+,+,(,+,(]
// "(1+(4+5+2)-3)+(6+8)"
// [2,5,4,1]

function isHigherPrecendence(op1, op2) {
    if((op1 == "*" || op1 == "/") && (op2 == "+" || op2 == "-")) {
        return true;
    }
    if((op1 == "+" || op1 == "-") && (op2 == "+" || op2 == "-")) {
        return true;
    }
    return false;
}

function ApplyOp(num1, num2, op) {
    if(op == "+") {
        return parseInt(num1 + num2);
    } else if (op == "-") {
        return parseInt(num1 - num2);
    } else if (op == "*") {
        return parseInt(num1 * num2);
    } else if(op == "/") {
        return parseInt(num1 / num2);
    }
}



for (let i = 0 ; i < s.length; i++) {
   let current = s[i];
   // TODO handle numtile digits number
   if(parseInt(current)) {
     numbersStack.push(parseInt(current));
   } else if (isOperator(current)) {
      operations.push(current);
   } else if (current == " ") {
     // continue
   } else if (current == "(" || current == ")") {
    operations.push(current);
   }
   else {
    throw new Error("Invalid")
   }


while(operations.length > 1) {
    let currOp = operations.pop();
    if(currOp == ")") {
        let number2 = numbersStack.pop();
        let number1 = numbersStack.pop();
        let result = ApplyOp(number1, number2, currOp);
        numbersStack.push(result);
        operations.pop();
        continue;
    }
    if(isHigherPrecendence(currOp, operations[operations.length - 1])) {
        let number2 = numbersStack.pop();
        let number1 = numbersStack.pop();
        let result = ApplyOp(number1, number2, currOp);
        numbersStack.push(result);
    }
}
let currOp = operations.pop();
let number2 = numbersStack.pop();
let number1 = numbersStack.pop();
let result = ApplyOp(number1, number2, currOp);
console.log("result is " + result);
}


function isOperator(element) {
    return element == "+" || element == "-" || element == "*" || element == "/"
}