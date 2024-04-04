import { loadHeaderFooter} from "./utils.mjs";
import { apiFetch, displayResults } from "./weather-api.mjs"

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM Loaded")
  await loadHeaderFooter();
    
  const join = document.getElementById("join");
  const data = await apiFetch();
  const weatherContainer = document.getElementById("weatherContainer");
  console.log("weatherContainer:", weatherContainer); // Add this line to check the value

  displayResults(data, weatherContainer);
  
  join.addEventListener("click", function(){
    if(window.location.hostname === "localhost"){
      window.location.href = "http://localhost:5173";

    } else {
      window.location.href = "https://peanutbuttersharkface.github.io/chamber/src/index.html";

    }
   
  }); 
});