// initial Capacity
// refill Capacity
// refill time
// 
// 3 --> initial capacity & lastRefillTime = dateTime.Now
// 1 --> 11:00:01.000
// 1 --> 11:00:01.001
// 1 --> 11:00:01.002
// 1 --> 11:00:01.003 --> Not Allowed
// 1 --> 11:00:02.000 --> as this is now equal to or greater than refill time, update token with refill capacity

// this would be interface


// this would be created by factory
// read from config and set in constructor
// this for one process. will see how to modify this for distributed systems.
class TokenBucketRatelimiter {

    constructor(initialCapacity, refillCapacity, refillTimeInSeconds, maxBucketSize) {
      this.maxBucketSize = maxBucketSize;
      this.refillCapacity = refillCapacity;
      this.refillTimeInSeconds = refillTimeInSeconds;
      this.initialcapacity = initialCapacity;
      this.userIdVsState = new Map();
    }
  
    getElapsedTimeInSeconds(lastUpdateTime) {
      let currentTime = new Date(); // this also should be UTC
      let elapsedTimeInMillis = currentTime - lastUpdateTime;
      // console.log("Current Time " + currentTime + " last Updated time "+ this.lastUpdateTime)
      console.log("Elapsed Time in millis "+ elapsedTimeInMillis);
      return elapsedTimeInMillis / 1000;
    }
  
    refillTokens(userId) {
     let state = this.getStateFromStore(userId);
     let elaspedTime = this.getElapsedTimeInSeconds(state.lastUpdateTime);
     let newState = state;
     // is this correct time for refill i.e if elapsedTime is now greter or equal to refill time
     if( elaspedTime >= this.refillTimeInSeconds) {
      let tokensToBeRefilled = this.refillCapacity * parseInt(elaspedTime / this.refillTimeInSeconds)
      let currTokens = Math.min(state.tokens + tokensToBeRefilled, this.maxBucketSize);
      let newLastUpdateTime = new Date();
      newState = {
        tokens: currTokens,
        lastUpdateTime: newLastUpdateTime
      };
      this.setStateFromStore(userId, newState);
      console.log("Refilled Tokens successfully and updated database successfully. New Token Count is "+ currTokens)
     }
     return newState;
    }
  
    isRequestAllowed(userId) {
      let newState = this.refillTokens(userId);
      if(newState.tokens > 0) {
        this.setStateFromStore(userId, {tokens: newState.tokens - 1, lastUpdateTime: new Date()})
        return true;
      }
      return false;
    }
  
    setStateFromStore(userId, state) {
      this.userIdVsState.set(userId , state)
    }
  
    getStateFromStore(userId) {
      if(!this.userIdVsState.has(userId)) {
        this.userIdVsState.set(userId, 
          {
            tokens: this.initialcapacity, 
            lastUpdateTime: new Date() 
          });
      } 
      return this.userIdVsState.get(userId);
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  let rateLimiter = new TokenBucketRatelimiter(3, 2, 5, 2);
  console.log("Is Request Allowed 1 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 2 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 3 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 4 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 5 "+ rateLimiter.isRequestAllowed("2"))
  
  await sleep(10000);
  console.log("Is Request Allowed 6 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 7 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 8 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 9 "+ rateLimiter.isRequestAllowed("1"))
  console.log("Is Request Allowed 10 "+ rateLimiter.isRequestAllowed("2"))