
import { loadHeaderFooter} from "./utils.mjs";
import { fetchData, displayText} from "./api.mjs";

export function togglePopupFixText(event) {
  event.stopPropagation();

  var popupText = document.getElementById("popupFixText");
  if(popupText){
    popupText.classList.toggle("show");
    
  }
}

export function togglePopupSacText(event){
  event.stopPropagation();

  var popupText2 = document.getElementById("popupSacText");
  if(popupText2){
    popupText2.classList.toggle("show2");
  }
}

document.addEventListener("click", function(event) {
  var popup = document.getElementById("popup");
  var popup2 = document.getElementById("popup2");
  
  var popupText = document.getElementById("popupFixText");
  var popupText2 = document.getElementById("popupSacText");
  
  if (popup && !popup.contains(event.target)){
    popupText.classList.remove("show");
  }

  if (popup2 && !popup2.contains(event.target)){
    popupText2.classList.remove("show2")
  }
});



document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM Loaded")
  await loadHeaderFooter();
  const URLtextElement = document.getElementById("URLtext");
  if (URLtextElement){
    URLtextElement.style.display = "block";
  } else {
    console.error("Element wiht ID 'URLtext' not found.")
  }
  const submitButton = document.getElementById("submitButton");

  document.getElementById("popup").addEventListener("click", togglePopupFixText);
  document.getElementById("popup2").addEventListener("click", togglePopupSacText);

  const formSubmitted = sessionStorage.getItem("formSubmitted");

  if (formSubmitted) {
    document.getElementById("URLtext").style.display = "block";
    sessionStorage.removeItem("formSubmitted");
  }
  const fix = document.querySelector(".rectangle_Fix");
  const sac = document.querySelector(".rectangle_Sac");

  submitButton.addEventListener("click", async function () {
   try { 
    const inputURLValue = inputURL.value;
    const fixationValue = fix.value;
    const saccadeValue = sac.value;
    const data = await fetchData(inputURLValue, fixationValue, saccadeValue);
    displayText(data);
   } catch (error){
      console.error("Error occurred:", error);
    }
  });


  window.addEventListener("beforeunload", function () {
    sessionStorage.removeItem("formSubmitted");
  });
});  

