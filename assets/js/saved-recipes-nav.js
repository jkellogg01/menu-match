const savedRecipesNavEl = $("#saved-recipes");

savedRecipesNavEl.on("click", () => {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
  localStorage.setItem("displayRecipes", JSON.stringify(savedRecipes));
  location.replace("./display-recipes.html");
});
