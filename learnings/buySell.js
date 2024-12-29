let prices = [7,1,5,3,6,4]

let buyIndex=0;
let maxProfit = 0;
for(let i = 1; i < prices.length; i++) {
     if(prices[i] < prices[buyIndex]) {
         buyIndex = i;
     } else if(prices[i] > prices[buyIndex]) {
        maxProfit = Math.max(maxProfit, prices[i] - prices[buyIndex]);
     }
}

console.log(maxProfit);