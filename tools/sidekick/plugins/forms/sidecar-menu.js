export function sidecarmenu(createTag, pageContainer) {
  const sidecar = {};
  const listContainer = pageContainer.querySelector(".sidecarmenu .list-container");
  const sideNav = createTag("sp-sidenav", {
    variant: "multilevel",
    "data-testid": "components",
  });
  listContainer.appendChild(sideNav);

  sidecar.addComponents = function (componentSheetData) {
    componentSheetData.forEach((component) => {
      const { Element } = component;
      const sidenavitem = createTag("sp-sidenav-item", {
        label: Element,
        draggable: true,
      });
      sidenavitem.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", Element);
      });
      sideNav.appendChild(sidenavitem);
    });
  };

  return sidecar;
}
