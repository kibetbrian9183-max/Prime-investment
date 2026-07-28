// =====================================
// PrimeVest Settings
// File: js/settings.js
// =====================================

// Load User
let user = JSON.parse(localStorage.getItem("user")) || {};

// Load User Details
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("username").innerText =
        user.username || "Guest";

    document.getElementById("phone").innerText =
        user.phone || "No Phone";

});

// ===============================
// Change Password
// ===============================
function changePassword() {

    const oldPassword =
        document.getElementById("oldPassword").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    if (oldPassword === "" || newPassword === "") {

        alert("Please fill in all password fields.");

        return;

    }

    if (oldPassword !== user.password) {

        alert("Current password is incorrect.");

        return;

    }

    if (newPassword.length < 4) {

        alert("Password must be at least 4 characters.");

        return;

    }

    user.password = newPassword;

    localStorage.setItem("user", JSON.stringify(user));

    alert("Password changed successfully.");

    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";

}

// ===============================
// Change Phone Number
// ===============================
function changePhone() {

    const phone =
        document.getElementById("newPhone").value.trim();

    if (phone.length !== 10 || !phone.startsWith("07")) {

        alert("Enter a valid Safaricom or Airtel number.");

        return;

    }

    user.phone = phone;

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("phone").innerText = phone;

    alert("Phone number updated successfully.");

    document.getElementById("newPhone").value = "";

}

// ===============================
// Contact Support
// ===============================
function contactSupport() {

    // Replace with your support number
    const supportNumber = "254700000000";

    const message =
        encodeURIComponent(
            "Hello PrimeVest Support, I need assistance."
        );

    window.open(
        `https://wa.me/${supportNumber}?text=${message}`,
        "_blank"
    );

}

// ===============================
// Logout
// ===============================
function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedIn");

        window.location.href = "index.html";

    }

}

// ===============================
// Generate Referral Link (if missing)
// ===============================
if (!user.referralCode) {

    user.referralCode =
        "PV" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("user", JSON.stringify(user));

}

// ===============================
// Auto Save User
// ===============================
function saveUser() {

    localStorage.setItem("user", JSON.stringify(user));

}
