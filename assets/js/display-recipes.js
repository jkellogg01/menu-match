const recipeNameEl = $("#recipe-name");
const recipeThumbEl = $("#recipe-thumbnail");
const ingredientsContainerEl = $("#ingredients");
const prepInstructionsEl = $("#prep-instructions");
const recipeListContainerEl = $("#recipe-list");

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

let displayingRecipes =
  JSON.parse(localStorage.getItem("displayRecipes")).meals || [];

// this was to populate example data
// this page will not pull any api data when it's finished
// let testURL = mealDBEndpoint + mealDBExtensions.searchByName + "soup";
// console.log(testURL);
// $.ajax({
//   url: testURL,
//   method: "GET",
//   async: false,
// }).then((data) => {
//   displayingRecipes = data.meals;
//   localStorage.setItem("displayRecipes", JSON.stringify(data));
// });

let primaryRecipe = displayingRecipes[0];
console.log(primaryRecipe);
renderPrimaryRecipe(primaryRecipe);
renderRecipeList();

function renderPrimaryRecipe(recipe) {
  recipeNameEl.text(recipe.strMeal || recipe.strDrink);
  recipeThumbEl.attr("src", recipe.strMealThumb || recipe.strDrinkThumb);
  recipeThumbEl.attr("alt", recipeNameEl.text());
  prepInstructionsEl.text(recipe.strInstructions);
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = "strIngredient" + i;
    const measureKey = "strMeasure" + i;
    if (!recipe[ingredientKey]) {
      continue;
    }
    const nextIngredient = recipe[ingredientKey] + " - " + recipe[measureKey];
    const ingredientEl = $('<li class="list-group-item">');
    ingredientEl.text(nextIngredient);
    ingredientsContainerEl.append(ingredientEl);
  }
}

function renderRecipeList() {
  displayingRecipes.forEach((value) => {
    let recipeName = value.strMeal || value.strDrink;
    const listRecipeEl = $('<li class="list-group-item">');
    listRecipeEl.text(recipeName);
    // listRecipeEl.on("click", handleChangePrimaryRecipe);
    recipeListContainerEl.append(listRecipeEl);
  });
}

function handleChangePrimaryRecipe(event) {}
