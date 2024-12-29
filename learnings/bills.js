let bills = [5,5,10,10,20]
let fivez = 0;
let tens = 0;
let twentys = 0;
for(let i = 0; i < bills.length; i++) {
    if(bills[i] == 5) { fivez++; }
    if(bills[i] == 10) { fivez--; tens++;}
    if(bills[i] == 20) {
       if(tens >= 1) {
        tens--;
        fivez--;
       } else {
        fivez = fivez - 3;
       }
    }
    if(fivez < 0) { console.log(false); }
}