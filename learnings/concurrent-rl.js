
// if we are wllowing only 5 reqs per seconds
let allowedRate = 5;

let TTL = 60

// we can use modern caches like redis which supports sortedset
// we can add TTL for every entry
// you can remove the elements older than 60 seconds timestamp

class ConcurrentRequestRateLimiter {

  constructor(allowedRate) {
     this.allowedRate = allowedRate;
     this.userIdVsRequestCount = new Map();
  }

  removeOlderRequests(key, TTL) {
    let numberOfOngoingRequests = this.userIdVsRequestCount.get(key);
    let deleteRequestIds = []
    for(let i = 0; i < numberOfOngoingRequests.length; i++) {
      if(new Date() - numberOfOngoingRequests[i].timestamp > TTL) {
          deleteRequestIds.push(i);
      }
    }
    deleteRequestIds.forEach(e => numberOfOngoingRequests.splice(e, 1));
  }

  isRequestAllowed(userId, reqId) {
      let prefix = "rate-limiter." + userId;
      if(!this.userIdVsRequestCount.has(prefix)) {
        this.userIdVsRequestCount.set(prefix, []);  
      }
      this.removeOlderRequests(prefix, TTL);
      let numberOfOngoingRequests = this.userIdVsRequestCount.get(prefix);
      if(numberOfOngoingRequests.length < this.allowedRate) {
        numberOfOngoingRequests.push({reqId: reqId, timestamp: new Date()})
        this.userIdVsRequestCount.set(prefix, numberOfOngoingRequests);
        return true;
      }
      return false;
  }

  onRequestServed(userId, reqId) {
    let prefix = "rate-limiter." + userId;
    let deleteRequestId = null;
    let numberOfOngoingRequests = this.userIdVsRequestCount.get(prefix);
    for(let i = 0; i < numberOfOngoingRequests.length; i++) {
      if(numberOfOngoingRequests[i].reqId == reqId) {
          deleteRequestId = i;
          break;
      }
    }
    numberOfOngoingRequests.splice(deleteRequestId, 1);
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let rateLimiter = new ConcurrentRequestRateLimiter(5);
console.log(rateLimiter.isRequestAllowed("Gheri", "1"));
console.log(rateLimiter.isRequestAllowed("San", "1"));
console.log(rateLimiter.isRequestAllowed("Gheri", "2"));
console.log(rateLimiter.isRequestAllowed("San", "2"));
console.log(rateLimiter.isRequestAllowed("Gheri", "3"));
console.log(rateLimiter.isRequestAllowed("San", "3"));
console.log(rateLimiter.isRequestAllowed("Gheri", "4"));
console.log(rateLimiter.isRequestAllowed("San", "4"));
console.log(rateLimiter.isRequestAllowed("Gheri", "5"));
console.log(rateLimiter.isRequestAllowed("San", "5"));
console.log(rateLimiter.isRequestAllowed("Gheri", "6"));
console.log(rateLimiter.isRequestAllowed("San", "6"));
await sleep(1000);
console.log(rateLimiter.isRequestAllowed("Gheri", "6"));
console.log(rateLimiter.isRequestAllowed("San", "6"));