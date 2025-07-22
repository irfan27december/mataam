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
