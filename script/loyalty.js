var members = data.results[0].members;
var statistics = { //Loyalty table (loyalty pages)
                  "least_loyal": lowestTenPercentOfVoters().map(person => ({ 
                                          Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                          Votes: person.total_votes,
                                          VotesPerc: person.votes_with_party_pct })),
                  "most_loyal": greaterTenPercentOfVoters().map(person => ({ 
                                          Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                          Votes: person.total_votes,
                                          VotesPerc: person.votes_with_party_pct }))
                      
                  }

var loyaltyTable = statistics;

//Find least loyal    
function lowestTenPercentOfVoters() { 
    var votes = [];
    var lowestTenPercent = [];
    
    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
    for (i = 0; i < members.length; i++) {
        votes.push(members[i]);
    }
    for (i = 0; i < votes.length; i++) {
        if (i < ((votes.length) * 0.1)) {
            lowestTenPercent.push(votes[i]);
        } else if (votes[i] == votes[i - 1]) {
            lowestTenPercent.push(votes[i]);
        } 
    }
    return lowestTenPercent;
}

//Find most loyal     
function greaterTenPercentOfVoters() { 
    var votes = [];
    var greaterTenPercent = [];
    
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
    for (i = 0; i < members.length; i++) {
        votes.push(members[i]);
    }
    for (i = 0; i < votes.length; i++) {
        if (i < ((votes.length) * 0.1)) {
            greaterTenPercent.push(votes[i]);
        } else if (votes[i] == votes[i - 1]) {
            greaterTenPercent.push(votes[i]);
        } 
    }
    return greaterTenPercent;
}    

createLeastLoyalTable(loyaltyTable["least_loyal"]);
function createLeastLoyalTable(array) {
    for (var i = 0; i < array.length; i ++){
        
        var row = document.createElement("tr");
        var names = document.createElement("td");
        names.innerHTML = array[i]["Name"];
        var votes = document.createElement("td");
        votes.innerHTML = array[i]["Votes"];
        var prc = document.createElement("td");
        prc.innerHTML = array[i]["VotesPerc"] + ' %';
        
        row.appendChild(names)
        row.appendChild(votes)
        row.appendChild(prc)
        document.getElementById("least-loyal-table").appendChild(row);
    }
  
} 

createMostLoyalTable(loyaltyTable["most_loyal"]);
function createMostLoyalTable(array) {
    for (var i = 0; i < array.length; i ++){
        
        var row = document.createElement("tr");
        var names = document.createElement("td");
        names.innerHTML = array[i]["Name"];
        var votes = document.createElement("td");
        votes.innerHTML = array[i]["Votes"];
        var prc = document.createElement("td");
        prc.innerHTML = array[i]["VotesPerc"] + ' %';
        
        row.appendChild(names)
        row.appendChild(votes)
        row.appendChild(prc)
        document.getElementById("most-loyal-table").appendChild(row);
    }
  
} 