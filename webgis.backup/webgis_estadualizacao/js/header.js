function adjustLayout() {
  const header = document.querySelector(".header-fad");
  const sidebar = document.querySelector("#sidebar");
  const map = document.querySelector("#map");
  const footer = document.querySelector("footer.rodape-fad");

  const headerHeight = header.offsetHeight;
  const footerHeight = footer.offsetHeight;
  const totalHeight = window.innerHeight;

  // Ajustar posição e tamanho do sidebar
  sidebar.style.height = `${totalHeight - headerHeight - footerHeight}px`;

  // Ajustar mapa para respeitar a largura do painel lateral
  map.style.marginLeft = "300px"; // mesma largura do left-panel
  map.style.top = "0"; // começa do topo
  map.style.height = `${totalHeight - footerHeight}px`;
}

window.addEventListener("resize", adjustLayout);
document.addEventListener("DOMContentLoaded", adjustLayout);
