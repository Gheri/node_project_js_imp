let votes = ["ABC","ACB","ABC","ACB","ACB"]
let output = "ACB"

let mapOfRanking = new Map();
for(let i = 0; i < votes.length; i++) {
  let vote = votes[i]; // ["ABC"]
  for(let j = 0; j < vote.length; j++) {
    let team = vote[j]; // "A"
    let currentRanking = mapOfRanking.get(team);
    if(!currentRanking) {
       currentRanking = new Array(vote.length).fill(0);
    }
    currentRanking[j]++;
    mapOfRanking.set(team, currentRanking);
  }
}

console.log(mapOfRanking);

let sortedMap = new Map([...mapOfRanking].sort((a, b) => {
// Some sort function comparing keys with a[0] b[0] or values with a[1] b[1]
let ranking1 = a[1];
let ranking2 = b[1];
for(let i = 0; i < ranking1.length; i++) {
 if(ranking1[i] > ranking2[1]) {
   return -1;
 }
 if(ranking2[i] > ranking1[1]) {
   return +1;
 }
 if(ranking2[i] == ranking1[1]) {
   continue;
 }
}
return a[0] - b [0];
}
 ));

 console.log([...sortedMap.keys()].join());
