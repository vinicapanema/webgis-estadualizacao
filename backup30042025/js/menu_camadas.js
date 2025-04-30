// js/menu_camadas.js
import { layerConfig } from './layers.js';

document.addEventListener('DOMContentLoaded', () => {
  const geoServerBase = window.geoServerBase; // Definido em mapa.js
  const map = window.map;
  const sidebarContent = document.getElementById('sidebar-content');

  // Estilos padrão para WFS
  const wfsStyle = {
    color: "#ff0000",
    weight: 2,
    fillColor: "#ffaa00",
    fillOpacity: 0.4
  };

  // Função recursiva para construir grupos/camadas
  const buildMenu = (config, container) => {
    for (const [title, cfg] of Object.entries(config)) {
      if (cfg.layer) {
        // Criar item de camada
        const item = `
          <div class="camada-item">
            <div class="camada-item-header">
              <input type="checkbox" id="${title}">
              <label for="${title}" class="camada-nome">${title}</label>
            </div>
          </div>
        `;
        const temp = document.createElement('div');
        temp.innerHTML = item;
        const layerItem = temp.firstElementChild;

        // Evento para carregar/remover camada
        const checkbox = layerItem.querySelector('input');
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            if (cfg.type === 'wfs') {
              // URL WFS completa
              const wfsUrl = `${geoServerBase}/wfs?service=WFS&request=GetFeature&typename=${cfg.layer}${cfg.urlParams || ''}`;
              
              fetch(wfsUrl)
                .then(r => r.json())
                .then(data => {
                  window._activeLayers[title] = L.geoJSON(data, {
                    style: wfsStyle
                  }).addTo(map);
                });
            } else {
              // URL WMS completa
              window._activeLayers[title] = L.tileLayer.wms(`${geoServerBase}/wms`, {
                layers: cfg.layer,
                transparent: true,
                format: 'image/png',
                ...(cfg.urlParams ? new URLSearchParams(cfg.urlParams) : {})
              }).addTo(map);
            }
          } else {
            if (window._activeLayers[title]) {
              map.removeLayer(window._activeLayers[title]);
              delete window._activeLayers[title];
            }
          }
        });

        container.appendChild(layerItem);
      } else {
        // Criar grupo
        const grupoHTML = `
          <div class="grupo-camadas">
            <div class="grupo-header">
              <span class="toggle-button">+</span>
              <span class="grupo-nome">${title}</span>
              <input type="checkbox" class="grupo-checkbox">
            </div>
            <div class="grupo-body" style="display: none;"></div>
          </div>
        `;
        const grupo = document.createElement('div');
        grupo.innerHTML = grupoHTML;
        const grupoBody = grupo.querySelector('.grupo-body');

        // Construir subitens
        buildMenu(cfg, grupoBody);

        // Eventos de toggle
        grupo.querySelector('.toggle-button').addEventListener('click', () => {
          grupoBody.style.display = grupoBody.style.display === 'none' ? 'block' : 'none';
        });

        container.appendChild(grupo);
      }
    }
  };

  // Inicializar menu
  buildMenu(layerConfig, sidebarContent);
});