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
    const shoppingList = $(
      '<li class=" d-flex justify-content-between list-group-item">'
    );
    //
    // const RemoveBtn = $('<button class="btn btn-danger">');
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
