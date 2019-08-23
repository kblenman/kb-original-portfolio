// /* Header changes daily special based on day */
// let dayHeader = document.getElementById("day").childNodes[0];
// let dailyDesc = document.getElementById("dailyDesc").childNodes[0];
// let currentDay = new Date().getDay();
// ChangeHeader();

/* Add click event listener to all menu item buttons in order
   to add item to cart */
buttonList = document.getElementsByClassName("addToCart");
for (var i = 0; i < buttonList.length; i++) {
	buttonList[i].addEventListener("click", AddToCart);
}

/* Initialize cart container */
let cartItemsContainer = document.getElementById("cartItemsContainer");

/* Create a list of the current items in the cart. Extract
   the item's name and add it to a separate list */
let itemNameList = [];
let cartItems = document.getElementsByClassName("cartItem");

if(cartItems.length != 0) {
	for (var i = 0; i < cartItems.length; i++) {
		let itemName = cartItems[i].getAttribute("data-itemname");
		itemNameList.push(itemName);
	}
}


/* --------------------------------------------------------
			FUNCTIONS
   --------------------------------------------------------
 */

// /* --- ChangeHeader Function --- */
// function ChangeHeader() {
// 	switch (currentDay) {
// 		case 0:
// 			dayHeader.nodeValue = "Sunday";
// 			dailyDesc.nodeValue = "Today is Sunday";
// 			break;
// 		case 1:
// 			dayHeader.nodeValue = "Monday";
// 			dailyDesc.nodeValue = "Today is Monday";
// 			break;
// 		case 2:
// 			dayHeader.nodeValue = "Tuesday";
// 			dailyDesc.nodeValue = "Today is Tuesday";
// 			break;
// 		case 3:
// 			dayHeader.nodeValue = "Wednesday";
// 			dailyDesc.nodeValue = "Today is Wednesday";
// 			break;
// 		case 4:
// 			dayHeader.nodeValue = "Thursday";
// 			dailyDesc.nodeValue = "Today is Thursday";
// 			break;
// 		case 5:
// 			dayHeader.nodeValue = "Friday";
// 			dailyDesc.nodeValue = "Today is Friday";
// 			break;
// 		case 6:
// 			dayHeader.nodeValue = "Saturday";
// 			dailyDesc.nodeValue = "Today is Saturday";
// 			break;
// 	}
// }
// /* --- End of ChangeHeader Function --- */

/* --- AddToCart Function --- */
function AddToCart(button) {
	/* Set name and cost associated with the button pressed. Also 
	   grab the current cart HTML */
	let itemName = button.target.getAttribute("data-itemname");
	let itemCost = Number(button.target.getAttribute("data-itemcost"));

	/* If the item doesnt already exist in the cart list, create 
	and append it */
	if (itemNameList.includes(itemName) != true) {
		let itemtoAdd = `
				<div class="cartItem"
				id="${itemName}"
				data-itemName="${itemName}"
				data-itemCost="${itemCost}">
					<p>${itemName}</p>
					<select name="quantity">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<button class="deleteItem"
					data-linkedItem="${itemName}">
						Remove</button>
				</div>`;

		/* Append new item to cartItemsContainer. 

		   NOTE: use insertAdjacentHTML to preserve event listeners 
		   so that the quantity option stays selected as you keep 
		   adding items*/
		cartItemsContainer.insertAdjacentHTML('beforeend', itemtoAdd);

		/* Update current items in cart and item names list */
		cartItems = document.getElementsByClassName("cartItem");
		itemNameList.push(itemName);

		/* Add a change event listener to quantity selector so that
   		   the cart total updates when the user changes the quantity of
           an item. */
		let addedItemDiv = document.getElementById(itemName);
		let addedItemSelector = addedItemDiv.childNodes[3];
		addedItemSelector.addEventListener("change", UpdateTotals);

		/* Add a click event listener for the delete button */
		let deleteButton = addedItemDiv.childNodes[5];
		deleteButton.addEventListener("click", DeleteItem);

		/* Update totals */
		UpdateTotals();
	}
}
/* --- End of addToCart Function --- */

/* --- UpdateTotals Function --- */
function UpdateTotals() {
	let cartTotal = 0;

	/* Iterate through cartItems. Calculate itemcost times 
	   quantity selected then add it to cartTotal */
	for (var i = 0; i < cartItems.length; i++) {
		let itemCost = Number(cartItems[i].getAttribute("data-itemcost"));
		let itemQuantity = Number(cartItems[i].childNodes[3].value);

		let itemTotal = itemCost * itemQuantity;
		cartTotal += itemTotal;
	}

	/* Update total */
	document.getElementById("total").childNodes[0].nodeValue = `$ ${cartTotal.toFixed(2)}`;
}
/* --- End of UpdateTotals Function --- */

/* --- Delete Item Function --- */
function DeleteItem(button) {
	let linkedItemName = button.target.getAttribute("data-linkeditem");
	let itemCartDiv = document.getElementById(linkedItemName);
	itemCartDiv.outerHTML = "";

	/* Update itemNameList (remove from array) */
	removalIndex = itemNameList.indexOf(linkedItemName);
	itemNameList.splice(removalIndex, 1);

	/* Update total after delete */
	UpdateTotals();
}

