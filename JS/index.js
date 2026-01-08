document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://6922d18909df4a49232364e8.mockapi.io/api/product";
  const favoriteList = document.querySelector(".favorite_food");

  // Modal elements
  const modalOverlay = document.getElementById("product-detail-modal");
  const modalImg = document.getElementById("modal-product-img");
  const modalName = document.getElementById("modal-product-name");
  const modalIngredients = document.getElementById("modal-product-ingredients");
  const modalPrice = document.getElementById("modal-product-price");
  const closeModalBtn = document.querySelector(".close-modal-btn");

  /* ===== MODAL FUNCTIONS ===== */
  function showModal(data) {
    modalImg.src = data.img;
    modalName.textContent = data.name;
    modalIngredients.textContent = data.detail;
    modalPrice.textContent = Number(data.price).toLocaleString();
    modalOverlay.style.display = "flex";
  }

  function hideModal() {
    modalOverlay.style.display = "none";
  }

  /* ===== CART FUNCTION ===== */
  function addToCart(id) {
    // Lấy giỏ hàng hiện tại
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã tồn tại chưa
    const exist = cart.find((item) => item.id === id);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({
        id: id,
        quantity: 1,
      });
    }

    // Lưu lại
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Cart hiện tại:", cart);
    alert("Đã thêm sản phẩm vào giỏ hàng 🛒");
  }

  /* ===== LOAD FAVORITE ===== */
  function loadFavoriteProducts() {
    fetch(`${API_URL}?favorite=Món ăn yêu thích`)
      .then((res) => res.json())
      .then((products) => {
        if (!products.length) {
          favoriteList.innerHTML = "<p>Chưa có món yêu thích</p>";
          return;
        }

        favoriteList.innerHTML = products
          .map(
            (p) => `
          <div class="box-item">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${Number(p.price).toLocaleString()} VNĐ</p>

            <button 
              class="detail-btn"
              data-id="${p.id}"
              data-name="${p.name}"
              data-img="${p.img}"
              data-detail="${p.detail}"
              data-price="${p.price}">
              Xem chi tiết
            </button>

            <button 
              class="add-to-cart-btn"
              data-id="${p.id}">
              Thêm vào giỏ hàng
            </button>
          </div>
        `
          )
          .join("");
      });
  }

  /* ===== EVENTS ===== */
  document.addEventListener("click", (e) => {
    const target = e.target;

    // Show modal
    if (target.classList.contains("detail-btn")) {
      showModal(target.dataset);
    }

    // Add to cart
    if (target.classList.contains("add-to-cart-btn")) {
      addToCart(target.dataset.id);
    }
  });

  // Hide modal events
  closeModalBtn.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", (e) => {
    // Only close if the overlay itself is clicked, not the content inside
    if (e.target === modalOverlay) {
      hideModal();
    }
  });

  /* ===== INIT ===== */
  loadFavoriteProducts();
});
