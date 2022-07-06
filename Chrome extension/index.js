/*
  Look up differences between innerHTML, textContent,innerText
  falsy values
  {
    NaN,false,0,"",null,undefined
  }
  Try using const as much as possible
*/

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let count = 0;
// Below array stores all the stuff we get from the textfield
let myLeads = [];
let str;
// We need to store the collected leads so when we refresh the page we do not lose the leads
// let leadsfromStorage = JSON.parse(localStorage.getItem("Leads"));
const leadsfromStorage = JSON.parse(localStorage.getItem("Leads"));
if (leadsfromStorage) {
  myLeads = leadsfromStorage;

  print(myLeads);
}

function print(leads) {
  ulEl.innerHTML = "";
  for (let i = 0; i < leads.length; i++) {
    // We used template strings
    ulEl.innerHTML += ` 
    <li>
      <a href='${leads[i]}' target='_blank'>
      ${leads[i]} 
      </a>
      </li>`;
    // Another way to add li elements
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append();
  }
}
// Adding eventListener to the button
inputBtn.addEventListener("click", save);
delBtn.addEventListener("dblclick", delete_all);
tabBtn.addEventListener("click", tabClick);

function tabClick() {
  // This is code to get the url for the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    str = JSON.stringify(myLeads);
    localStorage.setItem("Leads", str);
    print(myLeads);
  });
}
// When the SAVE button is clicked
function save() {
  if (inputEl.value != "") {
    myLeads.push(inputEl.value);
    str = JSON.stringify(myLeads);
    localStorage.setItem("Leads", str);
    print(myLeads);
    inputEl.value = "";
  }
}

function delete_all() {
  localStorage.clear();
  ulEl.innerHTML = "";
  myLeads.length = 0;
}
