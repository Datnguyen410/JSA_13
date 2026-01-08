document.addEventListener("DOMContentLoaded", function () {
  const productNorthern = document.querySelector(".product_Northern");
  const productCentral = document.querySelector(".product_Central");
  const productSouthern = document.querySelector(".product_Southern");
  const modal = document.getElementById("detail-modal");
  const modalImg = document.getElementById("modal-product-img");
  const modalName = document.getElementById("modal-product-name");
  const modalIngredients = document.getElementById("modal-product-ingredients");
  const modalPrice = document.getElementById("modal-product-price");
  const closeBtn = document.querySelector(".close-btn");

  const showModal = (product) => {
    modalImg.src = product.img;
    modalName.textContent = product.name;
    modalIngredients.textContent = product.detail;
    modalPrice.textContent = Number(product.price).toLocaleString();
    modal.style.display = "flex";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  const renderProducts = (element, category) => {
    fetch(
      `https://6922d18909df4a49232364e8.mockapi.io/api/product?category=${category}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((tasks) => {
        if (!Array.isArray(tasks) || tasks.length === 0) {
          element.innerHTML = "<p>Không có sản phẩm</p>";
          return;
        }

        let html = "";
        tasks.forEach((task) => {
          html += `
                  <div class="box-item">
                    <img src="${task.img}" alt="product image" />
                    <h2>${task.name}</h2>
                    <p>Giá: ${task.price} VNĐ</p>
                    <span>Mô tả: ${task.describe}</span>
                    <div class="buttons">
                      <button 
                         class="add-to-cart-btn"
                          data-id="${task.id}"
                          data-name="${task.name}"
                          data-price="${task.price}"
                          data-img="${task.img}"
                        >
                          Thêm vào giỏ
                        </button>

                      <button class="detail-btn" 
                        data-detail="${task.detail}" 
                        data-img="${task.img}" 
                        data-name="${task.name}"
                        data-price="${task.price}">Chi tiết</button>
                    </div>
                  </div>
                `;
        });
        element.innerHTML = html;

        element.querySelectorAll(".detail-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            showModal({
              img: btn.dataset.img,
              name: btn.dataset.name,
              detail: btn.dataset.detail,
              price: btn.dataset.price
            });
          });
        });
      })
      .catch((err) => {
        console.error(err);
        element.innerHTML = "<p>Lỗi tải dữ liệu</p>";
      });
  };

  renderProducts(productNorthern, "Món Bắc");
  renderProducts(productCentral, "Món Trung");
  renderProducts(productSouthern, "Món Nam");
});
// ===== CART LOGIC =====

// Lấy giỏ hàng
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Lưu giỏ hàng
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Thêm sản phẩm vào giỏ
function addToCart(product) {
  let cart = getCart();

  let index = cart.findIndex((item) => item.id === product.id);

  if (index === -1) {
    cart.push({
      ...product,
      quantity: 1,
    });
  } else {
    cart[index].quantity += 1;
  }

  saveCart(cart);
  alert("Đã thêm vào giỏ hàng 🛒");
}

// Bắt sự kiện click nút thêm giỏ
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const btn = e.target;

    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      img: btn.dataset.img,
    };

    addToCart(product);
  }
});
