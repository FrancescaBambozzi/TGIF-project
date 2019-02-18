var members = data.results[0].members;
var statistics = { //Engagement table (attendance pages)
                  "least_engaged": lowestTenPercentOfEngaged().map(person => ({ 
                                          Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                          Votes: person.missed_votes,
                                          VotesPerc: person.missed_votes_pct})),
                  "most_engaged": greaterTenPercentOfEngaged().map(person => ({ 
                                          Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                          Votes: person.missed_votes,
                                          VotesPerc: person.missed_votes_pct}))
                  }

var engagementTable = statistics;

//Find least engaged     
function lowestTenPercentOfEngaged() { 
    var votes = [];
    var lowestTenPercent = [];
    
    members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
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

//Find most engaged     
function greaterTenPercentOfEngaged() { 
    var votes = [];
    var greaterTenPercent = [];
    
    members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
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

//Engagement Pages
createLeastEngTable(engagementTable["least_engaged"]);
createMostEngTable(engagementTable["most_engaged"]);

function createLeastEngTable(array) {
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
        document.getElementById("least-engaged-table").appendChild(row);
    }
  
} 

function createMostEngTable(array) {
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
        document.getElementById("most-engaged-table").appendChild(row);
        
    } 
  
} 
