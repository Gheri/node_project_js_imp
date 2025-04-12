/**
 * Write a function that finds anyone who voilated the rules three or more times in a one-hour period. Your function should return each of the players who fit that criteria, plus the times that they voilated during the one-hour period. If there are multiple one-hour periods where this was true for an persson, just return the earliest one for that person.

player_voilated_times = [
["Kabir", "1355"], ["Jennifer", "1910"], ["Sachin", "835"],
["Sachin", "830"], ["Kabir", "1315"], ["Chloe", "0"],
["Chloe", "1910"], ["Sachin", "1615"], ["Sachin", "1640"],
["Kabir", "1405"], ["Sachin", "855"], ["Sachin", "930"],
["Sachin", "915"], ["Sachin", "730"], ["Sachin", "940"],
["Jennifer", "1335"], ["Jennifer", "730"], ["Sachin", "1630"],
["Jennifer", "5"], ["Chloe", "1909"], ["Rohit", "1"],
["Rohit", "10"], ["Rohit", "109"], ["Rohit", "110"],
["Amol", "1"], ["Amol", "2"], ["Amol", "400"],
["Amol", "500"], ["Amol", "503"], ["Amol", "504"],
["Amol", "601"], ["Amol", "602"], ["Kabir", "1416"],
];

Expected output (in any order)
Kabir: 1315 1355 1405. // 1315-1415 (assume 1315 as 13:15 as 1:15PM)
Sachin: 830 835 855 915 930
Rohit: 10 109 110
Amol: 500 503 504


 */

// Input
const playerViolatedTimes = [
    ["Kabir", "1355"], ["Jennifer", "1910"], ["Sachin", "835"],
    ["Sachin", "830"], ["Kabir", "1315"], ["Chloe", "0"],
    ["Chloe", "1910"], ["Sachin", "1615"], ["Sachin", "1640"],
    ["Kabir", "1405"], ["Sachin", "855"], ["Sachin", "930"],
    ["Sachin", "915"], ["Sachin", "730"], ["Sachin", "940"],
    ["Jennifer", "1335"], ["Jennifer", "730"], ["Sachin", "1630"],
    ["Jennifer", "5"], ["Chloe", "1909"], ["Rohit", "1"],
    ["Rohit", "10"], ["Rohit", "109"], ["Rohit", "110"],
    ["Amol", "1"], ["Amol", "2"], ["Amol", "400"],
    ["Amol", "500"], ["Amol", "503"], ["Amol", "504"],
    ["Amol", "601"], ["Amol", "602"], ["Kabir", "1416"],
     ["Gheri", "2330"], ["Gheri", "2345"],
    ["Gheri", "0005"], ["Gheri", "0006"], ["Gheri", "0200"],
];

function isWithinHour(i, j , sTimes) {
    if(sTimes[j] - sTimes[i] <= 100 && sTimes[j] - sTimes[i] >= 0) {
        return true;
    }
    if(sTimes[i] >= 2300 && 2400 + sTimes[j] - sTimes[i] <= 100) {
        return true;
    }
    return false;
}

let playerNameVsViolatedtimes = new Map();

for (let i = 0; i < playerViolatedTimes.length; i++) {
    let entry = playerViolatedTimes[i];
    let playerName = entry[0];
    let violatedTime = entry[1];
    
    let existingTimes = playerNameVsViolatedtimes.get(playerName) || [] ;
    existingTimes.push(parseInt(violatedTime));
    if (playerName == "Gheri") {
        playerNameVsViolatedtimes.set(playerName, existingTimes);
    }
}




for(const [name, times] of playerNameVsViolatedtimes) {
   let sortedTimes  =times.sort((a,b) => a - b)
   // playerNameVsViolatedtimes.set(name, times);
   console.log(name, sortedTimes);
   for( let i = 0; i < sortedTimes.length ; i++) {
      let windowlenght = 1;
      let j = i + 1;
      for(; j < sortedTimes.length && i != j; j++) {
            if(isWithinHour(i,j,sortedTimes)) {
                 windowlenght++;
                 if(sortedTimes[i] >= 2300 && j == times.length - 1) {
                    j = -1; // lets see the beginning
                 }
            } else {
                break;
            }
      }
      if(windowlenght>=3) {
        console.log("i:" +i + "j:"+ j)
        console.log("Name is " + name + " window is " + windowlenght + "starteing: " + i + " " + sortedTimes.slice(i, i + windowlenght));
        break;
      }
   }
}
