// ================================== localStorage ==================================
// retrieving data
const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);
// retrieving data
// localStorage.getItem("");
// ================================== meal search bar ==================================
document.getElementById("mbtn").addEventListener("click", () => {
  let user = document.getElementById("muserInput").value;

  let mealAPI = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`
  );
  mealAPI
    .then((getData) => {
      return getData.json();
    })
    .then((sendData) => {
      console.log(sendData);
      let data = "";
      sendData.meals.forEach((e) => {
        data += `
        <div class="card-body">
            <img src="${e.strMealThumb}" alt="" class="rounded img-fluid">
        </div>
        <div class="card-body">
                <ul class="list-unstyled mt-3 mb-4">
                  <li>${e.strIngredient1}</li>
                  <li>${e.strIngredient2}</li>
                  <li>${e.strIngredient3}</li>
                  <li>${e.strIngredient4}</li>
                  <li>${e.strIngredient5}</li>
                  <li>${e.strIngredient6}</li>
                  <li>${e.strIngredient7}</li>
                  <li>${e.strIngredient8}</li>
                  <li>${e.strIngredient9}</li>
                  <li>${e.strIngredient10}</li>
                  <li>${e.strIngredient11}</li>
                  <li>${e.strIngredient12}</li>
                  <li>${e.strIngredient13}</li>
                  <li>${e.strIngredient14}</li>
                  <li>${e.strIngredient15}</li>
                  <li>${e.strIngredient16}</li>
                  <li>${e.strIngredient17}</li>
                  <li>${e.strIngredient18}</li>
                  <li>${e.strIngredient19}</li>
                  <li>${e.strIngredient20}</li>
                </ul>
            </div>`;
        appendData.innerHTML = data;
      });
    });
});

//  ================================== cocktail search Bar  ==================================
document.getElementById("dbtn").addEventListener("click", () => {
  let user = document.getElementById("duserInput").value;

  let drinkAPI = fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${user}`
  );
  drinkAPI
    .then((getData) => {
      return getData.json();
    })
    .then((sendData) => {
      console.log(sendData);
      let data = "";
      sendData.drinks.forEach((e) => {
        data += `
          <div class="card-body">
              <img src="${e.strDrinkThumb}" alt="" class="rounded img-fluid">
          </div>
          <div class="card-body">
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>${e.strIngredient1}</li>
                    <li>${e.strIngredient2}</li>
                    <li>${e.strIngredient3}</li>
                    <li>${e.strIngredient4}</li>
                    <li>${e.strIngredient5}</li>
                   
                  </ul>
              </div>`;
        appendData.innerHTML = data;
      });
    });
});
