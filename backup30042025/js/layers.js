// js/layers.js
// Exporta a configuração de grupos, subgrupos e camadas (sem alterar nomes originais).

export const layerConfig = {
    "Bases Administrativas": {
      "Brasil – Unidades da Federação":         { type: "wfs", layer: "fad:BrasilUF" },
      "Limite Estadual":                        { type: "wfs", layer: "fad:LimiteEstadual" },
      "Limite Coordenadorias Gerais Regionais (DER/SP)": { type: "wfs", layer: "fad:Limite_regionais_geografico" },
      "Limite de Sub-bacias Hidrográficas":     { type: "wfs", layer: "fad:LimiteSubBacias2013" },
      "Sedes Municipais SP":                    { type: "wfs", layer: "fad:SedesMunicipais" },
      "Limite Residências de Conserva (DER/SP)":{ type: "wfs", layer: "fad:residencias_conserva_sedes" },
      "Sede Residências de Conserva (DER/SP)":  { type: "wfs", layer: "fad:residencias_conserva_sedes" },
      "Distritos Municipais SP (SMDU)":         { type: "wfs", layer: "fad:DISTRITO_MUNICIPAL_SP_SMDU" }
    },
  
    "Restrição e Proteção Ambiental": {
      "Proteção": {
        "UC Estadual PI":       { type: "wfs", layer: "fad:uc_estadual_pi" },
        "UC Estadual US":       { type: "wfs", layer: "fad:uc_estadual_us" },
        "UC Federal PI":        { type: "wfs", layer: "fad:uc_federal_pi" },
        "UC Federal US":        { type: "wfs", layer: "fad:uc_federal_us" },
        "Sítios Arqueológicos": { type: "wfs", layer: "fad:SitiosArqueologicos" }
      },
      "Restrição": {
        "Terras Indígenas":            { type: "wfs", layer: "fad:TERRASINDIGENAS" },
        "Áreas Quilombolas":           { type: "wfs", layer: "fad:quilombolas" },
        "Restrição CETESB":            { type: "wfs", layer: "fad:AREAS_RESTRICAO_CETESB_POL" },
        "Restrição DAEE":              { type: "wfs", layer: "fad:AREAS_RESTRICAO_DAEE_POL" },
        "Água Subterrânea Jurubatuba": { type: "wfs", layer: "fad:AREA_RESTRICAO_AGUA_SUBTERRANEA_JURUBATUBA" }
      }
    },
  
    "Base Temática": {
      "Inventário Florestal": (function() {
        const o = {};
        for (let i=1; i<=22; i++) {
          const idx = String(i).padStart(2,'0');
          o[`UGRHI${idx}`] = { type: "wfs", layer: `fad:INVENTARIO_FLORESTAL_UGRHI${idx}_IPA_2020_POL` };
        }
        return o;
      })(),
      "Sensibilidade Ambiental": {
        "Erosão (IG 2014)":      { type: "wfs", layer: "fad:VWM_AREA_RISCO_EROSAO_IG_2014_POL" },
        "Escorregamento (IG 2014)": { type: "wfs", layer: "fad:VWM_AREA_RISCO_ESCORREGAMENTO_IG_2014_POL" },
        "Inundação (IG 2014)":   { type: "wfs", layer: "fad:VWM_AREA_RISCO_INUNDACAO_IG_2014_POL" },
        "Solapamento (IG 2014)": { type: "wfs", layer: "fad:VWM_AREA_RISCO_SOLAPAMENTO_IG_2014_POL" },
        "Risco de Fogo (INPE)":  { type: "wms", layer: "fad:RISCO_FOGO_ATUALIZADO_INPE" }
      }
    },
  
    "Infraestrutura": {
      "Malha Rodoviária Estadual (DER/SP 2025)":   { type: "wfs", layer: "fad:Malha_DER_2025_geografico" },
      "Aeródromo (ANAC 2021)":                     { type: "wfs", layer: "fad:AERODROMO_ANAC_2021" },
      "Aeroportos Públicos (ANAC 2021)":           { type: "wfs", layer: "fad:AEROPORTOS_PUBLICOS_ANAC_2021" }
    },
  
    "Projetos": {
      "Estadualização": {
        "Favorabilidade - Malha Rodoviária Municipal": { type: "wfs", layer: "fad:favorabilidade_multicriterio_trechos_vicinais" },
        "Indicador de Favorabilidade Socioeconômica (IFS)": { type: "wms", layer: "fad:indicador_favorabilidade_socioeconomico" },
        "Indicador de Favorabilidade Multicritério (IFM)": { type: "wms", layer: "fad:ifm_raw" },
        "Sensibilidade do IFM":                          { type: "wms", layer: "fad:sensibilidade_indicador_favorabilidade_multicriterio" }
      }
    }
  };
  