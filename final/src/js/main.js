
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

  /* Welcome Popup */
  const popupShow = localStorage.getItem("popupShow");
  if (!popupShow){
    const pop = document.getElementById("welcomePop");
    pop.style.display = "block";
    document.getElementById("closePopup").addEventListener("click", function() {
      pop.style.display = "none";
      localStorage.setItem("popupShow", "true");
    });
  }
  /* Text from the URL */
  const URLtextElement = document.getElementById("URLtext");
  if (URLtextElement){
    URLtextElement.style.display = "block";
  } else {
    console.error("Element wiht ID 'URLtext' not found.")
  }

  document.getElementById("popup").addEventListener("click", togglePopupFixText);
  document.getElementById("popup2").addEventListener("click", togglePopupSacText);

  const form = document.getElementById("readingForm");
  const backButton = document.getElementById("backButton");
  const submitButton = document.getElementById("submitButton");
  const responseContainer = document.getElementById("responseContainer");
  const inputURL = document.getElementById("inputURL");
  
  if (backButton) {
   backButton.style.display = "none";
  }
  const fix = document.querySelector(".rectangle_Fix");
  const sac = document.querySelector(".rectangle_Sac");
 
  async function onSubmit(event){
    try { 
      const inputURLValue = inputURL.value;
      const fixationValue = fix.value;
      const saccadeValue = sac.value;
      const data = await fetchData(inputURLValue, fixationValue, saccadeValue);
      displayText(data);
      backButton.style.display = "block";
      URLtextElement.style.display = "block";
      responseContainer.style.display = "block";
    } catch (error){
      console.error("Error occurred:", error);
    }
    event.preventDefault(); 
    form.style.display = "none";
  }
  if (submitButton) {
  submitButton.addEventListener("click", onSubmit);
  }

  backButton.addEventListener("click", async function(){
    responseContainer.style.display = "none";
    
    form.style.display = "block";
    inputURL.value = "";
    fix.value = "";
    sac.value = "";
    backButton.style.display = "none";
  }); 
window.addEventListener("beforeunload", function () {
  sessionStorage.removeItem("formSubmitted");
});
});
