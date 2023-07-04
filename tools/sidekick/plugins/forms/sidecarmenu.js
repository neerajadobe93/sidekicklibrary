export function sidecarmenu(createTag, pageContainer) {
  const sidecar = {};

  const listContainer = pageContainer.querySelector(
    ".sidecarmenu .list-container"
  );

  const sideNav = createTag("sp-sidenav", {
    variant: "multilevel",
    "data-testid": "components",
  });
  listContainer.append(sideNav);

  sidecar.addComponents = function (componentSheetData) {
    componentSheetData.map((component) => {
      const formElement = component.Element;
      const label = formElement;
      const sidenavitem = createTag("sp-sidenav-item", {
        label,
        draggable: true,
      });
      sidenavitem.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", label);
      });
      sideNav.append(sidenavitem);
    });
  };

  return sidecar;
}
