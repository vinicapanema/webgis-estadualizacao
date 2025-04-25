// Inicializa o mapa
const map = L.map("map").setView([-22.5, -48.5], 7);

// Base
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

const geoServerBase = "http://3.131.82.224:8080/geoserver/fad";

// ============ CAMADAS TEMÁTICAS AGRUPADAS ============

const camadasTematicas = {
  "Bases Administrativas": {
    "Brasil – Unidades da Federação": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:BrasilUF",
      format: "image/png",
      transparent: true
    }),
    "Limite Estadual": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:LimiteEstadual",
      format: "image/png",
      transparent: true
    }),
    "Limite de Sub-bacias Hidrográficas": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:LimiteSubBacias2013",
      format: "image/png",
      transparent: true
    }),
    "Sedes Municipais": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:SedesMunicipais",
      format: "image/png",
      transparent: true
    })
  },
  "Áreas Protegidas": {
    "Reserva da SMA 07/2017": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:RES_SMA07_2017",
      format: "image/png",
      transparent: true
    }),
    "UCs de Proteção Integral (SIGAM)": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:SIGAM_Areas_Protegidas_PI_DG_UCs_Protecao_Integral",
      format: "image/png",
      transparent: true
    }),
    "UCs de Uso Sustentável (SIGAM)": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel",
      format: "image/png",
      transparent: true
    }),
    "Áreas APAM-LC (SIGAM – Sustentável)": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel_APAMLC",
      format: "image/png",
      transparent: true
    }),
    "Áreas APAM-LN (SIGAM – Sustentável)": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel_APAMLN",
      format: "image/png",
      transparent: true
    })
  },
  "Sensibilidade Ambiental": {
    "Risco de Fogo (INPE)": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:RISCO_FOGO_ATUALIZADO_INPE",
      format: "image/png",
      transparent: true
    }),
    "Sítios Arqueológicos": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:SitiosArqueologicos",
      format: "image/png",
      transparent: true
    }),
    "Terras Indígenas": L.tileLayer.wms(`${geoServerBase}/wms`, {
      layers: "fad:TERRASINDIGENAS",
      format: "image/png",
      transparent: true
    })
  }
};

// ============ CAMADAS DO PROJETO DE ESTADUALIZAÇÃO ============

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

fetch(`${geoServerBase}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fad:Favorabilidade_media_normalizada_trechos_geografico&outputFormat=application/json`)
  .then(res => res.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      style: { color: "#1f78b4", weight: 2 },
      onEachFeature: function (feature, layer) {
        let popup = "<strong>Atributos:</strong><br>";
        for (let key in feature.properties) {
          popup += `${key}: ${feature.properties[key]}<br>`;
        }
        layer.bindPopup(popup);
      }
    });
    layer.addTo(estadualizacao["Trechos de Favorabilidade"]);
  });

const infraestrutura = {
  "Malha DER 2024": L.layerGroup()
};

fetch(`${geoServerBase}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fad:Malha_DER_2024_geografico&outputFormat=application/json`)
  .then(res => res.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      style: { color: "#e31a1c", weight: 2 },
      onEachFeature: function (feature, layer) {
        let popup = "<strong>Atributos:</strong><br>";
        for (let key in feature.properties) {
          popup += `${key}: ${feature.properties[key]}<br>`;
        }
        layer.bindPopup(popup);
      }
    });
    layer.addTo(infraestrutura["Malha DER 2024"]);
  });

const limites = {
  "Limite Coordenadoras Regionais": L.layerGroup()
};

fetch(`${geoServerBase}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fad:Limite_regionais_geografico&outputFormat=application/json`)
  .then(res => res.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      style: { color: "#33a02c", weight: 2 },
      onEachFeature: function (feature, layer) {
        let popup = "<strong>Atributos:</strong><br>";
        for (let key in feature.properties) {
          popup += `${key}: ${feature.properties[key]}<br>`;
        }
        layer.bindPopup(popup);
      }
    });
    layer.addTo(limites["Limite Coordenadoras Regionais"]);
  });

// ============ ADICIONA CAMADAS AO MAPA ============

Object.values(estadualizacao).forEach(layer => layer && layer.addTo(map));
Object.values(infraestrutura).forEach(layer => layer && layer.addTo(map));
Object.values(limites).forEach(layer => layer && layer.addTo(map));
Object.values(camadasTematicas).forEach(grupo => {
  Object.values(grupo).forEach(layer => layer && layer.addTo(map));
});

// ============ CONTROLE DE CAMADAS COM FILTRO DE CAMADAS VÁLIDAS ============

const gruposVisiveis = {};
Object.entries({
  "Estadualização": estadualizacao,
  "Infraestrutura": infraestrutura,
  "Limites e Fronteiras": limites,
  ...camadasTematicas
}).forEach(([grupo, camadas]) => {
  gruposVisiveis[grupo] = {};
  Object.entries(camadas).forEach(([nome, layer]) => {
    if (layer && typeof layer.addTo === "function") {
      gruposVisiveis[grupo][nome] = layer;
    }
  });
});

L.control.layers(null, gruposVisiveis, { collapsed: false }).addTo(map);

// ============ BOTÕES ATIVAR/DESATIVAR POR GRUPO ============

function adicionarBotaoGrupo(grupoNome) {
  const container = L.DomUtil.create('div', 'leaflet-control-layers-group-toggle');
  container.innerHTML = `<button onclick="ativarGrupo('${grupoNome}')">🟢 Ativar ${grupoNome}</button> <button onclick="desativarGrupo('${grupoNome}')">⚪ Desligar</button>`;
  document.querySelector(".leaflet-control-layers").prepend(container);

  window['ativarGrupo'] = (nome) => {
    const grupo = gruposVisiveis[nome];
    Object.values(grupo).forEach(layer => {
      if (layer && !map.hasLayer(layer)) map.addLayer(layer);
    });
  };

  window['desativarGrupo'] = (nome) => {
    const grupo = gruposVisiveis[nome];
    Object.values(grupo).forEach(layer => {
      if (layer && map.hasLayer(layer)) map.removeLayer(layer);
    });
  };
}

Object.keys(gruposVisiveis).forEach(grupo => {
  adicionarBotaoGrupo(grupo);
});