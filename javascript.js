const searchForm = document.querySelector("#search");
const pokeSearch = document.querySelector(".btn-search");
const pokeGrid = document.querySelector("#pokeCards_grid");
let shownPokemon = 0;

function tempGrabCache() {
  return JSON.parse(localStorage.getItem("pokeData"));
}

function searchPokemon(pokemon) {
  const cachedData = localStorage.getItem("pokeData");
  if (!cachedData) {
    console.log("No data available in cache");
    return [];
  }

  const data = JSON.parse(cachedData);

  console.log(data.results.filter((item) => item.name.includes(pokemon)));
}

function pokeballSearch(e) {
  if (e.type == "click" || e.key == "Enter") {
    searchPokemon(searchForm.value);
    searchForm.value = "";
  }
}

async function getAllPokemon() {
  const cachedData = localStorage.getItem("pokeData");

  if (cachedData) {
    console.log("Have the pokeData");
    return JSON.parse(cachedData);
  }

  console.log("Getting Data from API");
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
  const data = await response.json();

  localStorage.setItem("pokeData", JSON.stringify(data));

  console.log(data);
}

pokeSearch.addEventListener("click", (e) => pokeballSearch(e));
searchForm.addEventListener("keyup", (e) => pokeballSearch(e));

getAllPokemon();

//const testPoke = fetch(tempGrabCache().results[0].url).then(res => res.json());

//const poke = testPoke.then(data => data);

function showPokemon(show = 20) {
  shownPokemon += show;
  return tempGrabCache().results.splice(0, show);
}

async function cleanPokeArray() {
  const urls = showPokemon().map((poke) => poke.url);
  const requests = urls.map((url) => fetch(url));

  const response = await Promise.all(requests);
  const data = await Promise.all(response.map(responses => responses.json()));
  console.log(data);
}

cleanPokeArray();

pokeGrid.innerHTML = `
      <div class="pokeCard_holder">
        <div class="pokeCard_name">
          <h3>Bulbasaur</h3>
        </div>
        <div class="pokeCard_type">
          <p>Grass</p>
          <p>Poison</p>
        </div>
        <div class="pokeCard_img">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt=""
          />
        </div>
      </div>`;
