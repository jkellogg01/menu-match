// ================================== localStorage ==================================
// =========retrieving data=========
// console.log(userData);
//=========retrieving data end=========
const userData = JSON.parse(localStorage.getItem("shoppingList"));

//=========displaying data=========
const shoppingListContainer = $("#recipe-list");

function renderShoppingList() {
  userData.forEach((value) => {
    let listName = value;
    const shoppingList = $(
      '<li class=" d-flex justify-content-between list-group-item">'
    );
    //
    const RemoveBtn = $(
      '<button class=" d-flex justify-content-between btn btn-danger btnDelete ">'
    );
    RemoveBtn.text("delete");

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
//This function is used to make the line items in the shopping list ul sortable through jQuery UI, the latter part of the function saves the sorted order to local memory for the user.

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
// remove button function to remove list items on shopping list
$(document).ready(function () {
  $(".btnDelete").on("click", function () {
    $(this).closest("li").remove();
  });
});
