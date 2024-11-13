const searchForm = document.querySelector("#search");
const pokeSearch = document.querySelector(".btn-search");
const pokeGrid = document.querySelector("#pokeCards_grid");
let shownPokemon = 0;

function searchPokemon(pokemon) {
  const cachedData = localStorage.getItem("pokeData");
  if (!cachedData) {
    console.log("No data available in cache");
    return [];
  }

  const data = JSON.parse(cachedData);

  return data.filter((item) => item.name.toLowerCase().includes(pokemon.toLowerCase()));
}

function displayPokemon(arr) {
  return arr
    .map(
      (poke) => `<div id=${poke.id} class="pokeCard_holder">
        <div class="pokeCard_name">
          <h3>${poke.name}</h3>
        </div>
        <div class="pokeCard_type">
          <p>${poke.type1}</p>
          <p>${poke.type2}</p>
        </div>
        <div class="pokeCard_img">
          <img
            src=${poke.picture}
            alt=""
          />
        </div>
      </div>`,
    )
    .join("");
}

function pokeballSearch(e) {
  if (e.type == "click" || e.key == "Enter") {
    pokeGrid.innerHTML = "";
    pokeGrid.innerHTML = displayPokemon(searchPokemon(searchForm.value));
    searchForm.value = "";
  }
}

class Pokemon {
  constructor(id, name, type1, type2, picture, shiny) {
    this.id = id;
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.picture = picture;
    this.shiny = shiny;
  }
}

async function getWholePokemon() {
  const cachedData = localStorage.getItem("pokeData");

  if (cachedData) {
    console.log("Have the pokeData");
    pokeGrid.innerHTML = displayPokemon(JSON.parse(cachedData));
    return JSON.parse(cachedData);
  }

  console.log("Getting data from api");
  const pokemonToCache = [];
  for (let i = 0; i < 1025; i += 25) {
    console.log(i);
    const pokePromiseArray = [];
    for (let j = i + 1; j <= i + 25; j++) {
      pokePromiseArray[j - i - 1] = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${j}`,
      ).then((resp) => resp.json());
    }
    console.log(pokePromiseArray);
    const promisedPokemon = await Promise.all(pokePromiseArray);
    const cachedPokemon = promisedPokemon.map(
      (poke) =>
        new Pokemon(
          poke.id,
          poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
          poke.types[0].type.name.charAt(0).toUpperCase() +
            poke.types[0].type.name.slice(1),
          poke.types[1]?.type.name.charAt(0).toUpperCase() +
            poke.types[1]?.type.name.slice(1) || "",
          poke.sprites.front_default,
          poke.sprites.front_shiny,
        ),
    );
    pokemonToCache.push(...cachedPokemon);
    pokeGrid.innerHTML += displayPokemon(cachedPokemon);
    localStorage.setItem("pokeData", JSON.stringify(pokemonToCache));
    console.log(`I ran ${i+1} time`);
  }
}

getWholePokemon();

pokeSearch.addEventListener("click", (e) => pokeballSearch(e));
searchForm.addEventListener("keyup", (e) => pokeballSearch(e));
