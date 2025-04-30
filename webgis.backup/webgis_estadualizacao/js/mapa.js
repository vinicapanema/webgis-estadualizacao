
const map = L.map("map", {
  center: [-22.5, -48.5],
  zoom: 7,
  attributionControl: false
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

function wmsLayer(name) {
  return L.tileLayer.wms(`${geoServerBase}/wms`, {
    layers: name,
    format: "image/png",
    transparent: true,
    version: "1.1.1"
  });
}

async function carregarGeoJSON(typeName, targetLayer, style) {
  const url = `${geoServerBase}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${encodeURIComponent(typeName)}&outputFormat=application/json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    L.geoJSON(data, { style }).addTo(targetLayer);
  } catch (err) {
    console.error("Erro WFS:", err);
  }
}

const coordEl = document.getElementById("coords");
map.on('mousemove', function(e) {
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  coordEl.textContent = `Lat: ${lat}° Lon: ${lng}°`;
});

const scaleEl = document.getElementById("scale");
map.on('zoomend', function() {
  const zoom = map.getZoom();
  const scale = Math.round(591657550.5 / Math.pow(2, zoom));
  scaleEl.textContent = `Escala 1:${scale.toLocaleString("pt-BR")}`;
});

(function initializeScale() {
  const zoom = map.getZoom();
  const scale = Math.round(591657550.5 / Math.pow(2, zoom));
  scaleEl.textContent = `Escala 1:${scale.toLocaleString("pt-BR")}`;
})();
