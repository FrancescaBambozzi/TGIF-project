// Step 1. The var newMembArray = {..} contains a "results" field. The "results" field contains an array (members) -- ACCESS that ARRAY.

var members = data.results[0].members;


// Step 2. Create a loop over that array.

   /* create a new array of newMembArrayects (newMembArray === each member profile) containing only the properties needed.
      - the .map() method iterate through each element of the array
      - then, it creates a function that perform like this: 
        inside the new array(newMembArray) STORE only the elements with the following properties: */

function createNewArray(){

window.newMembArray = members.map(person => ({ Name: person.first_name, //use window.variable object to make the var global
                                               MiddleName:person.middle_name, 
                                               Surname: person.last_name, 
                                               Party: person.party, 
                                               State: person.state, 
                                               Seniority: person.seniority, 
                                               Votes: person.votes_with_party_pct} 

))
}

// Step 3. The loop has to generate a table displaying the newMembArray data.
                     
var table = document.getElementById("senate-data"); //give this ID to the table in HTML

function generateTable(){

for (var i = 0; i < newMembArray.length; i++) {
    
    var row = table.insertRow(i);
   
    for(key in newMembArray[i]){
        
      var cell = row.insertCell(0)
      cell.innerHTML = newMembArray[i][key];
}
};
};

console.log(table);

createNewArray();
generateTable();