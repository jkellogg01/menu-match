var searchLimit = 14;

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

//MEAL EVENT LISTENERS
mealName.on("click", mealnameEventHandler);
mIngredient.on("click", mealingredientEventHandler);

//FUNCTIONS FOR MEALS
function mealnameEventHandler() {
  //clearing the seachbar text from prior searches
  mSearch.empty();
  //appending a header so when the user clicks to search by a meal by name it says this
  mSearch.append("<h4>Type the Name of a Meal</h4>");
  //appending a input class with special classes and id's
  mSearch.append(`<input class="mealNameInput" id="userNameInput" />`);
  //appending a button to search with
  mSearch.append(`<button id="mName" >Search</button>`);
  //making a paragraph underneath to indicate if the search was valid or not to the user
  mSearch.append(`<p class="wrongEntry" />`);
  //event listener for a click event on the appended button
  mSearch.on("click", "#mName", function () {
    //clears the paragraph text when the user clicks the button
    $(".wrongEntry").empty();
    //taking the value of what the user typed into the search bar
    var userInput = $("#userNameInput").val();
    //grabbing the api data for meal names
    $.ajax({
      url: mealDBEndpoint + mealDBExtensions.searchByName + userInput,
      //getting the data
      method: "GET",
      //running the data against what the user said
    }).then((data) => {
      if (!data.meals) {
        //clearing paragraph text one more time before filling text in
        $(".wrongEntry").empty();
        //if user data is not eaual to the data from the api then the following message will appear.
        $(".wrongEntry").text(
          "Incorrect reference, please try refining your search. Try something like pork, chicken, salmon, ect!"
        );
        //if it was incorrect end this function here
        return;
      }
      //pushing the data to local storage
      localStorage.setItem("displayRecipes", JSON.stringify(data.meals));
      //finally pushing the user to the display recipes page
      // $(location).attr("href", "./display-recipes.html");
    });
  });
}

function mealingredientEventHandler() {
  //clearing the seachbar text from prior searches
  mSearch.empty();
  //appending a header so when the user clicks to search by a meal by name it says this
  mSearch.append("<h4>Type a Meal Ingredient</h4>");
  //appending a input class with special classes and id's
  mSearch.append(`<input class="mealNameInput" id="userIngredientInput" />`);
  //appending a button to search with
  mSearch.append(`<button id="mIngredient">Search</button>`);
  //making a paragraph underneath to indicate if the search was valid or not to the user
  mSearch.append(`<p class="wrongEntry" />`);
  //event listener for a click event on the appended button
  mSearch.on("click", "#mIngredient", async (event) => {
    //clears the paragraph text when the user clicks the button
    $(".wrongEntry").empty();
    //taking the value of what the user typed into the search bar
    var userInput = $("#userIngredientInput").val();
    //grabbing the api data for meal names
    const data = await $.ajax({
      url: mealDBEndpoint + mealDBExtensions.searchByIngredient + userInput,
      //getting the data
      method: "GET",
    });
    //running the data against what the user said
    if (!data.meals) {
      //clearing paragraph text one more time before filling text in
      $(".wrongEntry").empty();
      //if user data is not eaual to the data from the api then the following message will appear.
      $(".wrongEntry").text(
        "Incorrect reference, please try refining your search. Try something like pork, chicken, salmon, ect!"
      );
      //if it was incorrect end this function here
      return;
    }
    //variable   of meals for an array of meals
    let meals = [];
    //taking the value of data with the object of meals
    for (const value of data.meals) {
      //complete variable is waiting for the api to get the meal name
      const complete = await $.ajax({
        url: mealDBEndpoint + mealDBExtensions.searchByName + value.strMeal,
        method: "GET",
      });
      //pushing into the complete.meals array
      meals.push(complete.meals[0]);
    }
    //pushing the data to local storage
    localStorage.setItem("displayRecipes", JSON.stringify(meals));
    //finally pushing the user to the display recipes page
    // $(location).attr("href", "./display-recipes.html");
  });
}

//FUNCTIONS FOR COCKTAILS
function ingredientEventHandler() {
  search.empty();
  search.append(
    `<h4 id="cIngredient" data-cIngredient="cIngredient">Type a Cocktail Ingredient</h4>`
  );
  search.append(`<input class="cocktailNameInput" id="userIngredientInput" />`);
  search.append(`<button id="i">Search</button>`);
  search.append(`<p class="dWrongEntry" />`);
  search.on("click", "#i", async function () {
    $(".dWrongEntry").empty();
    var userInput = $("#userIngredientInput").val();
    console.log(userInput);
    const data = await $.ajax({
      url:
        cocktailDBEndpoint +
        cocktailDBExtensions.searchByIngredient +
        userInput,
      method: "GET",
      complete: checkAjax(),
    });

    var userchoice = $("#cIngredient").attr("data-cIngredient");
    $(document).on("ajaxSuccess", function (event) {
      checkAjax();
    });

    function checkAjax() {
      if (userchoice === "cIngredient" && !data) {
        $(".dWrongEntry").text(
          "Incorrect reference, please try refining your search. Try something like pork, chicken, salmon, ect!"
        );
      }
    }

    var randomDrinks = shuffle(data.drinks).slice(0, searchLimit);
    console.log(randomDrinks);
    var drinks = [];
    for (let i = 0; i < randomDrinks.length; i++) {
      var currentDrink = randomDrinks[i].strDrink;

      var response = await $.ajax({
        url:
          cocktailDBEndpoint + cocktailDBExtensions.searchByName + currentDrink,
        method: "GET",
        crossDomain: true,
      });
      drinks.push(...response.drinks);
    }
    localStorage.setItem("displayRecipes", JSON.stringify(drinks));
    // $(location).attr("href", "./display-recipes.html");
  });
}

function nameEventHandler() {
  search.empty();
  search.append(`<h4 data-name="name" >Type the Name of a Cocktail</h4>`);
  search.append(`<input class="cocktailNameInput" id="userNameInput" />`);
  search.append(`<button id="n" >Search</button>`);
  search.append(`<p class="dWrongEntry" />`);
  search.on("click", "#n", function () {
    $(".dWrongEntry").empty();
    var userInput = $("#userNameInput").val();
    console.log(userInput);
    $.ajax({
      url: cocktailDBEndpoint + cocktailDBExtensions.searchByName + userInput,

      method: "GET",
    }).then((data) => {
      if (!data.drinks) {
        // $(".dWrongEntry").empty();
        $(".dWrongEntry").text(
          "Incorrect reference, please try refining your search. Try something like pork, chicken, salmon, ect!"
        );
        return;
      }

      localStorage.setItem("displayRecipes", JSON.stringify(data.drinks));
      // $(location).attr("href", "./display-recipes.html");
    });
  });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
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
