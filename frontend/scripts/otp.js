import { BACKEND_URL } from "../config.js";

const verifyOtpButton = document.getElementById('verify-otp-btn');
const otpInputs = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];

otpInputs.forEach((id, index) => {
  const current = document.getElementById(id);
  const next = otpInputs[index + 1];
  const prev = otpInputs[index - 1];

  current.addEventListener('input', () => {
    if (current.value.length === 1 && next) {
      document.getElementById(next).focus();
    }
  });

  // Optional: Go to previous input on Backspace if current is empty
  current.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && current.value === '' && prev) {
      document.getElementById(prev).focus();
    }
  });
});

const verifyOtp = async function verifyOTP() {

  const otp = document.getElementById("otp1").value +
              document.getElementById("otp2").value +
              document.getElementById("otp3").value +
              document.getElementById("otp4").value +
              document.getElementById("otp5").value +
              document.getElementById("otp6").value;

  const messageDiv = document.getElementById('message');
  messageDiv.style.color = 'green';
  messageDiv.innerText = 'Verifying OTP...';

  try {
    const response = await fetch (`${BACKEND_URL}/api/VerifyOtp`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",        
      },
      credentials: "include",
      body: JSON.stringify({ otp })
    });

    const data = await response.json()

    if (!response.ok) {
      messageDiv.style.color = 'red'; 
      if (data?.errors?.length > 0) {
        messageDiv.innerText = data.errors[0].msg;
      } else {
        messageDiv.innerText = "Something went wrong. Please try again.";
      }
      return;
    }

    // OTP verified successfully
    messageDiv.style.color = 'green';
    messageDiv.innerText = data.message || 'OTP verified successfully!';
    
    setTimeout(() => {
      window.location.href = './about2.html';
    }, 1000);

  } catch (error) {
    console.error('Error:', error);
    messageDiv.style.color = 'red';
    messageDiv.innerText = "Server error. Please try again later.";
  }

};   

verifyOtpButton.addEventListener('click',verifyOtp);