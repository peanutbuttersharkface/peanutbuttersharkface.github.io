const url = 'JSON/directory.json';
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
async function getDirectoryData() {
    const response = await fetch(url);
    const data = await response.json();
    displayDirectory(data.directory);
  }
  
  getDirectoryData();

  const displayDirectory = (directory) => {
    const cards = document.querySelector('article.grid'); // select the output container element
  
    directory.forEach((direct) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');
      //let h2 = document.createElement('h2');
      let portrait = document.createElement('img');
      let h3 = document.createElement('h3');
      let h4 = document.createElement('h4');
      let h5 = document.createElement('h5');  
      // Build the h2 content out to show the prophet's full name - finish the template string
     // h2.textContent = `${direct.name}`;
      h3.textContent = `${direct.address}`;
      h4.textContent = `${direct.phonenumber}`;
     // h2.textContent = `${direct.name}`;
      h5.textContent = `${direct.website}`;  
  
      // Build the image portrait by setting all the relevant attribute
      portrait.setAttribute('src', direct.logo);
      portrait.setAttribute('alt', `Portait of ${direct.name}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      // Append the section(card) with the created elements
     // card.appendChild(h2);
      //card.appendChild(h2);
      card.appendChild(portrait);
      card.appendChild(h3);
      card.appendChild(h4);
      
      card.appendChild(h5);
  
      cards.appendChild(card);
    }) // end of forEach loop
  } // end of function expression