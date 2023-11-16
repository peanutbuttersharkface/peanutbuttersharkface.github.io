const url = "https://pokeapi.co/api/v2/pokemon/ditto";
let results = null;

async function getPokemon(url) {
  const response = await fetch(url);
  if (response.ok) {
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

  document.body.appendChild(selectElement); // Move this line inside the doStuff function
}

getPokemon(url);