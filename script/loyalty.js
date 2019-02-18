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

createLeastLoyalTable(loyaltyTable["least_loyal"] , "least-loyal-table");
createLeastLoyalTable(loyaltyTable["most_loyal"] , "most-loyal-table");

function createLeastLoyalTable(array, id) {
    for (var i = 0; i < array.length; i ++){
        
        var row = document.createElement("tr");
        var names = document.createElement("td");
        var cellContent = names.innerHTML = array[i]["Name"];
        var cellLink = members[i].url;
        names.innerHTML = cellContent.link(cellLink);
        var votes = document.createElement("td");
        votes.innerHTML = array[i]["Votes"];
        var prc = document.createElement("td");
        prc.innerHTML = array[i]["VotesPerc"] + ' %';
        
        row.appendChild(names)
        row.appendChild(votes)
        row.appendChild(prc)
        document.getElementById(id).appendChild(row);
    }
  
} 
