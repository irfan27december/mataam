/******************************
 *   EmailJS INITIALIZATION   *
 ******************************/
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("lK8_-Y2lI_z9dd8qU");  
    // 🔹 Replace with your EmailJS PUBLIC KEY if needed
});


/******************************
 *     MODAL HANDLING         *
 ******************************/
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
    if (event.target === modal) closeModal();
};


/**********************************************
 *  APPOINTMENT FORM (HOME PAGE POPUP MODAL)  *
 **********************************************/
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const templateParams = {
            full_name: document.getElementById("fullName").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            people: document.getElementById("people").value,
            message: document.getElementById("message").value,
            branch: "Not Applicable",
            date: "Not Applicable",
            time: "Not Applicable"
        };

        emailjs.send("service_z643fai", "template_bbzv2q7", templateParams)
            .then(() => {
                alert("✅ Appointment request sent successfully!");
                appointmentForm.reset();
                closeModal();
            })
            .catch((error) => {
                console.error("EmailJS Appointment Error:", error);
                alert("❌ Failed to send appointment email. Check EmailJS configuration.");
            });
    });
}


/**********************************************
 *  RESERVATION FORM (reserve-table.html)     *
 **********************************************/
const reserveForm = document.getElementById("reserveForm");

if (reserveForm) {
    reserveForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const params = {
            full_name: document.getElementById("rName").value,
            email: document.getElementById("rEmail").value,
            phone: document.getElementById("rPhone").value,
            branch: document.getElementById("rBranch").value,
            date: document.getElementById("rDate").value,
            time: document.getElementById("rTime").value,
            people: document.getElementById("rPeople").value,
            message: document.getElementById("rMessage").value
        };

        emailjs.send("service_d4quute", "template_namfzzb", params)
            .then(() => {
                window.location.href = "thank-you.html";
            })
            .catch((error) => {
                console.error("EmailJS Reservation Error:", error);
                alert("❌ Unable to send reservation email. Please verify EmailJS settings.");
            });
    });
}

