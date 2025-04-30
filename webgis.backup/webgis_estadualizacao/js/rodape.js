
const dataHoraEl = document.getElementById("dataHora");
const coordEl = document.getElementById("coords");
const scaleEl = document.getElementById("scale");

function atualizaDataHora() {
  dataHoraEl.textContent = "Atualizado em: " + new Date().toLocaleString("pt-BR");
}
setInterval(atualizaDataHora, 60000);
atualizaDataHora();

function updateCoords(e) {
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  coordEl.textContent = `Lat: ${lat}° Lon: ${lng}°`;
}
map.on("mousemove", updateCoords);

function updateScale() {
  const z = map.getZoom();
  const scale = Math.round(591657550.5 / Math.pow(2, z));
  scaleEl.textContent = `Escala 1:${scale.toLocaleString("pt-BR")}`;
}
map.on("zoomend", updateScale);
updateScale();
