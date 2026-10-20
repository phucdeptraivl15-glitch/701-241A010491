document.addEventListener("DOMContentLoaded", function () {

  // =========================================================
  // BÀI TẬP 3: COUNTDOWN TIMER 10 PHÚT
  // =========================================================
  const timerDisplay = document.getElementById("timerDisplay");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const timeOutModal = document.getElementById("timeOutModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (timerDisplay) {
    let totalSeconds = 10 * 60; // 10 phút = 600 giây
    let timerInterval = null;

    // Cập nhật giao diện đồng hồ
    function updateDisplay() {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      // Định dạng dạng 00:00
      const formattedMins = minutes.toString().padStart(2, "0");
      const formattedSecs = seconds.toString().padStart(2, "0");
      timerDisplay.textContent = `${formattedMins}:${formattedSecs}`;

      // Animation đỏ cảnh báo khi dưới 1 phút (<= 60s)
      if (totalSeconds <= 60 && totalSeconds > 0) {
        timerDisplay.classList.add("timer-warning");
      } else {
        timerDisplay.classList.remove("timer-warning");
      }
    }

    // Hàm bắt đầu đếm ngược
    function startTimer() {
      // Nếu timer đang chạy thì không tạo thêm interval mới (tránh bị dồn tốc độ)
      if (timerInterval !== null) return;

      startBtn.textContent = "Đang đếm...";
      startBtn.disabled = true;

      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateDisplay();
        } else {
          // Khi hết giờ
          clearInterval(timerInterval);
          timerInterval = null;
          startBtn.textContent = "Bắt đầu";
          startBtn.disabled = false;
          if (timeOutModal) timeOutModal.style.display = "flex";
        }
      }, 1000);
    }

    // Hàm đặt lại đồng hồ
    function resetTimer() {
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      totalSeconds = 10 * 60; // Khôi phục 10 phút
      updateDisplay();
      if (startBtn) {
        startBtn.textContent = "Bắt đầu";
        startBtn.disabled = false;
      }
    }

    // Gán sự kiện Click trực tiếp
    if (startBtn) startBtn.addEventListener("click", startTimer);
    if (resetBtn) resetBtn.addEventListener("click", resetTimer);
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", function () {
        if (timeOutModal) timeOutModal.style.display = "none";
      });
    }

    // Render khởi tạo ban đầu
    updateDisplay();
  }

  // =========================================================
  // BÀI TẬP 1: TÌM KIẾM SẢN PHẨM (index.html)
// =========================================================
  const productGrid = document.getElementById("productGrid");
  if (productGrid) {
    const products = [
      { id: 1, name: "Laptop ASUS TUF Gaming A15", price: "21.990.000đ", img: "https://via.placeholder.com/200" },
      { id: 2, name: "Điện thoại iPhone 15 Pro 128GB", price: "27.490.000đ", img: "https://via.placeholder.com/200" },
      { id: 3, name: "Vợt cầu lông Yonex Astrox 88D Pro", price: "4.350.000đ", img: "https://via.placeholder.com/200" },
      { id: 4, name: "Vợt Li-Ning Turbo Charging 75C", price: "3.800.000đ", img: "https://via.placeholder.com/200" },
      { id: 5, name: "Tai nghe Sony WH-1000XM5", price: "7.990.000đ", img: "https://via.placeholder.com/200" }
    ];

    function renderProducts(items) {
      productGrid.innerHTML = "";
      const noResult = document.getElementById("noResult");
      if (items.length === 0) {
        if (noResult) noResult.style.display = "block";
        return;
      }
      if (noResult) noResult.style.display = "none";

      items.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product-item";
        card.innerHTML = `<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><p class="price" style="color:red;font-weight:bold">${p.price}</p>`;
        productGrid.appendChild(card);
      });
    }

    renderProducts(products);
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function handleSearch() {
      const keyword = searchInput.value.trim().toLowerCase();
      const filtered = products.filter((p) => p.name.toLowerCase().includes(keyword));
      renderProducts(filtered);
    }

    if (searchBtn) searchBtn.addEventListener("click", handleSearch);
    if (searchInput) searchInput.addEventListener("keyup", handleSearch);
  }

  // =========================================================
  // BÀI TẬP 2: FORM VALIDATION (baitap02.html)
  // =========================================================
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const name = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const terms = document.getElementById("terms").checked;

      document.getElementById("nameError").textContent = name === "" ? "Vui lòng nhập họ tên" : "";
      document.getElementById("emailError").textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Email không hợp lệ";
      document.getElementById("passError").textContent = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ? "" : "Mật khẩu >= 8 ký tự, có chữ hoa, thường và số";
document.getElementById("termsError").textContent = terms ? "" : "Bạn chưa đồng ý điều khoản";

      if (name !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) && terms) {
        localStorage.setItem("userAccount", JSON.stringify({ name, email }));
        const banner = document.getElementById("successBanner");
        if (banner) {
          banner.textContent = "Đăng ký thành công!";
          banner.style.display = "block";
        }
        registerForm.reset();
      }
    });
  }
});
