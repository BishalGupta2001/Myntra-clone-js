let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItem();
  displayBagSummary();
}

function loadBagItemObjects() {
    console.log(bagItems);

    bagItemObjects = bagItems.map(itemId => {
        for(let a=0; a<items.length; a++){
            if(itemId == items[a].id) {
                return items[a];
            }
        }
    });
    console.log(bagItemObjects);
}

function displayBagItem(){
    let containerElement = document.querySelector(".bag-items-container");
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHtml(bagItem);
    });
    containerElement.innerHTML = innerHTML;
}

function displayBagSummary () {
    let bagSummaryElement = document.querySelector(".bag-summary");

    let totalItem =bagItemObjects.length;
    let totalMrp = 0;
    let totalDiscount =0;
    let finalPrice =0;

    bagItemObjects.forEach(bagItem => {
        totalMrp += bagItem.original_price;
        totalDiscount = bagItem.original_price - bagItem.current_price;
        finalPrice =( totalMrp - totalDiscount); 
        finalPrice +=99;
    });

    bagSummaryElement.innerHTML =` <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value"> ₹ ${totalMrp}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">- ₹ ${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value"> ₹ 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value"> ₹ ${finalPrice}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId =>bagItemId != itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItem();
    displayBagSummary();
    
}

function generateItemHtml(item){
    return ` <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="${item.image}"  alt="Product image">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price"> ₹ ${item.current_price}</span>
        <span class="original-price"> ₹ ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% off)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span> Days Return Available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date} </span>
      </div>
    </div>
    
    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>`;
}