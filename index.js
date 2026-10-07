import { menuArray } from "./data.js";

const menu = document.querySelector("#menu");

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
    }).join("");
}

menu.innerHTML = renderFoodItems();