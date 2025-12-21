document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  const renderCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Xử lý giỏ hàng trống sớm để tiết kiệm tài nguyên
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
      if (cartTotalElement) cartTotalElement.innerText = "0 VNĐ";
      return;
    }

    let totalPrice = 0;
    let htmlContent = ""; // Dùng biến tạm để tích lũy HTML

    cart.forEach((cart) => {
      const itemTotal = cart.price * cart.quantity;
      totalPrice += itemTotal;

      htmlContent += `
        <div class="cart-item">
          <img src="${cart.img}" alt="${cart.name}" />
          <div class="cart-item-info">
            <h3>${cart.name}</h3>
            <p>Giá: ${cart.price.toLocaleString()} VNĐ</p>
            <p>Số lượng: ${cart.quantity}</p>
            <p>Tổng: ${itemTotal.toLocaleString()} VNĐ</p>
            <button class="remove-item-btn" data-id="${cart.id}">Xóa</button>
          </div>
        </div>
      `;
    });

    // Chỉ cập nhật DOM một lần duy nhất
    cartItemsContainer.innerHTML = htmlContent;

    if (cartTotalElement) {
      cartTotalElement.innerText = `${totalPrice.toLocaleString()} VNĐ`;
    }

    setupDeleteButtons();
  };

  const setupDeleteButtons = () => {
    const deleteButtons = document.querySelectorAll(".remove-item-btn");
    deleteButtons.forEach((btn) => {
      btn.onclick = () => {
        // Dùng onclick trực tiếp để tránh lặp sự kiện nếu render lại
        const productId = btn.getAttribute("data-id");
        if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
          removeProduct(productId);
        }
      };
    });
  };

  const removeProduct = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Ép kiểu String để đảm bảo so sánh chính xác
    cart = cart.filter((cart) => String(cart.id) !== String(id));

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  };

  renderCartItems();
});
