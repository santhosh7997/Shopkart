// Base API URL
const API_BASE_URL = "http://localhost:9090";

// ---------- LOGIN ----------
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",   // ⭐ VERY IMPORTANT
        body: JSON.stringify({username, password})
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            alert("Login failed");
            throw new Error("Login failed");
        }
    })
    .then(data => {
		saveUsername(data.username);
        alert("Login success! Welcome " + data.username);
        // Redirect based on role
        if(data.role === "ADMIN") {
            window.location = "admin-home.html";
        } else {
            window.location = "customer-home.html";
        }
    })
    .catch(error => {
        console.error("Login error:", error);
    });
}

// ---------- REGISTER ----------
function register() {
    const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: "CUSTOMER"  // Add role
    };
    
    fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
    .then(res => {
        if(res.ok) {
            alert("Registered successfully! Please login.");
            window.location = "login.html";
        } else {
            return res.json().then(data => {
                alert("Registration failed: " + (data.error || "User already exists"));
            });
        }
    })
    .catch(error => {
        console.error("Registration error:", error);
        alert("Registration failed: Server error");
    });
}

// ---------- LOGOUT ----------
function logout() {
    fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    })
    .then(res => {
        if(res.ok) {
            alert("Logged out successfully");
            window.location = "login.html";
        }
    })
    .catch(error => {
        console.error("Logout error:", error);
    });
}

// ---------- PRODUCTS ----------
function loadProducts() {
    fetch(`${API_BASE_URL}/api/products`, {
        method: "GET",
        credentials: "include"   // ⭐ VERY IMPORTANT
    })
    .then(res => {
        if (res.status === 401) {
            alert("Please login again");
            window.location = "login.html";
            return;
        }
        return res.json();
    })
    .then(data => {
        if(!data) return;
        
        let products = data.products;
        let output = "";
        
        products.forEach(p => {
            let imageUrl = p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/150";
            output += `
            <div class="card">
                <img src="${imageUrl}" width="150" height="150" style="object-fit: cover;"><br>
                <h3>${p.name}</h3>
                <p class="description">${p.description || ''}</p>
                <p class="price">₹${p.price}</p>
                <p class="stock">Stock: ${p.stock}</p>
				<button onclick='addToCart(${JSON.stringify(p).replace(/'/g, "\\'")})'>
                    Add to Cart
                </button>
            </div>`;
        });
        
        document.getElementById("products").innerHTML = output;
    })
    .catch(error => {
        console.error("Load products error:", error);
        alert("Failed to load products");
    });
}

// ---------- CART ----------
function addToCart(product) {
    // Get username from session or prompt
    const username = localStorage.getItem("username") || prompt("Enter your username:");
    
    if(!username) {
        alert("Please login first");
        window.location = "login.html";
        return;
    }
    
    fetch(`${API_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            username: username,
            productId: product.product_id,
            quantity: 1
        })
    })
    .then(res => {
        if(res.ok) {
            alert("Added to cart successfully!");
            updateCartCount();
        } else if(res.status === 401) {
            alert("Please login first");
            window.location = "login.html";
        } else {
            alert("Failed to add to cart");
        }
    })
    .catch(error => {
        console.error("Add to cart error:", error);
        alert("Failed to add to cart");
    });
}

function loadCart() {
    fetch(`${API_BASE_URL}/api/cart/items`, {
        method: "GET",
        credentials: "include"
    })
    .then(res => {
        if (res.status === 401) {
            alert("Please login again");
            window.location = "login.html";
            return;
        }
        return res.json();
    })
    .then(data => {
        if(!data || !data.cart) return;
        
        let cart = data.cart;
        let products = cart.products;
        let output = "";
        
        products.forEach(p => {
            output += `
            <div class="cart-item">
                <img src="${p.image_url || 'https://via.placeholder.com/80'}" width="80">
                <div>
                    <h3>${p.name}</h3>
                    <p>₹${p.price_per_unit} x ${p.quantity}</p>
                    <p><strong>Total: ₹${p.total_price}</strong></p>
                </div>
                <div>
                    <button onclick="updateCartQuantity(${p.product_id}, ${p.quantity + 1})">+</button>
                    <span>${p.quantity}</span>
                    <button onclick="updateCartQuantity(${p.product_id}, ${p.quantity - 1})">-</button>
                    <button onclick="removeFromCart(${p.product_id})">Remove</button>
                </div>
            </div>`;
        });
        
        document.getElementById("cartItems").innerHTML = output || "<p>Your cart is empty</p>";
        document.getElementById("total").innerText = cart.overall_total_price;
    })
    .catch(error => {
        console.error("Load cart error:", error);
    });
}

function updateCartQuantity(productId, newQuantity) {
    const username = localStorage.getItem("username");
    
    if(newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    fetch(`${API_BASE_URL}/api/cart/update`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            username: username,
            productId: productId,
            quantity: newQuantity
        })
    })
    .then(res => {
        if(res.ok) {
            loadCart(); // Reload cart
        }
    })
    .catch(error => {
        console.error("Update cart error:", error);
    });
}

function removeFromCart(productId) {
    const username = localStorage.getItem("username");
    
    fetch(`${API_BASE_URL}/api/cart/delete`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            username: username,
            productId: productId
        })
    })
    .then(res => {
        if(res.ok) {
            alert("Item removed from cart");
            loadCart(); // Reload cart
        }
    })
    .catch(error => {
        console.error("Remove from cart error:", error);
    });
}

function updateCartCount() {
    const username = localStorage.getItem("username");
    if(!username) return;
    
    fetch(`${API_BASE_URL}/api/cart/items/count?username=${username}`, {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(count => {
        const cartBadge = document.getElementById("cartCount");
        if(cartBadge) {
            cartBadge.innerText = count;
        }
    })
    .catch(error => {
        console.error("Cart count error:", error);
    });
}

// ---------- ORDERS ----------
function loadOrders() {
    fetch(`${API_BASE_URL}/api/orders`, {
        method: "GET",
        credentials: "include"
    })
    .then(res => {
        if (res.status === 401) {
            alert("Please login again");
            window.location = "login.html";
            return;
        }
        return res.json();
    })
    .then(data => {
        if(!data || !data.products) return;
        
        let output = "";
        data.products.forEach(order => {
            output += `
            <div class="order-item">
                <img src="${order.image_url || 'https://via.placeholder.com/80'}" width="80">
                <div>
                    <h3>${order.name}</h3>
                    <p>Order ID: ${order.order_id}</p>
                    <p>Quantity: ${order.quantity}</p>
                    <p>Price per unit: ₹${order.price_per_unit}</p>
                    <p><strong>Total: ₹${order.total_price}</strong></p>
                </div>
            </div>`;
        });
        
        document.getElementById("orders").innerHTML = output || "<p>No orders yet</p>";
    })
    .catch(error => {
        console.error("Load orders error:", error);
    });
}

// ---------- PAYMENT ----------
function initiatePayment() {
    const username = getUsername();

    if(!username) {
        console.error("No username found in localStorage");
        alert("Please login again");
        window.location = "login.html";
        return;
    }

    console.log("Creating order for username:", username);

    fetch(`${API_BASE_URL}/api/orders/create-from-cart?username=${username}`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    })
    .then(res => {
        console.log("Response status:", res.status);
        if(res.ok) {
            return res.json().then(data => {
                console.log("Order created:", data);
                alert("Order created! Redirecting to payment...");
                window.location = "checkout.html";
            });
        } else {
            return res.text().then(errorText => {
                console.error("Server error:", errorText);
                alert("Failed to create order: " + errorText);
            });
        }
    })
    .catch(err => {
        console.error("Checkout error:", err);
        alert("Error: " + err.message);
    });
}


// Save username to localStorage on successful login
function saveUsername(username) {
    localStorage.setItem("username", username);
}

// Get username from localStorage
function getUsername() {
    return localStorage.getItem("username");
}

// Clear username on logout
function clearUsername() {
    localStorage.removeItem("username");
}