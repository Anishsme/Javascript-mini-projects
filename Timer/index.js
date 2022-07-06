const year = "1 Jan 2023";

let l_day = document.querySelector("#days");
let l_hour = document.querySelector("#hours");
let l_min = document.querySelector("#minutes");
let l_sec = document.querySelector("#seconds");
function countdown() {
  let newYearDate = new Date(year);
  let currentDate = new Date();
  //   newYearDate-current date gives us the milliseconds between the dates
  let total_seconds = (newYearDate - currentDate) / 1000;
  let days = Math.floor(total_seconds / (3600 * 24));
  let hours = Math.floor(total_seconds / 3600) % 24;
  let min = Math.floor(total_seconds / 60) % 60;
  let second = Math.floor(total_seconds) % 60;
  l_day.innerText = days;
  l_hour.innerText = hours;
  l_min.innerText = min;
  l_sec.innerText = second;
}
countdown();
// Function is called every 1 second
setInterval(countdown, 1000);
