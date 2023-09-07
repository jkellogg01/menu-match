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
    randomFoodRecipeA.attr("href", )
  });
};




function getRandomCocktail () {
  $.ajax ({
    url: cocktailDBEndpoint + cocktailDBExtensions.random,
    method: "GET",
  }) .then(function(data){
    console.log (data);

    randomCocktailImgEl.attr("src", data.drinks[0].strDrinkThumb);
    randomCocktailRecipeA.attr("href", )
  });
};

getRandomCocktail();
getRandomFood();