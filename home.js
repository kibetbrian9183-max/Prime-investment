// ===============================
// PrimeVest - Home Page
// js/home.js
// ===============================

// Your Render Backend
const API_BASE = "https://fuliza-backend-xgsm.onrender.com";

// Investment Products
const products = [
    { amount: 500, daily: 35, duration: 30 },
    { amount: 1000, daily: 75, duration: 30 },
    { amount: 2000, daily: 160, duration: 30 },
    { amount: 5000, daily: 420, duration: 30 },
    { amount: 10000, daily: 900, duration: 30 }
];

// -------------------------------
// Load User
// -------------------------------
let user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
    phone: "",
    balance: 0,
    investment: 0,
    dailyIncome: 0,
    firstPurchase: false
};

// -------------------------------
// Display User
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {

    const welcome = document.getElementById("welcomeUser");
    const balance = document.getElementById("balance");

    if (welcome)
        welcome.innerText = `Welcome ${user.username}`;

    if (balance)
        balance.innerText = `KSh ${Number(user.balance).toLocaleString()}`;

    startLiveActivity();
});

// -------------------------------
// Purchase Product
// -------------------------------
function purchaseProduct(amount) {

    localStorage.setItem("purchaseAmount", amount);

    window.location.href = "payment.html";
}

// -------------------------------
// STK Push
// Called from payment.html
// -------------------------------
async function stkPush(phone, amount) {

    try {

        const response = await fetch(`${API_BASE}/api/mpesa/stkpush`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone,
                amount
            })

        });

        const data = await response.json();

        if (data.CheckoutRequestID) {

            checkPayment(data.CheckoutRequestID, amount);

        } else {

            alert(data.error || "Unable to initiate payment.");

        }

    } catch (error) {

        alert("Server connection failed.");

        console.log(error);

    }

}

// -------------------------------
// Check Payment Status
// -------------------------------
async function checkPayment(id, amount) {

    const timer = setInterval(async () => {

        try {

            const response = await fetch(`${API_BASE}/api/mpesa/status/${id}`);

            const result = await response.json();

            if (result.status === "success") {

                clearInterval(timer);

                paymentSuccess(amount);

            }

            if (result.status === "failed") {

                clearInterval(timer);

                alert("Payment Failed");

            }

        } catch (err) {

            console.log(err);

        }

    }, 3000);

}

// -------------------------------
// Payment Successful
// -------------------------------
function paymentSuccess(amount) {

    user.investment += amount;

    // Registration Bonus
    if (!user.firstPurchase) {

        user.balance += 150;

        user.firstPurchase = true;

        alert("Congratulations!\n\nYou have received a Registration Bonus of KSh 150.");

    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Investment Activated Successfully.");

    window.location.href = "profile.html";

}

// -------------------------------
// Random Live Activity
// -------------------------------
const names = [

    "Brian",
    "James",
    "Mercy",
    "Peter",
    "John",
    "Kevin",
    "Alice",
    "Faith",
    "Mary",
    "Dennis",
    "Brenda",
    "Linet",
    "Joy",
    "Collins"

];

const amounts = [

    500,
    1000,
    2000,
    5000,
    10000

];

function randomPhone() {

    return "07" +
        Math.floor(Math.random() * 90000000 + 10000000)
        .toString()
        .replace(/(\d{2})(\d{4})(\d{2})/, "$1****$3");

}

function startLiveActivity() {

    const popup = document.getElementById("liveActivity");

    const text = document.getElementById("activityText");

    if (!popup || !text) return;

    setInterval(() => {

        const name = names[Math.floor(Math.random() * names.length)];

        const amount = amounts[Math.floor(Math.random() * amounts.length)];

        text.innerHTML = `
            <strong>${name}</strong>
            (${randomPhone()})<br>
            Just invested
            <strong>KSh ${amount.toLocaleString()}</strong>
        `;

        popup.classList.add("show");

        setTimeout(() => {

            popup.classList.remove("show");

        }, 5000);

    }, 9000);

}

// -------------------------------
// Logout
// -------------------------------
function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

}
