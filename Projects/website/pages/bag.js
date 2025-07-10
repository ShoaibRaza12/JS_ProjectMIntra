const CONVENIENCE = 99;
let bagItemObj;
onLoad();

function onLoad(){
    loadBagItemObj();
    displayBagItem();
    displayBagSummary();
};

function displayBagSummary(){
  bagSummaryElement = document.querySelector('.bag-summary');
  let total_item = 0;
  let MRP = 0;
  let discountPrice= 0;

  bagItemObj.forEach(bagitem =>{
    MRP+=bagitem.original_price;
    discountPrice += bagitem.original_price - bagitem.current_price;
  })
  let totalAmount = MRP - discountPrice + CONVENIENCE;
  bagSummaryElement.innerHTML =  `
  
  <div class="bag-details-container">
            <div class="price-header">Price Details(${total_item}) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₨ ${MRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">${discountPrice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₨${CONVENIENCE}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value"> ₨${totalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
  `;
}

function loadBagItemObj(){
    console.log(bagItem);
    bagItemObj= bagItem.map(itemId =>{
      for(let i= 0; i< items.length; i++){
        if(itemId == items[i].id)
          return items[i];
      }
    })
    console.log(bagItemObj);
};

function displayBagItem(){
    let bagItemContainer = document.querySelector('.bag-items-container');
    let innerHTML = ``;
    bagItemObj.forEach(bagItem => {
    innerHTML += generateItemHtml(bagItem);
    });
    bagItemContainer.innerHTML = innerHTML;
};
function removeFromBag(itemId){
  bagItem = bagItem.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItem', JSON.stringify(bagItem))
  loadBagItemObj();
  bagItemUpdate();
  displayBagItem();
}

function generateItemHtml (items){
return `
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${items.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${items.company}</div>
              <div class="item-name">${items.item_name}</div>
              <div class="price-container">
                <span class="current-price">${items.current_price}</span>
                <span class="original-price">${items.original_price}</span>
                <span class="discount-percentage">(${items.discount_percentage})</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${items.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${items.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${items.id})">X</div>
    `;
};
