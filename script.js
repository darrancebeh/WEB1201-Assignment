// SIGN UP PAGE SCRIPT START //

function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Read existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    alert("Username already exists. Please choose a different username.");
    return;
  }

  // Add new user to the users array
  users.push({ username, password });

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("User registered successfully!");
  window.location.href = "login-page.html";
}

// SIGN UP PAGE SCRIPT END //

// LOGIN PAGE SCRIPT START //

function attemptLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Read existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the username and password match
  const existingUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (existingUser) {
    alert("Login successful!");
    // redirects user to landing page if successful login
    localStorage.setItem("username", username);
    window.location.href = "landing-page.html";
    // Redirect to a different page or perform other actions upon successful login
  } else {
    alert("Invalid username or password. Please try again.");
  }
}

// LOGIN PAGE SCRIPT END //

// LANDING PAGE SCRIPT END //

renderCartCheckout();
//Turns the Cart on and off
function toggleCart() {
  const cartDropdown = document.getElementById("cart-dropdown");
  cartDropdown.classList.toggle("show");
  renderCart();
}

//Adds the Items to the Cart
function addToCart(name, image, price) {
  //Accesses the list of items
  let items = JSON.parse(localStorage.getItem("Temp")) || [];
  //Does a checking for if Item already exists or not
  const existingItem = items.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({
      id: "temp" + (items.length + 1),
      name,
      price,
      image,
      quantity: 1,
    });
  }
  //Stores the New item into the Local Storage file
  localStorage.setItem("Temp", JSON.stringify(items));
  //resets the render so it updates everytime item gets added
  renderCart();
}

//Updates the Number of Items according to the ItemID (ItemID is the position of the item in the List)
function updateQuantity(itemId, change) {
  //Accesses the list of items
  const items = JSON.parse(localStorage.getItem("Temp")) || [];
  const item = items.find((i) => i.id === itemId);
  item.quantity += change; //Does the adding to the Actual Item
  //Stops the item from being -1 and Makes sure the item is at the most minimum 1.
  if (item.quantity < 1) item.quantity = 1;
  //Stores the New updated quantity of Item into the Local Storage file
  localStorage.setItem("Temp", JSON.stringify(items));
  //Renders the Cart again
  renderCart();
}

function removeItem(itemId) {
  // Get the current items from localStorage
  let items = JSON.parse(localStorage.getItem("Temp")) || [];

  // Filter out the item with the given itemId
  items = items.filter((item) => item.id !== itemId);

  // Update localStorage with the new list
  localStorage.setItem("Temp", JSON.stringify(items));

  // Re-render the cart
  renderCart();
}

//Updates the actual Cart Dropdown Box
function renderCart() {
  const cartDropdown = document.getElementById("cart-dropdown");
  const items = JSON.parse(localStorage.getItem("Temp")) || [];
  let cartHTML = "";
  let totalPrice = 0;

  //For Each New item it creates a new HTML section code to signify it in the Dropdown box
  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
    cartHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${
      item.name
    }"> <!--Puts the Image and Item name-->
            <span class="item-name">${
              item.name
            }</span> <!--Puts the Item Name-->
            <div class="quantity-control"> 
                <button onclick="updateQuantity('${
                  item.id
                }', -1)">-</button> <!--Returns -1 to updateQuantity To minus items-->
                <span id="quantity-${item.id}">${item.quantity}</span>
                <button onclick="updateQuantity('${
                  item.id
                }', 1)">+</button> <!--Returns 1 to updateQuantity To Add items-->
            </div>
            <span class="item-price">$${(item.price * item.quantity).toFixed(
              2
            )}</span> <!--Does Calculation of how many Items there is and its price-->
            <button onclick="removeItem('${
              item.id
            }')">Remove</button> <!--Creates Removes item button-->
        </div>
    `;
  });

  cartDropdown.innerHTML = `
        ${cartHTML}
        <div class="total-price">
            Total: $${totalPrice.toFixed(2)}
        </div>
        <button class="checkout-button" onclick="location.href='CheckoutPage.html'">Checkout</button> <!--Brings User to the Checkout Page-->
    `;
}

//Deals with Filtering/Sectioning of items in Main Menu
function filterSelection(category) {
  var elements = document.getElementsByClassName("filterDiv");

  if (category === "all") category = "";
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("show");
    if (elements[i].className.indexOf(category) > -1) {
      elements[i].classList.add("show");
    }
  }

  var buttons = document.querySelectorAll(".MainMenu-menu-categories .btn");
  buttons.forEach((button) => button.classList.remove("active"));
  document
    .querySelector(
      `.MainMenu-menu-categories .btn[onclick="filterSelection('${
        category || "all"
      }')"]`
    )
    .classList.add("active");
}
filterSelection("all");

// Sample data for local storage
const cartItems = [];

// Function to update quantity
function updateQuantityCheckout(itemId, change) {
  const items = JSON.parse(localStorage.getItem("Temp")) || [];
  const item = items.find((i) => i.id === itemId);
  item.quantity += change;
  if (item.quantity < 1) item.quantity = 1;
  localStorage.setItem("Temp", JSON.stringify(items));
  renderCartCheckout();
}

// Function to remove item
function removeItemCheckout(itemId) {
  let items = JSON.parse(localStorage.getItem("Temp")) || [];
  items = items.filter((i) => i.id !== itemId);
  localStorage.setItem("Temp", JSON.stringify(items));
  renderCartCheckout();
}

// Function to render cart items
function renderCartCheckout() {
  const cartContainer = document.querySelector(".Checkout-cart-container");
  const items = JSON.parse(localStorage.getItem("Temp")) || [];
  let cartHTML = "";
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
    cartHTML += `
            <div class="Checkout-cart-item">
                <img src="${item.image}" alt="${item.name}">
                <span class="Checkout-item-name">${item.name}</span>
                <div class="Checkout-quantity-control">
                    <button onclick="updateQuantityCheckout('${
                      item.id
                    }', -1)">-</button>
                    <span id="quantity-${item.id}">${item.quantity}</span>
                    <button onclick="updateQuantityCheckout('${
                      item.id
                    }', 1)">+</button>
                </div>
                <span class="Checkout-item-price">$${(
                  item.price * item.quantity
                ).toFixed(2)}</span>
                <button onclick="removeItemCheckout('${
                  item.id
                }')">Remove</button>
            </div>
        `;
  });

  cartContainer.innerHTML = `
        ${cartHTML}
        <div class="Checkout-total-price">
            Total: $${totalPrice.toFixed(2)}
        </div>
        <button class="Checkout-button" onclick="location.href='#.html'">Checkout</button>
    `;
}

// LANDING PAGE SCRIPT END //
