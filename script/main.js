// Step 1. The var newMembArray = {..} contains a "results" field. The "results" field contains an array (members) -- ACCESS that ARRAY.

var members = data.results[0].members;

// Step 2. Create a loop over that array.

   /* create a new array (newMembArray === each member profile) containing only the properties needed.
      - the .map() method iterate through each element of the array
      - then, it creates a function that perform like this: 
        inside the new array(newMembArray) STORE only the elements with the following properties: */

function createNewArray(){

//use window.var object to make the var global
window.newMembArray = members.map(person => ({ Name: [person.first_name, person.middle_name, person.last_name].join(" "),
                                               //to join all these values inside one property.
                                               Party: person.party, 
                                               State: person.state, 
                                               Seniority: person.seniority, 
                                               Votes: person.votes_with_party_pct} 

))
}

// Step 3. The loop has to generate a table displaying the newMembArray data.
                     
function generateTable(){
    
    var table = document.getElementById("dataTable"); //give this ID to the table in HTML of both House and Senate Page
    
    var header = table.createTHead();   
    var rowHead = header.insertRow(0);
    
    var name = rowHead.insertCell(0);
    name.innerHTML = "Name";
    var party = rowHead.insertCell(1);
    party.innerHTML = "Party";
    var state = rowHead.insertCell(2);
    state.innerHTML = "State";
    var seniority = rowHead.insertCell(3);
    seniority.innerHTML = "Seniority";
    var votes = rowHead.insertCell(4);
    votes.innerHTML = "Votes";
    
    var body = document.createElement("tbody");
  
for (var i = 0; i < newMembArray.length; i++) {
    
    var row = body.insertRow(i);
    
    for(key in newMembArray[i]){
        
      var cell = row.insertCell();
      var cellContent = newMembArray[i][key];
        
        if(key === 'Name'){
            
            var cellLink = members[i].url;
            cell.innerHTML = cellContent.link(cellLink);
                
        } else if(key === 'Votes'){
            
            cell.innerHTML = cellContent +  ' %'; 
        }
        
        else {
            
            cell.innerHTML = cellContent;
        }
    } 

};
      table.append(body); //the append() method inserts specified content(body) at the end of the selected elements(table)

};

createNewArray();
generateTable();

//CHECKBOXES FUNCTION

/*    var democratButton = document.getElementById("democrat-button");
    democratButton.addEventListener('click', () => {
        
        console.log(democrats);
    }); */

var democrats = members.filter(val => val.party == 'D');
var republicans = members.filter(val => val.party == 'R');
var independents = members.filter(val => val.party == 'I');


function filterTable() {
    
    var checkBox = document.getElementById("democrat-button");
    
     if (checkBox.checked == true && ){
         
         console.log(democrats);
         
  } else {
    
  }
}


filterTable(); 
