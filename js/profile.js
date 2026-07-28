// ===================================
// PrimeVest Profile
// js/profile.js
// ===================================

// Load User
let user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
    phone: "",
    balance: 0,
    investment: 0,
    dailyIncome: 0,
    firstPurchase: false,
    referralCode: "",
    earningsHistory: [],
    withdrawalHistory: []
};

// Generate Referral Code
if (!user.referralCode) {
    user.referralCode =
        "PV" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("user", JSON.stringify(user));
}

// Load Profile
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("username").innerText =
        user.username;

    document.getElementById("phone").innerText =
        user.phone;

    document.getElementById("balance").innerText =
        "KSh " + Number(user.balance).toLocaleString();

    document.getElementById("investment").innerText =
        "KSh " + Number(user.investment).toLocaleString();

    document.getElementById("dailyIncome").innerText =
        "KSh " + Number(user.dailyIncome).toLocaleString();

    document.getElementById("referralCode").innerText =
        user.referralCode;

    document.getElementById("inviteLink").value =
        window.location.origin +
        "/register.html?ref=" +
        user.referralCode;

    loadEarningHistory();

    loadWithdrawalHistory();

});

// Copy Invitation Link
function copyInviteLink() {

    const link = document.getElementById("inviteLink");

    link.select();
    link.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(link.value);

    alert("Invitation link copied successfully.");

}

// Earnings History
function loadEarningHistory() {

    const container =
        document.getElementById("earningHistory");

    container.innerHTML = "";

    if (user.earningsHistory.length === 0) {

        container.innerHTML =
            "<p>No earnings yet.</p>";

        return;

    }

    user.earningsHistory.forEach(item => {

        container.innerHTML += `

        <div class="history-item">

            <div>

                <strong>${item.date}</strong>

                <div class="history-date">
                    ${item.time}
                </div>

            </div>

            <div class="history-amount">
                + KSh ${Number(item.amount).toLocaleString()}
            </div>

        </div>

        `;

    });

}

// Withdrawal History
function loadWithdrawalHistory() {

    const container =
        document.getElementById("withdrawHistory");

    container.innerHTML = "";

    if (user.withdrawalHistory.length === 0) {

        container.innerHTML =
            "<p>No withdrawals yet.</p>";

        return;

    }

    user.withdrawalHistory.forEach(item => {

        container.innerHTML += `

        <div class="history-item">

            <div>

                <strong>${item.date}</strong>

                <div class="history-date">

                    ${item.time}

                    <br>

                    ${item.status}

                </div>

            </div>

            <div class="withdraw-amount">

                - KSh ${Number(item.amount).toLocaleString()}

            </div>

        </div>

        `;

    });

}

// Refresh Profile After Changes
function updateProfile() {

    localStorage.setItem("user", JSON.stringify(user));

    location.reload();

}
