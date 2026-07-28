// Backend URL
const API_URL = "https://fuliza-backend-xgsm.onrender.com";

// Recharge formconst phoneInput = document.getElementById("phone").value.trim();
const amountInput = document.getElementById("amount").value.trim();

// Format phone number
let phone = phoneInput;

if (phone.startsWith("+254")) {
    phone = phone.slice(1);
} else if (phone.startsWith("0")) {
    phone = "254" + phone.slice(1);
} else if (phone.startsWith("7")) {
    phone = "254" + phone;
}

// Convert amount to plain integer
const amount = Number(
    amountInput
        .replace(/[^0-9]/g, "") // removes KSh, commas, spaces, etc.
);

if (!phone || !amount) {
    alert("Enter a valid phone number and amount.");
    return;
}

const response = await fetch(`${API_URL}/api/mpesa/stkpush`, {
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
