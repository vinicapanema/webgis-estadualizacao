// js/mapa.js
const map = L.map('map').setView([-23.5, -46.6], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Torna acessível globalmente
window.map = map;
