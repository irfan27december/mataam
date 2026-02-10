let userLat = null;
let userLng = null;

const branches = document.querySelectorAll('.branch-card');



function detectLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      document.getElementById('userStatus').innerText =
        '📍 Location detected';
      calculateDistances();
    },
    () => {
      alert("Location permission denied");
    }
  );
}



navigator.geolocation.getCurrentPosition(
  pos => {
    userLat = pos.coords.latitude;
    userLng = pos.coords.longitude;
    document.getElementById('userStatus').innerText = '📍 Location detected';
    calculateDistances();
  },
  () => {
    document.getElementById('userStatus').innerText = '⚠ Location access denied';
  }
);


function calculateDistances() {
  branches.forEach(branch => {
    const lat = branch.dataset.lat;
    const lng = branch.dataset.lng;

    const distance = getDistance(userLat, userLng, lat, lng);
    branch.querySelector('.distance').innerText =
      `📏 ${distance.toFixed(1)} km away`;

    branch.dataset.distance = distance;
    setOpenStatus(branch);
  });
}

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

function sortByDistance() {
  const grid = document.querySelector('.branches-grid');
  [...branches]
    .sort((a, b) => a.dataset.distance - b.dataset.distance)
    .forEach(card => grid.appendChild(card));
}

function setOpenStatus(branch) {
  const now = new Date().getHours();
  const open = +branch.dataset.open;
  const close = +branch.dataset.close;
  const status = branch.querySelector('.open-status');

  if (now >= open && now < close) {
    status.innerText = '🟢 Open Now';
    status.className = 'open-status open';
  } else {
    status.innerText = '🔴 Closed';
    status.className = 'open-status closed';
  }
}

document.getElementById('branchSearch').addEventListener('input', e => {
  const value = e.target.value.toLowerCase();
  branches.forEach(branch => {
    branch.style.display =
      branch.dataset.name.includes(value) ? 'block' : 'none';
  });
});
