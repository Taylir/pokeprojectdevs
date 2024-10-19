const searchForm = document.querySelector("#search");
const pokeSearch = document.querySelector(".btn-search");

function pokeballSearch(e) {
  if (e.type === "click" || e.key === "Enter") {
    console.log(e);
    console.log(searchForm);
  }
}

pokeSearch.addEventListener("click", (e) => pokeballSearch(e));
searchForm.addEventListener("keydown", (e) => pokeballSearch(e));
