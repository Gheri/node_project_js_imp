let integers = [1,4,5,9,10, 40, 50, 90, 100];
let romans = ["I","IV", "V","IX" ,"X", "XL", "L", "XC", "C"]

let num = 100;
let quo = null;
let rem = null;
let result = "";
for(let i = integers.length - 1; i>=0 ; i--){
   while(num >= integers[i]) {
    num -= integers[i];
    result = result + romans[i];
   }
}


console.log(result);