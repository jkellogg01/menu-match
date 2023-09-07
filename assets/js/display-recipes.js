const recipeNameEl = $("#recipe-name");
const recipeThumbEl = $("#recipe-thumbnail");
const ingredientsContainerEl = $("#ingredients");
const prepInstructionsEl = $("#prep-instructions");
const recipeListContainerEl = $("#recipe-list");

let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
let displayingRecipes =
  JSON.parse(localStorage.getItem("displayRecipes")) || savedRecipes;
// THE FOLLOWING WILL NEED TO BE REMOVED ONCE I STOP USING MY EXAMPLE CODE
displayingRecipes = displayingRecipes.meals;

let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

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
  if (!recipe) {
    return;
  }
  recipeNameEl.text(recipe.strMeal || recipe.strDrink);
  recipeThumbEl.attr("src", recipe.strMealThumb || recipe.strDrinkThumb);
  recipeThumbEl.attr("alt", recipeNameEl.text());
  prepInstructionsEl.text(recipe.strInstructions);
  ingredientsContainerEl.empty();
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = "strIngredient" + i;
    const measureKey = "strMeasure" + i;
    if (!recipe[ingredientKey]) {
      continue;
    }
    const nextIngredient = recipe[ingredientKey] + " - " + recipe[measureKey];
    const ingredientEl = $(
      '<li class="list-group-item d-flex justify-content-between align-items-center">'
    );
    ingredientEl.attr("data-childIndex", i);
    const saveIngredientBtn = $('<button class="btn btn-primary">');
    saveIngredientBtn.append(
      $('<i class="fas fa-save" aria-hidden="true"></i>')
    );
    saveIngredientBtn.on("click", handleSaveIngredient);
    ingredientEl.text(nextIngredient);
    ingredientEl.append(saveIngredientBtn);
    ingredientsContainerEl.append(ingredientEl);
  }
}

function renderRecipeList() {
  displayingRecipes.forEach((value, index) => {
    let recipeName = value.strMeal || value.strDrink;
    const listRecipeEl = $(
      '<li class="list-group-item d-flex justify-content-between align-items-center">'
    );
    const saveRecipeBtn = $('<button class="btn btn-primary">');
    saveRecipeBtn.append($('<i class="fas fa-save" aria-hidden="true"></i>'));
    saveRecipeBtn.on("click", handleSaveRecipe);
    listRecipeEl.attr("data-childIndex", index);
    listRecipeEl.text(recipeName);
    listRecipeEl.on("click", handleChangePrimaryRecipe);
    listRecipeEl.append(saveRecipeBtn);
    recipeListContainerEl.append(listRecipeEl);
  });
}

function handleChangePrimaryRecipe(event) {
  let element = $(event.target);
  let recipeIndex = element.attr("data-childIndex");
  primaryRecipe = displayingRecipes[recipeIndex];
  renderPrimaryRecipe(primaryRecipe);
}

function handleSaveRecipe(event) {
  let element = $(event.target);
  let recipeIndex = element.parent().attr("data-childIndex");
  // console.log(recipeIndex);
  if (typeof recipeIndex === "undefined") {
    console.log(
      "returning an undefined index. I need to figure out why it ever does that."
    );
    return;
  }
  let savingRecipe = displayingRecipes[recipeIndex];
  if (savedRecipes.includes(savingRecipe)) {
    console.log(
      "recipe is already saved. In the future, maybe this should remove the recipe from the saved recipes?"
    );
    return;
  }
  savedRecipes.push(savingRecipe);
  console.log(savingRecipe);
  console.log(savedRecipes);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
}

function handleSaveIngredient(event) {
  let element = $(event.target);
  let ingredientIndex = element.parent().attr("data-childIndex");
  let ingredientKey = "strIngredient" + ingredientIndex;
  console.log(ingredientKey);
  let savingIngredient = primaryRecipe[ingredientKey];
  console.log(savingIngredient);
  shoppingList.push(savingIngredient);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  console.log(shoppingList);
}
