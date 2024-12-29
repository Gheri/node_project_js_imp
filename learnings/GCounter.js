export default class GCounter {
    
    constructor(id, size, initialValue = 0) {
      this.id = id;
  
      // Initialize an array with zeros for everyone except myself
      this.state = Array.from({ length: size }, (_, index) => (index === id ? initialValue : 0));
    }
  
    query(){
      // Return the sum of all counters (last known value)
      return this.state.reduce((acc, value) => acc + value, 0);
    }
  
    increment(num) {
      if (num < 0) {
        throw new Error("Only positive values");
      }
  
      // Increment my local counter by num
      this.state[this.id] += num;
    }
  
    merge(counter) {
      // Create tuples with local count and received count
      // zipped = [[local1, remote1], [local2, remote2], ...]
      const zipped = this.state.map((count, index) => [count, counter.state[index]]);
      console.log("Zipped " + zipped);
      // Update the state with the max known counter for each client
      this.state = zipped.map((counts) => Math.max(counts[0], counts[1]));
      console.log("State is "+ this.state);
    }
  }