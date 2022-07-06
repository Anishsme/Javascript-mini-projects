let x = 0;
function numclick(num) {
  if (x == 0) {
    document.getElementById("2-digit").innerText = num;
    x = 1;
  } else {
    document.getElementById("1-digit").innerText = num;
    x = 0;
  }
}
let c = document.getElementById("2-digit");
let c1 = document.getElementById("1-digit");
function clea() {
  console.log("Clicked");
  c.innerText = 0;
  c1.innerText = 0;
  document.getElementById("ans").innerText = " ";
  x = 0;
}

let num1, num2, sum, diff, prod, quo;
function add() {
  num1 = Number(c.innerText);
  num2 = Number(c1.innerText);
  sum = num1 + num2;
  document.getElementById("ans").innerText = " =" + sum;
}

function subtract() {
  num1 = Number(c.innerText);
  num2 = Number(c1.innerText);
  diff = num1 - num2;
  document.getElementById("ans").innerText = " =" + diff;
}
function multiply() {
  num1 = Number(c.innerText);
  num2 = Number(c1.innerText);
  prod = num1 * num2;
  document.getElementById("ans").innerText = " =" + prod;
}
function divide() {
  num1 = Number(c.innerText);
  num2 = Number(c1.innerText);
  quo = num1 / num2;
  document.getElementById("ans").innerText = " =" + quo;
}
