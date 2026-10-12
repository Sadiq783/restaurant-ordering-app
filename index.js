import { menuArray } from "./data.js";

const menu = document.querySelector("#menu");
const orderContainer = document.querySelector("#order-container");
const completeOrderBtn = document.querySelector("#complete-order-btn");

const orderItemsArr = [];

function renderFoodItems() {
  return menuArray
    .map((menuItem) => {
      const { name, ingredients, price, emoji, id } = menuItem;

      return `
          <div class="menu-item">
              <div class="emoji">${emoji}</div>
              <div class="description">
                <p class="item-name">${name}</p>
                <p class="ingredients">${ingredients.join(", ")}</p>
                <p class="price">$${price}</p>
              </div>

              <button class="add-item-btn" id="add-item-btn" data-id="${id}"><i class="fa-solid fa-plus"></i></button>
          </div>
    `;
    })
    .join("");
}

menu.innerHTML = renderFoodItems();

document.addEventListener("click", (e) => {
  const addItemButton = e.target.closest("#add-item-btn");

  if (addItemButton) {
    renderOrderItems(addItemButton.dataset.id);
    orderContainer.hidden = false;
  } else if (e.target.id === "remove-item-btn") {
    removeItem(e.target.closest(".order-item"));
  }
});

function renderOrderItems(itemId) {
  const matchingFoodItem = menuArray.find((menuItem) => menuItem.id === itemId);

  orderItemsArr.push(matchingFoodItem);

  const { name, price, id } = matchingFoodItem;

  document.querySelector("#order-item-container").innerHTML += `
  <div  class="order-item" data-item-id="${id}">
    <div class="item-name">${name}</div>
    <button class="remove-item-btn" id="remove-item-btn" data-id="${id}">remove</button>
    <p class="price order-price">$${price}</p>
</div>
  `;

  document.querySelector("#total-price").textContent = `$${getTotalPrice()}`;
}

function getTotalPrice() {
  return orderItemsArr.reduce(
    (total, currentItem) => total + currentItem.price,
    0,
  );
}

function removeItem(targetElement) {
  targetElement.remove();

  // Remove at least one element from the ordered items array
  orderItemsArr.forEach((item, idx) => {
    if (item.id === targetElement.dataset.itemId) {
      orderItemsArr.splice(idx, 1);

      // Also update the total price
      document.querySelector("#total-price").textContent =
        `$${getTotalPrice()}`;
    }
  });

  // If there are no ordered items
  if (!orderItemsArr.length) {
    orderContainer.hidden = true;
  }
}

completeOrderBtn.addEventListener("click", () => {
  const cardDetailsModal = document.querySelector("#card-details-modal");

  cardDetailsModal.hidden = false;

  document
    .querySelector("#card-details-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      cardDetailsModal.hidden = true;

      orderContainer.innerHTML = `
        <p class="thank-you-msg">
          Thanks, James! Your order is on its way!
        </p>
      `;
    });
});
