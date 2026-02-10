// common.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Mataam Al Mandi website loaded.");

  // Highlight active link dynamically if needed
  const links = document.querySelectorAll(".main-nav a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {

  // Load Header
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      const header = document.getElementById("header-placeholder");
      if (header) header.innerHTML = data;
    });

});



document.addEventListener("DOMContentLoaded", () => {

  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    document.querySelectorAll(".branch-card").forEach(card => {
      const lat = parseFloat(card.dataset.lat);
      const lng = parseFloat(card.dataset.lng);

      const distance = getDistance(userLat, userLng, lat, lng);
      card.querySelector(".distance-value").innerText =
        distance.toFixed(1) + " km";
    });
  });

});

// Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

