/**
 * Declare a global variable to store bag items (array of item IDs).
 * This variable holds the current state of the shopping bag across the session.
 */
let bagItem;

/**
 * Immediately invoked function on page load.
 * This function initializes the bag items from localStorage to persist user selections,
 * displays the available items on the homepage, and updates the bag item count display.
 * 
 * When: Called as soon as the script loads.
 * Where: Runs in the global scope of the homepage script.
 * Why: To ensure the UI reflects the current bag state and available items on page load.
 */
onload();

/**
 * Function: onload
 * Workflow:
 * 1. Retrieve the 'bagItem' string from localStorage, which stores the user's saved bag items.
 * 2. Parse this string into an array if it exists; otherwise, initialize an empty array.
 * 3. Call displayItemOnHomePage() to render all available items dynamically on the homepage.
 * 4. Call bagItemUpdate() to update the UI element showing the number of items in the bag.
 * 
 * Purpose:
 * This function ensures that the user's bag state is restored and the homepage is populated
 * with items every time the page is loaded or refreshed.
 */
function onload(){
    let bagItemStr = localStorage.getItem('bagItem'); // Retrieve 'bagItem' string from localStorage
    bagItem = bagItemStr ? JSON.parse(bagItemStr) : []; // Parse string to array or initialize empty array
    displayItemOnHomePage(); // Call function to display items on homepage
    bagItemUpdate(); // Update bag item count display
};


/**
 * Function: addToBag
 * When: Called when a user clicks the "Add to Bag" button for an item.
 * Where: Triggered by the onclick event in the item display markup.
 * Why: To add the selected item to the user's shopping bag and update the UI accordingly.
 * 
 * Workflow:
 * 1. Add the provided itemId to the global bagItem array.
 * 2. Save the updated bagItem array to localStorage to persist the bag state.
 * 3. Call bagItemUpdate() to refresh the bag item count display on the UI.
 * 
 * @param {number} itemId - The ID of the item to add to the bag.
 */
function addToBag(itemId) {
    bagItem.push(itemId); // Add item ID to bagItem array
    localStorage.setItem('bagItem', JSON.stringify(bagItem)) // Save updated bagItem array to localStorage as string
    bagItemUpdate(); // Update bag item count display
};
/**
 * Function: bagItemUpdate
 * When: Called after any change to the bagItem array (e.g., adding an item).
 * Where: Used internally within the script to update the UI.
 * Why: To visually reflect the current number of items in the user's bag.
 * 
 * Workflow:
 * 1. Select the DOM element with class 'bag-item-count' that displays the count.
 * 2. If the bagItem array has one or more items:
 *    - Make the count element visible.
 *    - Set its text content to the number of items.
 * 3. If the bagItem array is empty:
 *    - Hide the count element to avoid showing zero.
 */
function bagItemUpdate() {
    let bagItemCountElement = document.querySelector('.bag-item-count'); // Select element showing bag item count
    if (bagItem.length > 0) {
        bagItemCountElement.style.visibility = 'visible'; // Show count if bag has items
        bagItemCountElement.innerText = bagItem.length; // Set count text to number of items
    } else {
        bagItemCountElement.style.visibility = 'hidden'; // Hide count if bag is empty
    }

}


/**
 * Function: displayItemOnHomePage
 * When: Called during page load by onload() function.
 * Where: Runs in the homepage script to dynamically render items.
 * Why: To generate and display the list of available items for purchase.
 * 
 * Workflow:
 * 1. Select the container element with class 'items-container' where items will be displayed.
 * 2. If the container does not exist, exit early (e.g., on pages without this container).
 * 3. Initialize an empty string to accumulate HTML markup.
 * 4. Loop through each item in the global 'items' array (assumed to be defined elsewhere).
 * 5. For each item, append HTML markup including:
 *    - Image, rating stars and count, company name, item name, current price, original price, discount.
 *    - A button that calls addToBag() with the item's ID when clicked.
 * 6. Set the innerHTML of the container element to the generated markup string.
 */
function displayItemOnHomePage() {
    let ItemsContainerElement = document.querySelector('.items-container'); // Select container element for items
    if(!ItemsContainerElement){
        return; // Exit if container not found
    }
    let innerHTML = ` `; // Initialize empty string for HTML content
    items.forEach(item => { // Loop through each item in global 'items' array
        innerHTML += ` // Append HTML markup for each item
    
     <div class="item-container">
                <img class="bag-item-img" src="${item.image}" alt="item image"> <!-- Item image -->
                <div class="rating">
                    ${item.rating.stars} ⭐| ${item.rating.count} <!-- Display rating stars and count -->
                </div>
                <div class="company-name">${item.company}</div> <!-- Company name -->
                <div class="item-name">${item.item_name}</div> <!-- Item name -->
                <div class="prices">
                    <span class="current-price">${item.current_price}</span> <!-- Current price -->
                    <span class="original-price">${item.original_price}</span> <!-- Original price -->
                    <span class="discount">${item.discount_percentage}% OFF</span> <!-- Discount percentage -->
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button> <!-- Button to add item to bag -->
            </div>
    
    `;
    });

    ItemsContainerElement.innerHTML = innerHTML; // Set container's innerHTML to generated markup
}


