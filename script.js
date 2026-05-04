const products = [
  { id:1, title:"Raw Tee", price:35, image:"https://via.placeholder.com/300" },
  { id:2, title:"Graphic Tee", price:40, image:"https://via.placeholder.com/300" },
  { id:3, title:"Hoodie", price:65, image:"https://via.placeholder.com/300" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartEmpty = document.getElementById("cartEmpty");

/* PRODUCTS */
function renderProducts(list){
  grid.innerHTML = "";
  list.forEach(p=>{
    grid.innerHTML += `
      <div class="product-card">
        <div class="product-image" style="background:url('${p.image}')"></div>
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
        <button class="btn-primary" onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

/* CART */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id){
  const item = cart.find(i=>i.id===id);
  if(item) item.qty++;
  else cart.push({...products.find(p=>p.id===id), qty:1});
  updateCart();
}

function updateQty(id,change){
  const item = cart.find(i=>i.id===id);
  item.qty += change;
  if(item.qty<=0) cart = cart.filter(i=>i.id!==id);
  updateCart();
}

function updateCart(){
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(i=>{
    total += i.price*i.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          ${i.title}
          <div class="qty-controls">
            <button onclick="updateQty(${i.id},-1)">-</button>
            ${i.qty}
            <button onclick="updateQty(${i.id},1)">+</button>
          </div>
        </div>
        <span>$${i.price*i.qty}</span>
      </div>
    `;
  });

  cartEmpty.style.display = cart.length ? "none":"block";
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((a,b)=>a+b.qty,0);

  saveCart();
}

/* SEARCH */
document.getElementById("searchInput").oninput = e=>{
  const term = e.target.value.toLowerCase();
  renderProducts(products.filter(p=>p.title.toLowerCase().includes(term)));
};

/* SORT */
document.getElementById("sortSelect").onchange = e=>{
  const val = e.target.value;
  let sorted=[...products];
  if(val==="price-asc") sorted.sort((a,b)=>a.price-b.price);
  if(val==="price-desc") sorted.sort((a,b)=>b.price-a.price);
  renderProducts(sorted);
};

/* CART TOGGLE */
document.getElementById("cartButton").onclick=()=>cartDrawer.classList.add("open");
document.getElementById("cartClose").onclick=()=>cartDrawer.classList.remove("open");

renderProducts(products);
updateCart();
document.getElementById("year").textContent=new Date().getFullYear();
