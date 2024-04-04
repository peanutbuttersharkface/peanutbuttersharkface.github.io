
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

  document.getElementById("popup").addEventListener("click", togglePopupFixText);
  document.getElementById("popup2").addEventListener("click", togglePopupSacText);

  const form = document.getElementById("readingForm");
  const backButton = document.getElementById("backButton");
  const submitButton = document.getElementById("submitButton");
  let responseContainer;
  const inputURL = document.getElementById("inputURL");
  
  if (backButton) {
   backButton.style.display = "none";
  }
  const fix = document.querySelector(".rectangle_Fix");
  const sac = document.querySelector(".rectangle_Sac");
  
  const isFormVisible = document.getElementById("lastUsedURLsList");
  const urlTitle = document.getElementById("lastUsedURLsListTitle");
  console.log("form is visible:", isFormVisible);


  async function onSubmit(event){
    try { 
      const inputURLValue = inputURL.value;
      const lastUsedURLs = JSON.parse(localStorage.getItem("lastUsedURLs")) || [];
      lastUsedURLs.unshift(inputURLValue);
      const fixationValue = fix.value;
      const saccadeValue = sac.value;
      const data = await fetchData(inputURLValue, fixationValue, saccadeValue);
      responseContainer = document.getElementById("responseContainer");
      displayText(data, responseContainer);
      backButton.style.display = "block";
      responseContainer.style.display = "block";
      const lastThreeURLs = lastUsedURLs.slice(0, 3);
      localStorage.setItem("lastUsedURLs", JSON.stringify(lastThreeURLs));
      form.style.display = "none";
      isFormVisible.style.display ="none";
      urlTitle.style.display = "none";
    } catch (error){
      console.error("Error occurred:", error);
    }
    event.preventDefault(); 
    form.style.display = "none";
    console.log("form is visible", isFormVisible);
  }
  if (submitButton) {
  submitButton.addEventListener("click", onSubmit);
  }
 
  backButton.addEventListener("click", function(){
    if(window.location.hostname === "localhost"){
      window.location.href = "http://localhost:5173";

    } else {
      window.location.href = "https://peanutbuttersharkface.github.io/final/src/index.html";

    }
    
    responseContainer.style.display = "none";
    form.style.display = "block";
    inputURL.value = "";
    fix.value = "";
    sac.value = "";
    backButton.style.display = "none";
    isFormVisible.style.display = "block";
    urlTitle.style.display = "block";
  }); 
 
  async function displayLastThreeURLs() {
    const lastUsedURLs = JSON.parse(localStorage.getItem("lastUsedURLs")) || [];
    console.log("Last Used URLs:", lastUsedURLs);

    const ul = document.getElementById("lastUsedURLsList");
    ul.innerHTML = '';

    for (let i = 0; i < Math.min(3, lastUsedURLs.length); i++) {
      const url = lastUsedURLs[i];
      const li = document.createElement("li");
      const link = document.createElement("a");
      const articleTitle = await fetchH1FromURL(url);

      link.textContent = articleTitle;
      link.href = "#";
      link.dataset.url = url;
     
      li.appendChild(link)
      ul.appendChild(li);
      link.addEventListener("click", function(event){
        event.preventDefault();
        inputURL.value = this.dataset.url;
      });
    }
    isFormVisible.style.display = "block";
    urlTitle.style.display = "block";
  }
  async function fetchH1FromURL(url){
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const h1 = doc.querySelector("h1");
      return h1 ? h1.textContent : url;  
    } catch (error){
      console.error("Error fetching h1 from URL:", error);
      return url;
    }
}
  displayLastThreeURLs();

window.addEventListener("beforeunload", function () {
  sessionStorage.removeItem("formSubmitted");
});
});
