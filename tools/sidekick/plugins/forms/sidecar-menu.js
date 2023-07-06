export function sidecarmenu(createTag, pageContainer, componentSheetData) {
  const sidecar = {};
  const listContainer = pageContainer.querySelector(
    ".sidecarmenu .list-container"
  );
  const sideNav = createTag("sp-sidenav", {
    variant: "multilevel",
    "data-testid": "components",
  });
  listContainer.appendChild(sideNav);

  sidecar.data = componentSheetData;

  sidecar.addComponents = function () {
    sidecar.data.forEach((component) => {
      const { Element } = component;
      let childElements = [];
      const componentIcon = createTag("sp-icon-file-template", {
        slot: "icon",
        size: "s",
      });
      childElements.push(componentIcon);
      const sidenavitem = createTag(
        "sp-sidenav-item",
        {
          label: Element,
          draggable: true,
        },
        childElements
      );
      sidenavitem.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", Element);
      });

      sideNav.appendChild(sidenavitem);
    });
  };

  sidecar.filterComponents = function (filterQuery) {
    filterQuery = filterQuery.toLowerCase();
    sideNav.innerHTML = "";
    componentSheetData.forEach((component) => {
      const { Element } = component;
      let childElements = [];
      const componentIcon = createTag("sp-icon-file-template", {
        slot: "icon",
        size: "s",
      });
      childElements.push(componentIcon);
      const sidenavitem = createTag(
        "sp-sidenav-item",
        {
          label: Element,
          draggable: true,
        },
        childElements
      );
      sidenavitem.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", Element);
      });
      if (
        filterQuery === null ||
        filterQuery === "" ||
        Element.toLowerCase().includes(filterQuery)
      ) {
        sideNav.appendChild(sidenavitem);
      }
    });
  };

  return sidecar;
}
