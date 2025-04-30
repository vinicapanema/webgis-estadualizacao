// js/mapa.js
window.geoServerBase = 'http://3.131.82.224:8080/geoserver';
window._activeLayers = {}; // Armazenamento global

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar mapa
  window.map = L.map('map', {
    center: [-23.55, -46.63],
    zoom: 7,
    preferCanvas: true
  });

  // Camada base OSM
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(window.map);
});