const searchForm = document.querySelector("#search");
const pokeSearch = document.querySelector(".btn-search");


function searchPokemon(pokemon) {
  const cachedData = localStorage.getItem('pokeData');
  if (!cachedData) {
    console.log("No data available in cache");
    return [];
  } 

  const data = JSON.parse(cachedData);

  console.log(data.results.filter(item => item.name.includes(pokemon)));
}

function pokeballSearch(e) {
  if (e.type == "click" || e.key == "Enter") {
    searchPokemon(searchForm.value);
    console.log(searchForm.value);
    searchForm.value = "";
  }
}

pokeSearch.addEventListener("click", (e) => pokeballSearch(e));
searchForm.addEventListener("keyup", (e) => pokeballSearch(e));

async function getAllPokemon() {
  const cachedData = localStorage.getItem("pokeData");

  if (cachedData) {
    console.log("Have the pokeData");
    const innerData = JSON.parse(localStorage.getItem('pokeData'));
    console.log(innerData.results[0].name);
    return JSON.parse(cachedData);
  }

  console.log("Getting Data from API");
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
  const data = await response.json();

  localStorage.setItem("pokeData", JSON.stringify(data));

  console.log(data);
}

getAllPokemon();
