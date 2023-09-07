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

var cocktailName = $(".dropdown-name");
var ingredient = $(".dropdown-ingrediant");
var category = $(".dropdown-category");
var search = $(".cocktailSearchBar");
var categoryDrop = $(".dropdownForCategories");

cocktailName.on("click", nameEventHandler);
ingredient.on("click", ingredientEventHandler);
category.on("click", categoryEventHandler);

function nameEventHandler() {
  search.text("");
  categoryDrop.attr("hidden", true);
  search.append("<h2>Search your cocktail name here!</h2>");
  search.append(`<input class="cocktailNameInput" id="userNameInput" />`);
  search.append("<button class=saveName >Search</button>");
}

var saveNameBtn = $("#saveName");

$(search).on("click", "button", function () {
  var userInput = $("#userNameInput").val();
  $.ajax({
    url: cocktailDBEndpoint + cocktailDBExtensions.searchByName + userInput,
    method: "GET",
  }).then((data) => {
    console.log(data);

    if (data.drinks) {
      var savedDrinks = [];
      for (const drink of data.drinks) {
        var tempObj = {
          ingredients: [],
          measurements: [],
        };
        for (const key in drink) {
          if (drink[key]) {
            if (key.includes("Ingredient")) {
              tempObj.ingredients.push(drink[key]);
            } else if (key.includes("Measure")) {
              tempObj.measurements.push(drink[key]);
            } else {
              tempObj[key] = drink[key];
            }
          }
        }
        savedDrinks.push(tempObj);
      }
      console.log(savedDrinks);
      //
      localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
    } else {
      alert("Try again");
      //Append a message saying try again
      //
    }
  });
});

function ingredientEventHandler() {
  search.text("");
  categoryDrop.attr("hidden", true);
  search.append("<h2>Search your ingredient name here!</h2>");
  search.append("<input></input>");
  search.append("<button><a href=./display-recipes.html>Search</a></button>");
  console.log("ingrediantClicked");
}

function categoryEventHandler() {
  search.text("");
  categoryDrop.attr("hidden", true);
  categoryDrop.attr("hidden", false);
  console.log("categoryClicked");
}

$.ajax({
  url: cocktailCatagories,
  method: "GET",
  // async: false,
}).then((data) => {
  displayingRecipes = data.meals;
  // console.log(data);
});
