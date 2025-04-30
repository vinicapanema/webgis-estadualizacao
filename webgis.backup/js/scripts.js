// Inicializa o mapa
const map = L.map("map").setView([-22.5, -48.5], 7);

// Base OSM
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

const geoServerBase = "http://3.131.82.224:8080/geoserver/fad";

// ============ Grupos temáticos ============
const estadualizacao = {
  "Trechos de Favorabilidade": L.layerGroup(),
  "Indicador Multicritério": L.tileLayer.wms(`${geoServerBase}/wms`, {
    layers: "fad:indicador_fav_multicriterio_geografico_1",
    format: "image/png",
    transparent: true
  }),
  "Socioeconômico": L.tileLayer.wms(`${geoServerBase}/wms`, {
    layers: "fad:indicador_favorabilidade_socioeconomica",
    format: "image/png",
    transparent: true
  }),
  "Sensibilidade": L.tileLayer.wms(`${geoServerBase}/wms`, {
    layers: "fad:sensibilidade_indicador_favorabilidade_multicriterio_geografico_1",
    format: "image/png",
    transparent: true
  })
};

const infraestrutura = {
  "Malha DER 2024": L.layerGroup()
};

const limites = {
  "Limite Coordenadoras Regionais": L.layerGroup()
};

const camadasTematicas = {
  "Bases Administrativas": {
    "Brasil – Unidades da Federação": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:BrasilUF", format: "image/png", transparent: true }),
    "Limite Estadual": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:LimiteEstadual", format: "image/png", transparent: true }),
    "Limite de Sub-bacias Hidrográficas": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:LimiteSubBacias2013", format: "image/png", transparent: true }),
    "Sedes Municipais": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:SedesMunicipais", format: "image/png", transparent: true })
  },
  "Áreas Protegidas": {
    "Reserva da SMA 07/2017": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:RES_SMA07_2017", format: "image/png", transparent: true }),
    "UCs de Proteção Integral (SIGAM)": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:SIGAM_Areas_Protegidas_PI_DG_UCs_Protecao_Integral", format: "image/png", transparent: true }),
    "UCs de Uso Sustentável (SIGAM)": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel", format: "image/png", transparent: true }),
    "Áreas APAM-LC": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel_APAMLC", format: "image/png", transparent: true }),
    "Áreas APAM-LN": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel_APAMLN", format: "image/png", transparent: true })
  },
  "Sensibilidade Ambiental": {
    "Risco de Fogo (INPE)": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:RISCO_FOGO_ATUALIZADO_INPE", format: "image/png", transparent: true }),
    "Sítios Arqueológicos": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:SitiosArqueologicos", format: "image/png", transparent: true }),
    "Terras Indígenas": L.tileLayer.wms(`${geoServerBase}/wms`, { layers: "fad:TERRASINDIGENAS", format: "image/png", transparent: true })
  }
};

// ============ Carregamento Assíncrono ============
async function carregarCamadas() {
  try {
    // Carrega camadas GeoJSON
    const [trechosData, malhaData, limitesData] = await Promise.all([
      fetch(`${geoServerBase}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fad:Favorabilidade_media_normalizada_trechos_geografico&outputFormat=application/json`).then(res => res.json()),
      fetch(`${geoServerBase}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fad:Malha_DER_2024_geografico&outputFormat=application/json`).then(res => res.json()),
      fetch(`${geoServerBase}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fad:Limite_regionais_geografico&outputFormat=application/json`).then(res => res.json())
    ]);

    // Adiciona camadas GeoJSON aos grupos
    L.geoJSON(trechosData, {
      style: { color: "#1f78b4", weight: 2 },
      onEachFeature: (feature, layer) => {
        const popup = Object.entries(feature.properties).map(([key, val]) => `${key}: ${val}`).join("<br>");
        layer.bindPopup(`<strong>Atributos:</strong><br>${popup}`);
      }
    }).addTo(estadualizacao["Trechos de Favorabilidade"]);

    L.geoJSON(malhaData, {
      style: { color: "#e31a1c", weight: 2 },
      onEachFeature: (feature, layer) => {
        const popup = Object.entries(feature.properties).map(([key, val]) => `${key}: ${val}`).join("<br>");
        layer.bindPopup(`<strong>Atributos:</strong><br>${popup}`);
      }
    }).addTo(infraestrutura["Malha DER 2024"]);

    L.geoJSON(limitesData, {
      style: { color: "#33a02c", weight: 2 },
      onEachFeature: (feature, layer) => {
        const popup = Object.entries(feature.properties).map(([key, val]) => `${key}: ${val}`).join("<br>");
        layer.bindPopup(`<strong>Atributos:</strong><br>${popup}`);
      }
    }).addTo(limites["Limite Coordenadoras Regionais"]);

    // Adiciona camadas WMS ao mapa
    Object.values(camadasTematicas).forEach(grupo => 
      Object.values(grupo).forEach(layer => layer.addTo(map))
    );

    // Cria controle de camadas
    const gruposVisiveis = {};
    Object.entries({
      "Estadualização": estadualizacao,
      "Infraestrutura": infraestrutura,
      "Limites e Fronteiras": limites,
      ...camadasTematicas
    }).forEach(([grupo, camadas]) => {
      gruposVisiveis[grupo] = {};
      Object.entries(camadas).forEach(([nome, layer]) => {
        if (layer.addTo) gruposVisiveis[grupo][nome] = layer;
      });
    });

    L.control.layers(null, gruposVisiveis, { collapsed: false }).addTo(map);

    // Adiciona botões de grupo
    setTimeout(() => {
      Object.keys(gruposVisiveis).forEach(grupo => adicionarBotaoGrupo(grupo));
    }, 300);

  } catch (err) {
    console.error("Erro crítico:", err);
  }
}

// Função para botões de grupo
function adicionarBotaoGrupo(grupoNome) {
  const container = L.DomUtil.create('div', 'leaflet-control-layers-group-toggle');
  container.innerHTML = `
    <button onclick="ativarGrupo('${grupoNome}')">🟢 Ativar ${grupoNome}</button>
    <button onclick="desativarGrupo('${grupoNome}')">⚪ Desligar</button>
  `;
  document.querySelector(".leaflet-control-layers-expanded")?.prepend(container);
}

window.ativarGrupo = (nome) => {
  const grupo = gruposVisiveis[nome];
  Object.values(grupo).forEach(layer => layer && !map.hasLayer(layer) && map.addLayer(layer));
};

window.desativarGrupo = (nome) => {
  const grupo = gruposVisiveis[nome];
  Object.values(grupo).forEach(layer => layer && map.hasLayer(layer) && map.removeLayer(layer));
};

// Inicia o carregamento
carregarCamadas();