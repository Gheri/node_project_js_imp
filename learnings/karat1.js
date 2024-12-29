let cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]

let results = [];
let map = new Map();
for(const domain of cpdomains) {
    let visNumAndDomain = domain.split(" ");
    let visNum = visNumAndDomain[0].trim();
    let cpDomain = visNumAndDomain[1].trim();
    
    let allSubDomains = cpDomain.split(".");
    let subDomain = "";
    for(let k = allSubDomains.length - 1; k >=0 ; k--) {
        if(subDomain) {
            subDomain = allSubDomains[k] + "." + subDomain; // com;
        } else {
            subDomain = allSubDomains[k];
        }
        let currCount = map.get(subDomain) || 0;
        map.set(subDomain, currCount + parseInt(visNum));
    }
}

for(const [key, value] of map) {
    results.push(value + " " + key);
}

console.log(results);