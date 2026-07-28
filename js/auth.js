// ======================================
// PrimeVest Authentication
// File: js/auth.js
// ======================================

// -------------------------
// REGISTER
// -------------------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const referralInput = document.getElementById("referralCode").value.trim();

        if (
            username === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        if (phone.length !== 10 || !phone.startsWith("07")) {
            alert("Enter a valid phone number.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const referralCode =
            "PV" + Math.floor(100000 + Math.random() * 900000);

        let balance = 0;

        // Registration reward for referral
        if (referralInput !== "") {
            balance = 100;
        }

        const user = {

            username,
            email,
            phone,
            password,

            balance,

            investment: 0,

            dailyIncome: 0,

            firstPurchase: false,

            referralCode,

            referredBy: referralInput,

            earningsHistory: [],

            withdrawalHistory: [],

            lastClaim: 0

        };

        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("loggedIn", "true");

        alert("Account created successfully.");

        window.location.href = "home.html";

    });

}

// -------------------------
// LOGIN
// -------------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const user =
            JSON.parse(localStorage.getItem("user"));

        if (!user) {

            alert("No account found. Please register first.");

            return;

        }

        if (
            username === user.username &&
            password === user.password
        ) {

            localStorage.setItem("loggedIn", "true");

            window.location.href = "home.html";

        } else {

            alert("Invalid username or password.");

        }

    });

}

// -------------------------
// SHOW / HIDE PASSWORD
// -------------------------

const togglePassword =
    document.querySelector(".toggle-password");

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        const password =
            document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

}

// -------------------------
// AUTO LOGIN
// -------------------------

if (
    localStorage.getItem("loggedIn") === "true" &&
    window.location.pathname.includes("index.html")
) {

    window.location.href = "home.html";

}

// -------------------------
// LOGOUT
// -------------------------

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

}
