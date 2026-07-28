const API_URL = "https://fuliza-backend-xgsm.onrender.com";

// Read amount from URL
const params = new URLSearchParams(window.location.search);
const amount = params.get("amount");

document.getElementById("displayAmount").value =
amount ? `KSh ${Number(amount).toLocaleString()}` : "";

document.getElementById("payBtn").addEventListener("click", async () => {

    let phone = document.getElementById("phone").value.trim();
    let amount = document.getElementById("displayAmount").value.trim();

    // Convert phone number to 2547XXXXXXXX
    phone = phone.replace(/\s+/g, "");

    if (phone.startsWith("+254")) {
        phone = phone.substring(1);      // +2547... -> 2547...
    } else if (phone.startsWith("254")) {
        // Already correct
    } else if (phone.startsWith("07")) {
        phone = "254" + phone.substring(1); // 07... -> 2547...
    } else if (phone.startsWith("01")) {
        phone = "254" + phone.substring(1); // 01... -> 2541...
    } else if (phone.startsWith("7") || phone.startsWith("1")) {
        phone = "254" + phone;              // 7... or 1... -> 254...
    } else {
        alert("Enter a valid Safaricom number.");
        return;
    }

    // Convert amount to plain integer
    amount = Number(
        amount.replace(/[^\d]/g, "")
    );

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount.");
        return;
    }

    document.getElementById("status").innerHTML = "Sending STK Push...";

    try {

        const response = await fetch(`${API_URL}/api/mpesa/stkpush`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone: phone,
                amount: amount
            })
        });

        const data = await response.json();

        if (data.checkoutRequestID) {
            document.getElementById("status").innerHTML =
                "STK Push sent. Check your phone and enter your M-Pesa PIN.";
            checkStatus(data.checkoutRequestID);
        } else {
            alert(data.message || "Payment failed.");
        }

    } catch (err) {
        console.error(err);
        alert("Server error.");
    }

});

function checkStatus(id){

const timer=setInterval(async()=>{

try{

const res=await fetch(`${API_URL}/api/mpesa/status/${id}`);

const data=await res.json();

if(data.status==="SUCCESS"){

clearInterval(timer);

alert("Payment Successful!");

window.location.href="profile.html";

}

if(data.status==="FAILED"){

clearInterval(timer);

alert("Payment Failed.");

}

}catch(e){

console.log(e);

}

},5000);

}
