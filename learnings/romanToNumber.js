function value(r) {
    if (r == 'I')
        return 1;
    if (r == 'V')
        return 5;
    if (r == 'X')
        return 10;
    if (r == 'L')
        return 50;
    if (r == 'C')
        return 100;
    if (r == 'D')
        return 500;
    if (r == 'M')
        return 1000;
    return -1;
}

let result = "MCMIV";
let res = 0;
for(let i = 0 ; i < result.length; i++) {
    let s1 = parseInt(value(result[i]));
    if( i + 1 == result.length) {
        res = res + "" + s1;
        break;
    }
    let s2 = parseInt(value(result[i+1]));
    if(s2>=s1){
        res = res +  parseInt(s2-s1);
        i++;
    } else {
        res = res +  parseInt(s1);
    }
}

console.log(res);
