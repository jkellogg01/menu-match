//API FOR MEALS
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
//TESTING TO SEE IF API IS PULLING DATA
var mealnamess = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

//API FOR COCKTAILS
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
//TESTING TO SEE IF API IS PULLING DATA
var cocktailCatagories =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

//COCKTAIL GLOBAL VARIABLES
var cocktailName = $(".dropdown-name");
var ingredient = $(".dropdown-ingrediant");
var category = $(".dropdown-category");
var search = $(".cocktailSearchBar");
var categoryDrop = $(".dropdownForCategories");

// MEAL GLOBAL VARIABLES
var mealName = $(".dropdown-MealName");
var mIngredient = $(".dropdown-MealIngrediant");
var mCategory = $(".dropdown-MealCategory");
var mSearch = $(".mealSearchBar");
var mCategoryDrop = $(".dropdownForMealCategories");

//COCKTAIL EVENT LISTENERS
cocktailName.on("click", nameEventHandler);
ingredient.on("click", ingredientEventHandler);
// category.on("click", categoryEventHandler);

//MEAL EVENT LISTENERS
mealName.on("click", mealnameEventHandler);
mIngredient.on("click", mealingredientEventHandler);
// mCategory.on("click", mealcategoryEventHandler);

//Currently unused until I have time to add a category drop down menu
// function mealcategoryEventHandler() {}

//FUNCTIONS FOR MEALS
function mealnameEventHandler() {
  mSearch.text("");
  search.text("");
  mCategoryDrop.attr("hidden", true);
  mSearch.append("<h2>Search your meal name here!</h2>");
  mSearch.append(`<input class="mealNameInput" id="userNameInput" />`);
  mSearch.append("<button class=saveName >Search</button>");
  search.append(`<p class="wrongEntry" />`);
  $(mSearch).on("click", "button", function () {
    var userInput = $("#userNameInput").val();
    $.ajax({
      url: mealDBEndpoint + mealDBExtensions.searchByName + userInput,

      method: "GET",
    }).then((data) => {
      if (!data.drinks) {
        $(".wrongEntry").text(
          "Incorrect referance please try refining your search."
        );
        return;
      }
      localStorage.setItem("displayRecipes", JSON.stringify(data.meals));
      $(location).attr("href", "./display-recipes.html");
    });
  });
}

function mealingredientEventHandler() {
  mSearch.text("");
  search.text("");
  mSearch.append("<h2>Search your ingredient name here!</h2>");
  mSearch.append(`<input class="mealNameInput" id="userIngredientInput" />`);
  mSearch.append("<button>Search</button>");
  search.append(`<p class="wrongEntry" />`);
  $(mSearch).on("click", "button", async (event) => {
    var userInput = $("#userIngredientInput").val();
    const data = await $.ajax({
      url: mealDBEndpoint + mealDBExtensions.searchByIngredient + userInput,
      method: "GET",
    }).then((data) => {
      if (!data.drinks) {
        $(".wrongEntry").text(
          "Incorrect referance please try refining your search."
        );
        return;
      }
      localStorage.setItem("displayRecipes", JSON.stringify(data.meals));
      $(location).attr("href", "./display-recipes.html");
    });
    let meals = [];
    for (const value of data.meals) {
      const complete = await $.ajax({
        url: mealDBEndpoint + mealDBExtensions.searchByName + value.strMeal,
        method: "GET",
      });
      meals.push(complete.meals[0]);
    }
    // console.log(meals);
    localStorage.setItem("displayRecipes", JSON.stringify(meals));
    $(location).attr("href", "./display-recipes.html");
  });
}

//FUNCTIONS FOR COCKTAILS
function ingredientEventHandler() {
  search.text("");
  mSearch.text("");
  categoryDrop.attr("hidden", true);
  search.append("<h2>Search your ingredient name here!</h2>");
  search.append(`<input class="cocktailNameInput" id="userIngredientInput" />`);
  search.append("<button>Search</button>");
  search.append(`<p class="wrongEntry" />`);
  $(search).on("click", "button", async function () {
    var userInput = $("#userIngredientInput").val();
    const data = await $.ajax({
      url:
        cocktailDBEndpoint +
        cocktailDBExtensions.searchByIngredient +
        userInput,
      method: "GET",
    }).then((data) => {
      if (!data.drinks) {
        $(".wrongEntry").text(
          "Incorrect referance please try refining your search."
        );
        return;
      }
      localStorage.setItem("displayRecipes", JSON.stringify(data.drinks));
      $(location).attr("href", "./display-recipes.html");
    });
    let drinks = [];
    for (const value of data.drinks) {
      const complete = await $.ajax({
        url: mealDBEndpoint + mealDBExtensions.searchByName + value.strMeal,
        method: "GET",
      });
      drinks.push(complete.drinks[0]);
    }
    // console.log(drinks);
    localStorage.setItem("displayRecipes", JSON.stringify(drinks));
    $(location).attr("href", "./display-recipes.html");
  });
}

function nameEventHandler() {
  search.text("");
  mSearch.text("");
  categoryDrop.attr("hidden", true);
  search.append("<h2>Search your cocktail name here!</h2>");
  search.append(`<input class="cocktailNameInput" id="userNameInput" />`);
  search.append("<button class=saveName >Search</button>");
  search.append(`<p class="wrongEntry" />`);
  var saveNameBtn = $("#saveName");

  $(search).on("click", "button", function () {
    var userInput = $("#userNameInput").val();
    $.ajax({
      url: cocktailDBEndpoint + cocktailDBExtensions.searchByName + userInput,

      method: "GET",
    }).then((data) => {
      if (!data.drinks) {
        $(".wrongEntry").text(
          "Incorrect referance please try refining your search."
        );
        return;
      }
      localStorage.setItem("displayRecipes", JSON.stringify(data.drinks));
      $(location).attr("href", "./display-recipes.html");
    });
  });
}

//Currently unused until I have time to add a category drop down menu
// function categoryEventHandler() {
//   search.text("");
//   categoryDrop.attr("hidden", true);
//   categoryDrop.attr("hidden", false);
//   console.log("categoryClicked");
//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//   }
// }

//PULLING COCKTAIL API DATA
$.ajax({
  url: cocktailCatagories,
  method: "GET",
}).then((data) => {
  // console.log(data);
});

//PULLING MEALS API DATA
$.ajax({
  url: mealnamess,
  method: "GET",
}).then((data) => {
  // console.log(data);
});
