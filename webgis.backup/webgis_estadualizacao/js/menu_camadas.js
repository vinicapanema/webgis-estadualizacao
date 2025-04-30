const geoServerBase = "http://3.131.82.224:8080/geoserver";

const layerGroups = {
  estadualizacao: {
    "Trechos de Favorabilidade": L.layerGroup(),
    "Indicador Multicritério": wmsLayer("fad:indicador_fav_multicriterio_geografico_1"),
    "Socioeconômico": wmsLayer("fad:indicador_favorabilidade_socioeconomica"),
    "Sensibilidade": wmsLayer("fad:sensibilidade_indicador_favorabilidade_multicriterio_geografico_1")
  },
  infraestrutura: {
    "Malha DER 2024": L.layerGroup()
  },
  camadasTematicas: {
    "Bases Administrativas": {
      "Brasil – Unidades da Federação": wmsLayer("fad:BrasilUF"),
      "Limite Estadual": wmsLayer("fad:LimiteEstadual"),
      "Limite de Sub-bacias Hidrográficas": wmsLayer("fad:LimiteSubBacias2013"),
      "Sedes Municipais": wmsLayer("fad:SedesMunicipais"),
      "Limite Coordenadoras Regionais": L.layerGroup()
    },
    "Áreas Protegidas": {
      "Reserva da SMA 07/2017": wmsLayer("fad:RES_SMA07_2017"),
      "UCs de Proteção Integral (SIGAM)": wmsLayer("fad:SIGAM_Areas_Protegidas_PI_DG_UCs_Protecao_Integral"),
      "UCs de Uso Sustentável (SIGAM)": wmsLayer("fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel"),
      "Áreas APAM-LC": wmsLayer("fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel_APAMLC"),
      "Áreas APAM-LN": wmsLayer("fad:SIGAM_Areas_Protegidas_US_DG_UCs_Uso_Sustentavel_APAMLN")
    },
    "Sensibilidade Ambiental": {
      "Risco de Fogo (INPE)": wmsLayer("fad:RISCO_FOGO_ATUALIZADO_INPE"),
      "Sítios Arqueológicos": wmsLayer("fad:SitiosArqueologicos"),
      "Terras Indígenas": wmsLayer("fad:TERRASINDIGENAS")
    }
  }
};

function montarSidebarTabela() {
  const container = document.getElementById("sidebar-content");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "layer-table";

  const groupsDefinition = [
    { title: "Bases Administrativas", layers: Object.keys(layerGroups.camadasTematicas["Bases Administrativas"]) },
    { title: "Áreas Protegidas", layers: Object.keys(layerGroups.camadasTematicas["Áreas Protegidas"]) },
    { title: "Infraestrutura", layers: Object.keys(layerGroups.infraestrutura) },
    { title: "Sensibilidade Ambiental", layers: Object.keys(layerGroups.camadasTematicas["Sensibilidade Ambiental"]) },
    { title: "Projetos", subgroups: [{ title: "Estadualização", layers: Object.keys(layerGroups.estadualizacao) }] }
  ];

  groupsDefinition.forEach(group => {
    const rowGroup = document.createElement("tr");
    const cellGroup = document.createElement("td");
    cellGroup.className = "layer-group";
    cellGroup.innerHTML = `<span class="toggle-icon">▶</span> ${group.title}`;
    rowGroup.appendChild(cellGroup);
    table.appendChild(rowGroup);

    const groupContent = document.createElement("tbody");
    groupContent.className = "group-content hidden";

    if (group.layers) {
      group.layers.forEach(layerName => {
        const rowLayer = document.createElement("tr");
        const cellLayer = document.createElement("td");
        cellLayer.className = "layer-layer";
        cellLayer.innerHTML = `
          <label>
            <input type="checkbox" data-layer="${layerName}"> ${layerName}
          </label>
        `;
        rowLayer.appendChild(cellLayer);
        groupContent.appendChild(rowLayer);
      });
    }

    if (group.subgroups) {
      group.subgroups.forEach(sub => {
        const rowSubGroup = document.createElement("tr");
        const cellSubGroup = document.createElement("td");
        cellSubGroup.className = "layer-subgroup";
        cellSubGroup.innerHTML = `<b>${sub.title}</b>`;
        rowSubGroup.appendChild(cellSubGroup);
        groupContent.appendChild(rowSubGroup);

        sub.layers.forEach(layerName => {
          const rowSubLayer = document.createElement("tr");
          const cellSubLayer = document.createElement("td");
          cellSubLayer.className = "layer-layer";
          cellSubLayer.innerHTML = `
            <label>
              <input type="checkbox" data-layer="${layerName}"> ${layerName}
            </label>
          `;
          rowSubLayer.appendChild(cellSubLayer);
          groupContent.appendChild(rowSubLayer);
        });
      });
    }

    table.appendChild(groupContent);

    cellGroup.addEventListener("click", () => {
      groupContent.classList.toggle("hidden");
      const icon = cellGroup.querySelector(".toggle-icon");
      icon.textContent = groupContent.classList.contains("hidden") ? "▶" : "▼";
    });
  });

  container.appendChild(table);

  container.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener("change", (e) => {
      const name = e.target.dataset.layer;
      const layer = findLayerByName(name);
      if (e.target.checked) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    });
  });
}

function findLayerByName(name) {
  for (const group of Object.values(layerGroups)) {
    if (group[name]) return group[name];
    if (typeof group === "object") {
      for (const subgroup of Object.values(group)) {
        if (subgroup[name]) return subgroup[name];
      }
    }
  }
  return null;
}
