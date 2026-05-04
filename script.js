// Simple product data (replace with your real products or fetch from an API)
const products = [
  {
    id: 1,
    title: "Raw Script Tee",
    price: 35,
    tagline: "Classic Raw ThreadZ script logo on premium cotton.",
    image: "https://via.placeholder.com/600x600?text=Raw+Script+Tee"
  },
  {
    id: 2,
    title: "Unscripted Graphic Tee",
    price: 40,
    tagline: "Bold graphic for unapologetic street style.",
    image: "https://via.placeholder.com/600x600?text=Unscripted+Tee"
  },
  {
    id: 3,
    title: "Midnight Street Hoodie",
    price: 65,
    tagline: "Heavyweight hoodie built for late-night moves.",
    image: "https://via.placeholder.com/600x600?text=Midnight+Hoodie"
  },
  {
    id: 4,
    title: "City Grid Tee",
    price: 38,
    tagline: "Urban grid design inspired by city blocks.",
    image: "https://via.placeholder.com/600x600?text=City+Grid+Tee"
  }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");
const sortSelect = document.getElementById("sortSelect");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const yearSpan = document.getElementById("year");

yearSpan.textContent = new Date().getFullYear();

function renderProducts(list) {
  productsGrid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image" style="background-image:url('${p.image}')"></div>
      <h3 class="product-title">${p.title}</h3>
      <div class="product-price">$${p.price.toFixed(2)}</div>
      <p class="product-tagline">${p.tagline}</p>
      <button class="btn-primary" data-id="${p.id}">Add to cart</button>
    `;
    productsGrid.appendChild(card);
  });
}

function sortProducts(mode) {
  const sorted = [...products];
  if (mode === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (mode === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderProducts(sorted);
}

function openCart() {
  cartDrawer.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
}

function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.title} x ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    `;
    cartItems.appendChild(row);
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
}

// Event listeners

productsGrid.addEventListener("click", (e) => {
  if (e.target.matches("button[data-id]")) {
    const id = Number(e.target.getAttribute("data-id"));
    addToCart(id);
  }
});

sortSelect.addEventListener("change", (e) => {
  sortProducts(e.target.value);
});

cartButton.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartDrawer.addEventListener("click", (e) => {
  if (e.target === cartDrawer) closeCart();
});

// Initial render
renderProducts(products);
