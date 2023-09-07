var randomCocktailImgEl = $("#random-cocktail-img");
var randomCocktailRecipeA = $("#random-cocktail-rec");

var randomFoodImgEl = $("#random-food-img");
var randomFoodRecipeA = $("#random-food-rec");





function getRandomFood() {
  $.ajax({
    url: mealDBEndpoint + mealDBExtensions.random,
    method: "GET",
  }).then(function (data) {

    randomFoodImgEl.attr("src", data.meals[0].strMealThumb);
    randomFoodRecipeA.on("click", (event)=> {
      var recipeRandom = data.meals
      localStorage.setItem("displayRecipes", JSON.stringify(recipeRandom))
      location.replace("./display-recipes.html");
    })
  });
};




function getRandomCocktail () {
  $.ajax ({
    url: cocktailDBEndpoint + cocktailDBExtensions.random,
    method: "GET",
  }) .then(function(data){
    console.log (data);

    randomCocktailImgEl.attr("src", data.drinks[0].strDrinkThumb);
    randomCocktailRecipeA.on("click", (event)=>{
      var cocktailRandom = data.drinks
      localStorage.setItem("displayRecipes", JSON.stringify(cocktailRandom))
      location.replace("./display-recipes.html");
    })
  });
};

getRandomCocktail();
getRandomFood();