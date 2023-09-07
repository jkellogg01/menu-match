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
  let recipeName = recipe.strMeal || recipe.strDrink;
  recipeNameEl.text(recipeName);
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
    const ingredientEl = $('<li class="list-group-item">');
    ingredientEl.text(nextIngredient);
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
    //set the icon thing, I need help doing that
    saveRecipeBtn.append($('<i class="fas fa-save" aria-hidden="true"></i>'));
    saveRecipeBtn.on("click", handleSaveRecipe);
    listRecipeEl.data("childIndex", index);
    listRecipeEl.text(recipeName);
    listRecipeEl.on("click", handleChangePrimaryRecipe);
    listRecipeEl.append(saveRecipeBtn);
    recipeListContainerEl.append(listRecipeEl);
  });
}

function handleChangePrimaryRecipe(event) {
  let element = $(event.target);
  let recipeIndex = element.data("childIndex");
  let newPrimaryRecipe = displayingRecipes[recipeIndex];
  renderPrimaryRecipe(newPrimaryRecipe);
}

function handleSaveRecipe(event) {
  let element = $(event.target);
  let recipeIndex = element.parent().data("childIndex");
  console.log(recipeIndex);
  if (!recipeIndex) {
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
