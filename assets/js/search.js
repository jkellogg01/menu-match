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
var mealIngrediantss =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

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

//FUNCTIONS FOR MEALS
function mealnameEventHandler() {
  mSearch.text("");
  // mCategoryDrop.attr("hidden", true);
  mSearch.append("<h2>Search your meal name here!</h2>");
  mSearch.append(`<input class="mealNameInput" id="userNameInput" />`);
  mSearch.append("<button class=saveName >Search</button>");
}

function mealingredientEventHandler() {
  mSearch.text("");
  // mCategoryDrop.attr("hidden", true);
  mSearch.append("<h2>Search your ingredient name here!</h2>");
  mSearch.append(`<input class="mealNameInput" id="userIngredientInput" />`);
  mSearch.append("<button>Search</button>");
  $(mSearch).on("click", "button", function () {
    var userInput = $("#userIngredientInput").val();
    $.ajax({
      url: mealDBEndpoint + mealDBExtensions.searchByIngredient + userInput,

      method: "GET",
    }).then((data) => {
      console.log(data);

      if (data.meals) {
        var displayRecipes = [];
        for (const meals of data.meals) {
          var tempObj = {
            ingredients: [],
            measurements: [],
            mealName: [],
          };
          for (const key in meals) {
            if (meals[key]) {
              if (key.includes("strIngredient")) {
                tempObj.ingredients.push(meals[key]);
              } else {
                tempObj[key] = meals[key];
              }
            }
          }
          displayRecipes.push(tempObj);
        }
        console.log(displayRecipes);
        //
        localStorage.setItem("displayRecipes", JSON.stringify(displayRecipes));
      } else {
        alert("Try again");
        //Append a message to appear saying try again
      }
    });
  });
}

//Currently unused until I have time to add a category drop down menu
function mealcategoryEventHandler() {}

//FUNCTIONS FOR COCKTAILS
function ingredientEventHandler() {
  search.text("");
  categoryDrop.attr("hidden", true);
  search.append("<h2>Search your ingredient name here!</h2>");
  search.append(`<input class="cocktailNameInput" id="userIngredientInput" />`);
  search.append("<button>Search</button>");
  $(search).on("click", "button", function () {
    var userInput = $("#userIngredientInput").val();
    $.ajax({
      url:
        cocktailDBEndpoint +
        cocktailDBExtensions.searchByIngredient +
        userInput,

      method: "GET",
    }).then((data) => {
      console.log(data);

      if (data.drinks) {
        var savedDrinks = [];
        for (const drink of data.drinks) {
          var tempObj = {
            ingredients: [],
            measurements: [],
            cocktailName: [],
          };
          for (const key in drink) {
            if (drink[key]) {
              if (key.includes("Ingredient")) {
                tempObj.ingredients.push(drink[key]);
              } else if (key.includes("Measure")) {
                tempObj.measurements.push(drink[key]);
              } else if (key.includes("strDrink")) {
                tempObj.cocktailName.push(drink[key]);
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
        //Append a message to appear saying try again
      }
    });
  });
}

function nameEventHandler() {
  search.text("");
  categoryDrop.attr("hidden", true);
  search.append("<h2>Search your cocktail name here!</h2>");
  search.append(`<input class="cocktailNameInput" id="userNameInput" />`);
  search.append("<button class=saveName >Search</button>");
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
            cocktailName: [],
          };
          for (const key in drink) {
            if (drink[key]) {
              if (key.includes("Ingredient")) {
                tempObj.ingredients.push(drink[key]);
              } else if (key.includes("Measure")) {
                tempObj.measurements.push(drink[key]);
              } else if (key.includes("strDrink")) {
                tempObj.cocktailName.push(drink[key]);
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
        //Append a message to appear saying try again
      }
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
  console.log(data);
});

//PULLING MEALS API DATA
$.ajax({
  url: mealIngrediantss,
  method: "GET",
}).then((data) => {
  console.log(data);
});
