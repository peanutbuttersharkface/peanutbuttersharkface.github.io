const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let month = months[d.getMonth()];
let day = days[d.getDay()];
let years = d.getFullYear();
let num = d.getDate();
let currentDate = `${day}, ${num} ${month} ${years}`
document.getElementById("date").innerHTML = currentDate;


const year = new Date().getFullYear()
const lastModified = document.lastModified

document.querySelector("#currentYear").textContent = year
document.querySelector("#lastUpdated").textContent = lastModified

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');


hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);
// annoucement bar

if (new Date().getDay() == 1){
    document.querySelector("#ann").style.display ="block";
}else if (new Date().getDay() == 2){
    document.querySelector("#ann").style.display ="block";
}else{
    document.querySelector("#ann").style.display ="none";
}
 



