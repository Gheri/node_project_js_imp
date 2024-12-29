// lets say 5 req / second
// 10:00:00.000 -> 1 request
// 10:00:00.001 -> 1 request
// 10:00:00.002 -> 1 request
// 10:00:00.003 -> 1 request
// 10:00:00.004 -> 1 request
// 10:00:00.005 -> rejected
// 10:00:01.000 -> allowed

import { getUnixTimestampInSeconds, removeElements, sleep } from "./datastructures/utilies.js";

let allowedRate = 5; // this can be improved for granuality

let cache = new Map(); // Store

function clearReqsOlder(userId, olderTimeStampInSeconds) {
   let elementsToRemove = [];
   let currentCount = 0;
   if(cache.has(userId)) {
      console.log("Cleaning Older requests......")
      let reqs = cache.get(userId);
      for(const req of reqs) {
         if(req <= olderTimeStampInSeconds) {
            elementsToRemove.push(req);
         }
      }
      let newReqs = removeElements(reqs, elementsToRemove);
      currentCount = newReqs.length;
      cache.set(userId, newReqs);
      console.log("Cleaned Older requests " + elementsToRemove.length);
   }
}

function allow(userId) {
    if(!cache.has(userId)) {
        cache.set(userId, []);
     }
    let currTimeInSeconds = getUnixTimestampInSeconds();
    console.log(currTimeInSeconds);
   // remove older requests
   clearReqsOlder(userId, currTimeInSeconds - 1); // retunr older window requests

   // if capacity is exchaused . return false
   if(cache.get(userId).length >= allowedRate) {
      return false;
   }
   
   // return true and update the map for user
   let currReqs = cache.get(userId);
   currReqs.push(currTimeInSeconds);
   cache.set(userId, currReqs);
   return true;
}

// map (user, timestamps) --> "gheri" -> [0]
for(let i = 0; i < allowedRate; i++) {
    console.log(allow("Gheri")); // true
}

console.log(allow("Gheri")); // false

console.log("Wait for some seconds");
await sleep(1010);

// map (user, timestamps) --> "gheri" -> [0]
for(let i = 0; i < allowedRate; i++) {
    console.log(allow("Gheri")); // true
}

console.log(allow("Gheri")); // false