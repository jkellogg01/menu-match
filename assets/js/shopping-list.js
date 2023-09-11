// ================================== localStorage ==================================
// =========retrieving data=========
const userData = JSON.parse(localStorage.getItem("shoppingList"));
// console.log(userData);
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
    //
    // const RemoveBtn = $('<button class="btn btn-danger">');
    const RemoveBtn = $('<button class="btn btn-danger">');
    RemoveBtn.text("X");
    RemoveBtn.on("click", RemoveList);

    shoppingList.text(listName);
    shoppingListContainer.append(shoppingList);
    //
    shoppingList.append(RemoveBtn);
  });
}
renderShoppingList();
// =========displaying data end=========
// ===============================================================================
//sortable

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

$(".btn").empty();
// // remove list item
// function RemoveList(value) {
//   let listName = $(value.target);
//   console.log(userData);

//   localStorage.setItem("shoppingList", JSON.stringify(userData));
//   renderShoppingList();
// }
