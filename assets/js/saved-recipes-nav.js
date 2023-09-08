const savedRecipesNavEl = $("#saved-recipes");
const recipeDisplayPath = "./display-recipes.html";

savedRecipesNavEl.on("click", () => {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
  localStorage.setItem("displayRecipes", JSON.stringify(savedRecipes));
  $(location).attr("href", recipeDisplayPath);
});
