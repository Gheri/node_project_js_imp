
/*
TODO if its Tie we can discuss
lenght = 3
"Gheri,Shivani,Dinesh" --> Ballot
"Shivani,Gheri,Dinesh"
"Shivani,Gheri,Dinesh"
"Gheri,Shivani,Dinesh"

"Gheri" --> 10
"Shivani" --> 10
"Dinesh" --> 4

"Gheri" --> {numVotes,[3,2,0]}
"Shivani" --> [2,2,2]
"Dinesh" --> [0,0,4]
*/

import Heap from "heap";

class Vote {
    constructor(cName, voterName) {
        this.candidateName = voterName,
        this.voterName = cName;
    }

    getCandidate() {
        return this.candidateName;
    }
}
class Ballot {
   constructor() {
      this.votes = []; // this is array
      this.cnames = new Set();
   }

   // todo more validations
   // same voter cannot vote
   // I think simplification without structure
   // it should not be more than three
   addVote(voterName, cName) {
     // this method ensure we dont cast for same people
     if(this.cnames.has(cName)) {
        return false;
     }
     this.votes.push(new Vote(voterName, cName));
     this.cnames.add(cName);
   }

   getVotes() {
    return this.votes;
   }
}

// [10:00 , 11:00]
// ["Gheri", "shivani"]

// {Gheri = 10, insertion = 1}
// {Shivani = 10, insertion =2}
let maxVotes = 3;
// ["Gheri", "Shivani", "Dinesh"]
// ["Shivani", "Gheri", "Dinesh"]
function getresults(ballots) {
   let mapOfCNamesVsVoteCount = new Map();
   for(let i = 0 ; i< ballots.length; i++) {
    let currBalot = ballots[i]; // ["Gheri", "Shivani", "Dinesh"] Vote
    let votes = currBalot.getVotes();
    for(let j = 0 ; j < votes.length; j++) { // ["A", "Shivani"]
        let vote = votes[j];
         if(!mapOfCNamesVsVoteCount.has(vote.candidateName)) {
            mapOfCNamesVsVoteCount.set(vote.candidateName, 0); // ["shivani" vs 3]
         }
         let currVoteCount = mapOfCNamesVsVoteCount.get(vote.candidateName);
         mapOfCNamesVsVoteCount.set(vote.candidateName, currVoteCount + maxVotes - j);// ["shivani" vs 3]
    }
   }
   
   let sortedMap = [...mapOfCNamesVsVoteCount].sort(function(a, b) {
      return b[1] - a[1];
   }).map(function(a) {
    return a[0]
   }).join(" ");
   return sortedMap;
}

let ballot = new Ballot();
ballot.addVote("A", "Shivani");
ballot.addVote("B", "Gheri");
ballot.addVote("C", "Dinesh");


let ballot2 = new Ballot();
ballot2.addVote("A", "Gheri");
ballot2.addVote("B", "Shivani");
ballot2.addVote("C", "Dinesh");

let ballot3 = new Ballot();
ballot3.addVote("A", "Gheri");
ballot3.addVote("B", "Shivani");
ballot3.addVote("C", "Dinesh");


let ballots = [];
ballots.push(ballot, ballot2, ballot3);


let cNames = getresults(ballots);
console.log(cNames);



/*
let ballot = new Ballot();
ballot.addVote("A", "Shivani");
console.log(ballot.cnames);
console.log(ballot.votes);
ballot.addVote("B", "Shivani");
console.log(ballot.cnames);
console.log(ballot.votes);
ballot.addVote("C", "Gheri");
console.log(ballot.cnames);
console.log(ballot.votes);
*/
// List<String> getResults(List<Ballot> ballots)


