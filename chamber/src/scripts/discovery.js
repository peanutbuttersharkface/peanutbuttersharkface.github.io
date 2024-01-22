
//get all images with data-scr attribute
let imagesToLoad = document.querySelectorAll("img[data-src]");

// optional parameters being set for the intersectionalObserver
const imgOptions = {
    threshold:1,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {image.removeAttribute("data-src");};
  };

 //first check to see if Intersection Observer is supported 
if('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer ) => {
        items.forEach((item) => {
            if(item.isIntersecting){
                loadImages(item.target);
                imgObserver.unobserve(item.target);
            }
        });
    }, imgOptions);

    // loop through each img on check status and load if necessary
    imagesToLoad.forEach((img) => {
      imgObserver.observe(img);
  });
}
else{ // just load all imges if not supported
imagesToLoad.forEach((img) => {
    loadImages(img);
});
}

// number of visits user has made to page
//const todayDisplay = document.querySelector(".today");
const visitsDisplay = document.querySelector("#visits");

const date = new Date();
const currTime = date.getTime();

let numVisits = Number(window.localStorage.getItem("visits-ls"));

if(numVisits <= 1 ){
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    let timeDiff = currTime - lastVisitTime;
    let daysSinceVisit = timeDiff / (1000 * 3600 * 24);
    visitsDisplay.textContent = Math.round(daysSinceVisit);
    
}else{
    visitsDisplay.textContent = "Welcome, New member!";
}

numVisits++;

localStorage.setItem("visits-ls", numVisits);
localStorage.setItem('lastVisitTime', currTime);
//todayDisplay.textContent = Date.now();