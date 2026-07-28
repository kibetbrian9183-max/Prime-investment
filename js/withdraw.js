// ===============================
// PrimeVest Withdraw
// ===============================

let user = JSON.parse(localStorage.getItem("user")) || {};

document.getElementById("currentBalance").innerText =
"KSh " + Number(user.balance || 0).toLocaleString();

document
.getElementById("withdrawForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const network = document.getElementById("network").value;

    const phone = document.getElementById("phone").value.trim();

    const amount = Number(document.getElementById("amount").value);

    if(network === ""){
        alert("Please select a payment method.");
        return;
    }

    if(phone.length !== 10){
        alert("Enter a valid phone number.");
        return;
    }

    if(amount < 150){
        alert("Minimum withdrawal is KSh 150.");
        return;
    }

    if(amount > user.balance){
        alert("Insufficient account balance.");
        return;
    }

    user.balance -= amount;

    if(!user.withdrawalHistory){
        user.withdrawalHistory = [];
    }

    const now = new Date();

    user.withdrawalHistory.unshift({

        amount: amount,

        network: network,

        phone: phone,

        status: "Pending",

        date: now.toLocaleDateString(),

        time: now.toLocaleTimeString()

    });

    localStorage.setItem("user", JSON.stringify(user));

    alert("Withdrawal processed successfully.");

    window.location.href = "profile.html";

});
