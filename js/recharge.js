// Backend URL
const API_URL = "https://fuliza-backend-xgsm.onrender.com";

// Recharge form
const rechargeForm = document.getElementById("rechargeForm");

if (rechargeForm) {
  rechargeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();
    const amount = document.getElementById("amount").value.trim();

    if (!phone || !amount) {
      alert("Please enter phone number and amount.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/mpesa/stkpush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          amount
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("STK Push sent. Please enter your M-Pesa PIN.");

        if (data.checkoutRequestID) {
          checkPayment(data.checkoutRequestID);
        }
      } else {
        alert(data.message || "Payment failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  });
}

async function checkPayment(id) {
  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${API_URL}/api/mpesa/status/${id}`);
      const data = await res.json();

      if (data.status === "SUCCESS") {
        clearInterval(interval);
        alert("Recharge successful!");
        window.location.href = "profile.html";
      }

      if (data.status === "FAILED") {
        clearInterval(interval);
        alert("Payment failed.");
      }
    } catch (err) {
      console.error(err);
    }
  }, 5000);
}
