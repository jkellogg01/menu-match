var randomCocktailImgEl = $("#random-cocktail-img");
var randomCocktailRecipeA = $("#random-cocktail-rec");
var randomCocktailName = $("#random-cocktail-name");

var randomFoodImgEl = $("#random-food-img");
var randomFoodRecipeA = $("#random-food-rec");
var randomFoodName = $("#random-food-name");





function getRandomFood() {
  $.ajax({
    url: mealDBEndpoint + mealDBExtensions.random,
    method: "GET",
  }).then(function (data) {
console.log(data);
randomFoodImgEl.attr("src", data.meals[0].strMealThumb);
randomFoodName.text(data.meals[0].strMeal);
    randomFoodRecipeA.on("click", (event)=> {
      var recipeRandom = data.meals
      localStorage.setItem("displayRecipes", JSON.stringify(recipeRandom))
      $(location).attr("href","./display-recipes.html");
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
    randomCocktailName.text(data.drinks[0].strDrink);
    randomCocktailRecipeA.on("click", (event)=>{
      console.log("Cocktail Click Event")
      var cocktailRandom = data.drinks
      localStorage.setItem("displayRecipes", JSON.stringify(cocktailRandom))
      $(location).attr("href","./display-recipes.html");
    })
  });
};

getRandomCocktail();
getRandomFood();