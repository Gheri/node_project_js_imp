const times = [
    ["Paul", "1355"], ["Jennifer", "1910"], ["Jose", "835"],
    ["Jose", "830"], ["Paul", "1315"], ["Chloe", "0"],
    ["Chloe", "1910"], ["Jose", "1615"], ["Jose", "1640"],
    ["Paul", "1405"], ["Jose", "855"], ["Jose", "930"],
    ["Jose", "915"], ["Jose", "730"], ["Jose", "940"],
    ["Jennifer", "1335"], ["Jennifer", "730"], ["Jose", "1630"],
    ["Jennifer", "5"], ["Chloe", "1909"], ["Zhang", "1"],
    ["Zhang", "10"], ["Zhang", "109"], ["Zhang", "110"],
    ["Amos", "1"], ["Amos", "2"], ["Amos", "400"],
    ["Amos", "500"], ["Amos", "503"], ["Amos", "504"],
    ["Amos", "601"], ["Amos", "602"], ["Paul", "1416"],
    ["Gheri", "2355"], ["Gheri", "10"], ["Gheri", "20"]
]
// time2 = 10 , time1 = 2350
function isWithinHour(time1, time2) {
   if(time2 - time1 < 100 || time2 - time1 < 2300) {
    return true;
   }
}

let mapofNameVsTimes = new Map();
for(const nameAndTime of times) {
    let name = nameAndTime[0];
    let time = parseInt(nameAndTime[1]);
    let times = [];
    times = mapofNameVsTimes.get(name) || []
    times.push(time);
    mapofNameVsTimes.set(name, times);
}
console.log(mapofNameVsTimes)
let resultMap = new Map();
for(const [name, times] of mapofNameVsTimes) {
    let sortedTimes = mapofNameVsTimes.get(name);
    sortedTimes.sort((a, b) => a - b);
    mapofNameVsTimes.set(name, sortedTimes);
    
    if(sortedTimes.length < 2) {
        continue;
    }
    let windowStart=0;
    let timesInResult = [];
    let foundElements = false;
    for(let windowEnd=1;windowEnd < sortedTimes.length; windowEnd++) {
        if(!isWithinHour(sortedTimes[windowStart], sortedTimes[windowEnd])){
            if(foundElements) {
                resultMap.set(name, sortedTimes.slice(timesInResult[0], timesInResult[1] + 1));
                break;
            }
            windowStart = windowEnd;
        } else {
            if(windowEnd - windowStart + 1 >= 3) {
                foundElements = true;
                timesInResult = [windowStart, windowEnd];
            }
        }
    }
}
console.log(resultMap);
// find all the names which has entered more than 3 times in an hour
