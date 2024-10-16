const searchForm = document.querySelector("#search");
const pokeSearch = document.querySelector(".btn-search");

window.addEventListener("keyup", (e)=>{
  if (e.key == "Enter") console.log(true);
  if (e.key !== "Enter") console.log(false);
});
