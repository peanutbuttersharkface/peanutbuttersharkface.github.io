const url = "https://pokeapi.co/api/v2/pokemon/ditto";
let results = null;
async function getPokemon(url) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
  }
}
function doStuff(data) {
 const results = data.results;
 const selectElement = document.createElement('select');
 results.forEach((pokemon) => {
    const option = document.createElement('option');
    option.value = pokemon.name;
    option.textContent = pokemon.name;
    selectElement.appendChild(option);
    
  });
}
document.body.appendChild(selectElement);