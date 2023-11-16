const url = "https://pokeapi.co/api/v2/pokemon/ditto";
//let results = null;

async function getPokemon(url) {
    try{
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        doStuff(data);
      }else {
        throw new Error('response not ok');
      }
    } catch (error) {
        console.error('error getting data:', error);
    }
}

function doStuff(data) {
    try{
     const results = data.results;
     if(results && Array.isArray(results)){
      const selectElement = document.createElement('select');


      results.forEach((pokemon) => {
        const option = document.createElement('option');
        option.value = pokemon.name;
        option.textContent = pokemon.name;
        selectElement.appendChild(option);
      });

      document.body.appendChild(selectElement);
    } else {
      throw new Error('Invalid data format or empty results array.');
    }
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

getPokemon(url);
