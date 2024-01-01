let bagItems; //arraya box []  hata diye isiliye ho raha hai
onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  //   we cant save array in database so we convert array into  string (we can save string in database);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

// data js ma jo item nam ka arrya hai or usme jo object hai or uske andar jo key value pair hai  usko istemall karenge
function displayItemsOnHomePage() {
  let itemContainerElement = document.querySelector(".all-items-container");
  if (!itemContainerElement) {
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
      <div class="item-container">
      <img class="item-img" src="${item.image}"  alt = "item image">
      <div class="rating">${item.rating.stars} 🌟| ${item.rating.count}</div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
      <span class="current-price">RS ${item.current_price}</span>
      <span class="original-price">RS ${item.original_price}</span>
      <span class="discount"> (${item.discount_percentage}% off)</span>
      </div>
      <button class="btn-bag" onclick="addToBag(${item.id})">Add to Bag</button> 
      </div>`;
  });
  itemContainerElement.innerHTML = innerHTML;
}
