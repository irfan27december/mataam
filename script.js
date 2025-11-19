// --- Modal Open/Close ---
function openModal() {
  const modal = document.getElementById("appointmentModal");
  if (modal) modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("appointmentModal");
  if (modal) modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("appointmentModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// --- Wait for DOM to load ---
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const people = document.getElementById("people").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !phone || !email) {
      alert("⚠️ Please fill in all required fields before submitting.");
      return;
    }

    // --- Test Mode (no EmailJS) ---
    const TEST_MODE = true; // Change to false when EmailJS is ready

    if (TEST_MODE) {
      alert(
        `✅ Appointment submitted!\n\nFull Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nPeople: ${people}\nMessage: ${message}`
      );
      form.reset();
      closeModal();
      return;
    }

    // --- EmailJS Integration ---
    try {
      (function () {
        emailjs.init("lK8_-Y2lI_z9dd8qU"); // Replace with your public key
      })();

      const templateParams = {
        full_name: fullName,
        phone_number: phone,
        email: email,
        people: people,
        message: message,
      };

      emailjs
        .send("service_z643fai", "template_bbzv2q7", templateParams)
        .then(() => {
          alert("✅ Appointment request sent successfully!");
          form.reset();
          closeModal();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          alert("❌ Failed to send message. Please try again later.");
        });
    } catch (error) {
      console.error("EmailJS Initialization Error:", error);
      alert("⚠️ EmailJS not configured. Running in test mode only.");
    }
  });
});
