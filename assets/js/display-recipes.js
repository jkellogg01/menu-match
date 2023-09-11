const recipeNameEl = $("#recipe-name");
const recipeThumbEl = $("#recipe-thumbnail");
const ingredientsContainerEl = $("#ingredients");
const prepInstructionsEl = $("#prep-instructions");
const recipeListContainerEl = $("#recipe-list");

let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
let displayingRecipes = JSON.parse(localStorage.getItem("displayRecipes"));
// THE FOLLOWING WILL NEED TO BE REMOVED ONCE I STOP USING MY EXAMPLE CODE
// displayingRecipes = displayingRecipes.meals;

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
renderPrimaryRecipe(primaryRecipe);
const displayingSaved =
  JSON.stringify(savedRecipes) === JSON.stringify(displayingRecipes);
renderRecipeList(displayingSaved);
if (displayingSaved) {
$("#saved-recipes").addClass("custom-active");
} else if (primaryRecipe) {
$("#drink-search-page").addClass("custom-active")
}

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
    saveIngredientBtn.text("+");
    saveIngredientBtn.on("click", handleSaveIngredient);
    ingredientEl.text(nextIngredient);
    ingredientEl.append(saveIngredientBtn);
    ingredientsContainerEl.append(ingredientEl);
  }
}

function renderRecipeList(displayingSaved) {
  recipeListContainerEl.empty();
  displayingRecipes.forEach((value, index) => {
    let recipeName = value.strMeal || value.strDrink;
    const listRecipeEl = $(
      '<li class="list-group-item d-flex justify-content-between align-items-center">'
    );
    if (value == primaryRecipe) {
      listRecipeEl.addClass("recipe-primary");
      console.log(value);
    }
    const recipeActionBtn = $('<button class="btn">');
    if (displayingSaved) {
      recipeActionBtn.addClass("btn-danger");
      recipeActionBtn.text("unsave");
      recipeActionBtn.on("click", handleUnsaveRecipe);
    } else {
      recipeActionBtn.addClass("btn-primary");
      recipeActionBtn.text("save");
      recipeActionBtn.on("click", handleSaveRecipe);
    }
    listRecipeEl.attr("data-childIndex", index);
    listRecipeEl.text(recipeName);
    listRecipeEl.on("click", handleChangePrimaryRecipe);
    listRecipeEl.append(recipeActionBtn);
    recipeListContainerEl.append(listRecipeEl);
  });
}

function handleChangePrimaryRecipe(event) {
  let element = $(event.target);
  element.parent().children().removeClass("recipe-primary");
  element.addClass("recipe-primary");
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
  let ingredient = element.parent().text();
  let savingIngredient = filterIngredientPair(ingredient);
  if (shoppingList.includes(savingIngredient)) {
    console.log("ingredient is already saved");
    return;
  }
  console.log(savingIngredient);
  shoppingList.push(savingIngredient);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  console.log(shoppingList);
}

function filterIngredientPair(ingredientText) {
  let segments = ingredientText.split(" ");
  let result = "";
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].includes("-")) return result.trim();
    result += segments[i] + " ";
  }
  return result.trim();
}

function handleUnsaveRecipe(event) {
  let element = $(event.target);
  let recipeIndex = element.parent().attr("data-childIndex");
  let unsavingRecipe = savedRecipes[recipeIndex];
  savedRecipes = displayingRecipes.filter(
    (value) => JSON.stringify(value) != JSON.stringify(unsavingRecipe)
  );
  displayingRecipes = savedRecipes;
  localStorage.setItem("displayingRecipes", JSON.stringify(savedRecipes));
  console.log(savedRecipes);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  renderRecipeList(displayingSaved);
}
