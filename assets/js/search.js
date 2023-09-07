const mealDBEndpoint = "https://www.themealdb.com/api/json/v1/1/";
const mealDBExtensions = {
  searchByName: "search.php?s=",
  searchByRegion: "filter.php?a=",
  searchByCategory: "filter.php?c=",
  searchByIngredient: "filter.php?i=",
  listRegions: "list.php?a=list",
  listCategories: "list.php?c=list",
  listIngredients: "list.php?i=list",
  random: "random.php",
};

const cocktailDBEndpoint = "https://www.thecocktaildb.com/api/json/v1/1/";
const cocktailDBExtensions = {
  searchByName: "search.php?s=",
  searchByIngredient: "filter.php?i=",
  searchByCategory: "filter.php?c=",
  searchByGlass: "filter.php?g=",
  searchByAlcoholic: "filter.php?a=",
  listCategories: "list.php?c=list",
  listGlasses: "list.php?g=list",
  listIngredients: "list.php?i=list",
  listAlcoholics: "list.php?a=list",
  random: "random.php",
};
var cocktailCatagories =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

// console.log(cocktailIngrediants);

$.ajax({
  url: cocktailCatagories,
  method: "GET",
  // async: false,
}).then((data) => {
  displayingRecipes = data.meals;
  console.log(data);
});

$(document).ready(function() {
  $("#dropdown-item").on(function () {
    $("#dropdown").html("the selected text is " + $())
    
  })
})







// if (userInput === name) {
//     make a search bar appear

//   } else if (userInput === ingredient) {
//       make a search bar

//     } else {
//         make another drop down
//       }
