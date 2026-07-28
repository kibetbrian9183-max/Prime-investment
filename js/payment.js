const API_URL = "https://fuliza-backend-xgsm.onrender.com";

// Read amount from URL
const params = new URLSearchParams(window.location.search);
const amount = params.get("amount");

document.getElementById("displayAmount").value =
amount ? `KSh ${Number(amount).toLocaleString()}` : "";

document.getElementById("payBtn").addEventListener("click", async () => {

let phone = document.getElementById("phone").value.trim();

if(phone.startsWith("+254")){
phone = phone.substring(1);
}else if(phone.startsWith("0")){
phone = "254"+phone.substring(1);
}else if(phone.startsWith("7")){
phone = "254"+phone;
}

if(!/^2547\d{8}$/.test(phone)){
alert("Enter a valid Safaricom number.");
return;
}

document.getElementById("status").innerHTML="Sending STK Push...";

try{

const response = await fetch(`${API_URL}/api/mpesa/stkpush`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

phone:phone,
amount:Number(amount)

})

});

const data = await response.json();

if(data.checkoutRequestID){

document.getElementById("status").innerHTML="Check your phone and enter your M-Pesa PIN.";

checkStatus(data.checkoutRequestID);

}else{

alert(data.message || "Payment failed.");

}

}catch(err){

console.log(err);

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
