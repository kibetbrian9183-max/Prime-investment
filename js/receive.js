// ====================================
// PrimeVest Daily Earnings
// ====================================

let user = JSON.parse(localStorage.getItem("user")) || {};

const products = {
    500: 35,
    1000: 75,
    2000: 160,
    5000: 420,
    10000: 900
};

const investment = Number(user.investment || 0);

const dailyIncome = products[investment] || 0;

document.getElementById("todayIncome").innerText =
"KSh " + dailyIncome.toLocaleString();

const claimBtn = document.getElementById("claimBtn");

const nextClaim = document.getElementById("nextClaim");

let lastClaim = user.lastClaim || 0;

const now = Date.now();

const waitingTime = 24 * 60 * 60 * 1000;

if (lastClaim && (now - lastClaim) < waitingTime) {

    const remaining = waitingTime - (now - lastClaim);

    const hours = Math.floor(remaining / 3600000);

    const minutes = Math.floor((remaining % 3600000) / 60000);

    claimBtn.disabled = true;

    claimBtn.style.opacity = "0.6";

    nextClaim.innerHTML =
        "Next claim in <b>" +
        hours +
        "h " +
        minutes +
        "m</b>";

}

claimBtn.addEventListener("click", () => {

    if (dailyIncome <= 0) {

        alert("You do not have an active investment.");

        return;

    }

    user.balance =
        Number(user.balance || 0) + dailyIncome;

    user.dailyIncome =
        Number(user.dailyIncome || 0) + dailyIncome;

    user.lastClaim = Date.now();

    if (!user.earningsHistory)
        user.earningsHistory = [];

    const date = new Date();

    user.earningsHistory.unshift({

        amount: dailyIncome,

        date: date.toLocaleDateString(),

        time: date.toLocaleTimeString()

    });

    localStorage.setItem("user", JSON.stringify(user));

    alert(
        "Congratulations!\n\nYou have successfully claimed KSh " +
        dailyIncome.toLocaleString()
    );

    window.location.href = "profile.html";

});
