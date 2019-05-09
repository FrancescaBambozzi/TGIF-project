const app = new Vue({
    el: "#app",
    data: {
        members: [],
        isLoadding: true,
        states: [],
        parties: [],
        partyArray: ["D", "R", "I"],
        selectedState: "all",
        filteredMembers: [],
        statistics: []

    },
    created: function () {
        this.getData()
    },
    methods: {
        getData: function () {
            fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
                    method: "GET",
                    headers: new Headers({
                        "X-API-Key": '8pToDd0vDGdgeKF7E7BH3SfKcegp4QMJowvY45sN'
                    })
                })

                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    data = json;
                    app.members = data.results[0].members;
                    app.filteredMembers = app.members;
                    app.isLoadding = false;
                    app.createDropOptions();
                    app.createCheckboxes();
                    app.statistics = [
                        { //At a glance table
                            "tot_democrat": "hello", //totalMembersPerParty("D").length
                            "democrats_avg_votes_with_party": findAverageParty("D"),

                        },
                        {
                            "tot_republican": totalMembersPerParty("R").length,
                            "republican_avg_votes_with_party": findAverageParty("R"),

                        },
                        {
                            "tot_independent": totalMembersPerParty("I").length,
                            "independent_avg_votes_with_party": findAverageParty("I"),
                        },
                        {
                            "tot_represantives": totalMembersPerParty("D").length + totalMembersPerParty("R").length + totalMembersPerParty("I").length,
                            "percentage_votes_with_party": sumAvgTotal(),
                        },
                        { //Least Eng table 
                            "least_engaged": lowestTenPercentOfEngaged().map(person => ({
                                Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                Votes: person.missed_votes,
                                VotesPerc: person.missed_votes_pct
                            }))
                        },
                        { //Most Eng table
                            "most_engaged": greaterTenPercentOfEngaged().map(person => ({
                                Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                Votes: person.missed_votes,
                                VotesPerc: person.missed_votes_pct
                            }))
                        }
                       ]

                    console.log(statistics);

                }).catch(function (error) {
                    console.log(error)
                })
        },
        createDropOptions: function () {
            var optionsArray = this.members.map(getState => getState.state);
            optionsArray.sort();

            var stateArray = optionsArray.filter(function (item, index) {
                return optionsArray.indexOf(item) == index;
            })

            this.states = stateArray;
        },
        createCheckboxes: function () {

            var partyArray = this.members.map(getParty => getParty.party);
            var checkboxesArray = partyArray.filter(function (item, index) {
                return partyArray.indexOf(item) == index;
            })

            this.parties = checkboxesArray;
        },
        filterEngine() {
            this.filteredMembers = this.members.filter(member => this.partyArray.includes(member.party) && (this.selectedState == member.state || this.selectedState == "all"))
        },
        totalMembersPerParty(party) {
            var total = this.members.filter(member => member.party === party);
            return total;
        },
        sumPercentByParty(array) {
            var totalPercent = array.reduce((accumulator, percentage) => accumulator + percentage.votes_with_party_pct, 0);
            return totalPercent;
        },
        findAverageParty(array) {
            var average = sumPercentByParty(totalMembersPerParty(array)) / totalMembersPerParty(array).length;
            if (isNaN(average))
                average = 0
            return average.toFixed(2);
        },
        sumAvgTotal() {
            let demo = (sumPercentByParty(totalMembersPerParty("D")) / totalMembersPerParty("D").length) * (totalMembersPerParty("D").length / members.length);
            if (isNaN(demo))
                demo = 0
            let rep = (sumPercentByParty(totalMembersPerParty("R")) / totalMembersPerParty("R").length) * (totalMembersPerParty("R").length / members.length)
            if (isNaN(rep))
                rep = 0
            let ind = (sumPercentByParty(totalMembersPerParty("I")) / totalMembersPerParty("I").length) * (totalMembersPerParty("I").length / members.length)
            console.log(isNaN(ind))
            if (isNaN(ind))
                ind = 0;

            return (demo + rep + ind).toFixed(2)
        },
        lowestTenPercentOfEngaged() {
            var votes = [];
            var lowestTenPercent = [];

            this.members.sort(function (a, b) {
                return a.missed_votes_pct - b.missed_votes_pct;
            });
            for (i = 0; i < this.members.length; i++) {
                votes.push(this.members[i]);
            }
            for (i = 0; i < votes.length; i++) {
                if (i < ((votes.length) * 0.1)) {
                    lowestTenPercent.push(votes[i]);
                } else if (votes[i] == votes[i - 1]) {
                    lowestTenPercent.push(votes[i]);
                } else {
                    break;
                }
            }
            return lowestTenPercent;
        },
        greaterTenPercentOfEngaged() {
            var votes = [];
            var greaterTenPercent = [];

            this.members.sort(function (a, b) {
                return b.missed_votes_pct - a.missed_votes_pct;
            });
            for (i = 0; i < this.members.length; i++) {
                votes.push(members[i]);
            }
            for (i = 0; i < votes.length; i++) {
                if (i < ((votes.length) * 0.1)) {
                    greaterTenPercent.push(votes[i]);
                } else if (votes[i] == votes[i - 1]) {
                    greaterTenPercent.push(votes[i]);
                } else {
                    break;
                }
            }
            return greaterTenPercent;
        },

    }
})

/*
//Generate the 'Senate/House at a glance' table
function createGlanceTable(array) {

    var demoRow = document.createElement("tr");

    var democrats = demoRow.insertCell();
    democrats.innerHTML = "Democrats";
    var demoTotal = demoRow.insertCell();
    demoTotal.innerHTML = statistics[0]["tot_democrat"];
    var demoAve = demoRow.insertCell();
    demoAve.innerHTML = array[4] + ' %';

    var repRow = document.createElement("tr");

    var republicans = repRow.insertCell();
    republicans.innerHTML = "Republicans";
    var repTotal = repRow.insertCell();
    repTotal.innerHTML = statistics[0]["tot_republican"];
    var repAve = repRow.insertCell();
    repAve.innerHTML = array[5] + ' %';

    var indRow = document.createElement("tr");

    var independent = indRow.insertCell();
    independent.innerHTML = "Independent";
    var indTotal = indRow.insertCell();
    indTotal.innerHTML = statistics[0]["tot_independent"];
    var indAve = indRow.insertCell();
    indAve.innerHTML = array[6] + ' %';

    var totRow = document.createElement("tr");

    var totRepres = totRow.insertCell();
    totRepres.innerHTML = "Total";
    var numRepres = totRow.insertCell();
    numRepres.innerHTML = statistics[0]["tot_represantives"];
    var prcVotes = totRow.insertCell();
    prcVotes.innerHTML = array[7] + ' %';

    document.getElementById("glance-table-body").appendChild(demoRow);
    document.getElementById("glance-table-body").appendChild(repRow);
    document.getElementById("glance-table-body").appendChild(indRow);
    document.getElementById("glance-table-body").appendChild(totRow);
}

//Engagement tables
function createEngTable(array, id) {
    for (var i = 0; i < array.length; i++) {

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
*/
