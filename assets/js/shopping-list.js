// ================================== localStorage ==================================
// =========retrieving data=========
const userData = JSON.parse(localStorage.getItem("shoppingList"));
console.log(userData);
//=========retrieving data end=========

//=========displaying data=========
const shoppingListContainer = $("#recipe-list");

function renderShoppingList() {
  //   for (let i = 0; i < userData.length; i++) {
  //     var value = userData[i];
  //   }
  userData.forEach((value) => {
    let listName = value;
    const shoppingList = $('<li class="list-group-item">');

    shoppingList.text(listName);
    shoppingListContainer.append(shoppingList);
  });
}
renderShoppingList();
// =========displaying data end=========
// ===============================================================================

$(function () {
  $("#recipe-list").sortable({
    update: function () {
      shoppingListContainer.children().each(function (i, li) {
        userData[i] = $(li).text();
      });
      localStorage.setItem("shoppingList", JSON.stringify(userData));
    },
  });
});
