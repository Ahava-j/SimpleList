
const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners 
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
  try {
    const reqR = await http.get('/api');
    theList = reqR;
    ShowList();
    // if (reqR.ok) {
    //   theList = await reqR.json();
    //   ShowList();
    // } 
    // else {
    //   console.error('Error:', reqR.status, reqR.statusText);
    //   result.innerHTML = 'Error loading list. Please try again later.';
    // }
  } catch (error) {
    console.error('Network error:', error);
    result.innerHTML = 'Network error. Please check your connection and try again.';
  }
}

async function WriteList() {
// sending a list to the server 
// sending the list as data 
//ust http object to send server using post 
try {
  await http.post('/api', theList);
  return;
} 
catch(error) {
  console.log(error);
  return;
}

}

/* Listener Functions */
async function httpPost(e) { // e is an  event object 
  // e.preventDefault();
  // const addEle = input.value; // gets value of input thingy
  theList.push(input.value); // adds ti the back of list
  console.log(JSON.stringify(theList));
  await WriteList(); // calls write list and waits for it to compelte before calling showlist
  // ShowList(); //updates the displayed list to match thelist
  return true; 
}

function httpDelete(e) {
// takes the value and removes it from the list 
// update the server 
// e.preventDefault();

const varDelete = input.value;
const index = theList.indexOf(input.value);
if (index !== -1) {
  theList.splice(index, 1);
  WriteList();
} else {
  console.log("Not found in array");
}
  return;
  
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();