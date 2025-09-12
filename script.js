// Initialize EmailJS
(function() {
  emailjs.init("lK8_-Y2lI_z9dd8qU"); // replace with your EmailJS Public Key
})();

// Modal functions
function openModal() {
  document.getElementById("appointmentModal").style.display = "block";
}

function closeModal() {
  document.getElementById("appointmentModal").style.display = "none";
}

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_z643fai", "template_bbzv2q7", this)
      .then(function() {
        alert("Appointment booked successfully! We will contact you soon.");
        closeModal();
        form.reset();
      }, function(error) {
        alert("Failed to send. Please try again. " + JSON.stringify(error));
      });
  });
});
