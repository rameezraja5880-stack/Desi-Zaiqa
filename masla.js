const products = [
    {
        id: 1,
        name: "Haldi Powder (Turmeric)",
        description: "Pure and vibrant turmeric powder for daily cooking and health.",
        price: 250,
        image: "https://images.unsplash.com/photo-1615486171448-4af62c2f6d28?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Lal Mirch Powder (Red Chili)",
        description: "Spicy and bright red chili powder to add the perfect kick to your dishes.",
        price: 300,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Dhaniya Powder (Coriander)",
        description: "Aromatic and finely ground coriander powder for an authentic taste.",
        price: 200,
        image: "https://images.unsplash.com/photo-1599909653554-478a87fbd527?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Garam Masala",
        description: "A premium blend of traditional spices to elevate any meal.",
        price: 450,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Kali Mirch (Black Pepper)",
        description: "Freshly ground black pepper for a sharp and pungent flavor.",
        price: 350,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Zeera (Cumin Seeds)",
        description: "Premium quality whole cumin seeds for tempering and flavoring.",
        price: 400,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');

// Render Products
function renderProducts() {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">Rs ${product.price} / 250g</div>
                <button class="btn add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    
    // Simple notification animation on cart icon
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart UI
function updateCart() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update items display
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rs ${item.price} x ${item.quantity} = Rs ${itemTotal}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Update total price
    totalPriceEl.innerText = total;
}

// Modal Toggle
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});
