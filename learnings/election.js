/*
["TopVotedCandidate", "q", "q", "q", "q", "q", "q"]
[[[0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]], [3], [12], [25], [15], [24], [8]]
*/

import { binarySearch } from "./datastructures/utilies.js";

class Election {
    constructor(persons, times) {
        this.persons = persons;
        this.times = times;
        this.leadingPersons = this.getLeadingPersons();
    }

    getLeadingPersons() {
        let map = new Map();
        let leadingPersons = [];
        let lead = this.persons[0];
        map.set(lead, 1);
        leadingPersons.push(lead);
       for(let i = 1; i < this.persons.length; i++) {
          let currentperson = this.persons[i];
          let currentCount = map.get(currentperson) || 0;
          let newCount = currentCount + 1;
          map.set(currentperson, newCount);
          if(newCount >= map.get(lead)) {
             lead = currentperson;
          }
        leadingPersons.push(lead);
       }
       return leadingPersons;
    }

    query(time) {
      let i = binarySearch(this.times, time);
      return i < 0 ? this.leadingPersons[-i-2] : this.leadingPersons[i];
    }
}

let election = new Election([0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]);

// [3], [12], [25], [15], [24], [8]
console.log(election.query(3));
console.log(election.query(12));
console.log(election.query(25));
console.log(election.query(15));
console.log(election.query(24));
console.log(election.query(8));


//  console.log(-binarySearch([10,20,30,40,50], 25)-1)
