const loginToggle = document.getElementById("login-toggle");
const signupToggle = document.getElementById("signup-toggle");
const loginFormWrap = document.getElementById("login-form");
const signupFormWrap = document.getElementById("signup-form");

const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

if (loginToggle && signupToggle) {
  loginToggle.addEventListener("click", () => {
    loginToggle.classList.add("active");
    signupToggle.classList.remove("active");
    loginFormWrap.style.display = "block";
    signupFormWrap.style.display = "none";
  });
  signupToggle.addEventListener("click", () => {
    signupToggle.classList.add("active");
    loginToggle.classList.remove("active");
    signupFormWrap.style.display = "block";
    loginFormWrap.style.display = "none";
  });
}

// ==================== LOGIN VALIDATION ====================
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginUsernameError = document.getElementById("login-username-error");
const loginPasswordError = document.getElementById("login-password-error");
const loginMessage = document.getElementById("login-message");
const formLogin = document.getElementById("form-login");

const validateLoginForm = () => {
  let isValid = true;

  if (loginUsernameError) loginUsernameError.innerText = "";
  if (loginPasswordError) loginPasswordError.innerText = "";
  if (loginMessage) loginMessage.innerText = "";

  const usernameValue = loginUsername ? loginUsername.value.trim() : "";
  const passwordValue = loginPassword ? loginPassword.value : "";

  if (!usernameValue) {
    if (loginUsernameError)
      loginUsernameError.innerText = "Vui lòng nhập tên đăng nhập hoặc email.";
    isValid = false;
  }

  if (!passwordValue) {
    if (loginPasswordError)
      loginPasswordError.innerText = "Vui lòng nhập mật khẩu.";
    isValid = false;
  }

  return isValid;
};

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateLoginForm();
    if (ok) {
      const usernameInput = loginUsername.value.trim();
      const passwordInput = loginPassword.value;

      try {
        const users = getUsersFromLocalStorage();
        const user = users.find(
          (u) =>
            (u.username === usernameInput || u.email === usernameInput) &&
            u.password === passwordInput
        );

        if (user) {
          if (loginMessage) {
            loginMessage.style.color = "green";
            loginMessage.innerText = "Đăng nhập thành công!";
          }
          localStorage.setItem("currentUser", JSON.stringify(user));
          formLogin.reset();
          setTimeout(() => {
            window.location.href = "./mainpage.html";
          }, 1500);
        } else {
          if (loginMessage) {
            loginMessage.style.color = "red";
            loginMessage.innerText =
              "Tên đăng nhập/email hoặc mật khẩu không chính xác.";
          }
        }
      } catch (err) {
        if (loginMessage) {
          loginMessage.style.color = "red";
          loginMessage.innerText = "Lỗi hệ thống. Vui lòng thử lại.";
        }
        console.error(err);
      }
    } else {
      if (loginMessage) {
        loginMessage.style.color = "red";
        loginMessage.innerText = "Vui lòng sửa các lỗi trên form.";
      }
    }
  });
}

// ==================== SIGNUP VALIDATION ====================
const fullnameInput = document.getElementById("fullname");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const fullnameError = document.getElementById("fullname-error");
const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const messageElement = document.getElementById("message");

const validateForm = () => {
  let isValid = true;

  if (fullnameError) fullnameError.innerText = "";
  if (usernameError) usernameError.innerText = "";
  if (emailError) emailError.innerText = "";
  if (passwordError) passwordError.innerText = "";
  if (confirmPasswordError) confirmPasswordError.innerText = "";
  if (messageElement) messageElement.innerText = "";

  const valueFull = fullnameInput ? fullnameInput.value.trim() : "";
  const valueUser = usernameInput ? usernameInput.value.trim() : "";
  const valueEmail = emailInput ? emailInput.value.trim() : "";
  const valuePass = passwordInput ? passwordInput.value : "";
  const valueConfirm = confirmPasswordInput ? confirmPasswordInput.value : "";

  if (!valueFull) {
    if (fullnameError) fullnameError.innerText = "Vui lòng nhập họ và tên.";
    isValid = false;
  }

  if (!valueUser) {
    if (usernameError) usernameError.innerText = "Vui lòng nhập tên đăng nhập.";
    isValid = false;
  } else if (valueUser.length < 4) {
    if (usernameError)
      usernameError.innerText = "Tên đăng nhập phải từ 4 ký tự trở lên.";
    isValid = false;
  }

  if (!valueEmail) {
    if (emailError) emailError.innerText = "Vui lòng nhập email.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueEmail)) {
    if (emailError) emailError.innerText = "Email không hợp lệ.";
    isValid = false;
  }

  if (!valuePass) {
    if (passwordError) passwordError.innerText = "Vui lòng nhập mật khẩu.";
    isValid = false;
  } else if (valuePass.length < 6) {
    if (passwordError)
      passwordError.innerText = "Mật khẩu phải có ít nhất 6 ký tự.";
    isValid = false;
  }

  if (!valueConfirm) {
    if (confirmPasswordError)
      confirmPasswordError.innerText = "Vui lòng xác nhận mật khẩu.";
    isValid = false;
  } else if (valuePass !== valueConfirm) {
    if (confirmPasswordError)
      confirmPasswordError.innerText = "Mật khẩu không khớp.";
    isValid = false;
  }

  return isValid;
};

const formSignup = document.getElementById("form-signup");
if (formSignup) {
  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateForm();
    if (ok) {
      const user = {
        fullname: fullnameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      };
      try {
        const users = getUsersFromLocalStorage();
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        if (messageElement) {
          messageElement.style.color = "green";
          messageElement.innerText = "Đăng ký thành công!";
        }
        formSignup.reset();
        setTimeout(() => {
          loginToggle.click();
        }, 1500);
      } catch (err) {
        if (messageElement) {
          messageElement.style.color = "red";
          messageElement.innerText = "Lỗi lưu dữ liệu. Vui lòng thử lại.";
        }
        console.error(err);
      }
    } else {
      if (messageElement) {
        messageElement.style.color = "red";
        messageElement.innerText = "Vui lòng sửa các lỗi trên form.";
      }
    }
  });
}
