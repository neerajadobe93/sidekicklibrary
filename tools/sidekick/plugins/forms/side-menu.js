
// write function comments here

/**
 * @param {function} createTag - function to create a tag
 * @param {HTMLElement} listContainer - list container
 * @param {Object} componentSheetData - component sheet data
 * @returns {Object} sidecar
 * @returns {function} sidecar.addComponents - add components
 * @returns {function} sidecar.filterComponents - filter components
 * @returns {HTMLElement} sidecar.data - sidecar data
**/

export function createSideMenu(createTag, listContainer, componentSheetData) {
  const sidecar = {};
  const sideNav = createTag("sp-sidenav", {
    variant: "multilevel",
    "data-testid": "components",
  });
  listContainer.appendChild(sideNav);

  const data = componentSheetData;

  const createSideNavItem = (component) => {
    const { Element } = component;
    const componentIcon = createTag("sp-icon-file-template", {
      slot: "icon",
      size: "s",
    });
    const sidenavitem = createTag(
      "sp-sidenav-item",
      {
        label: Element,
        draggable: true,
      },
      [componentIcon]
    );

    sidenavitem.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", Element);
    });

    return sidenavitem;
  };

  sidecar.addComponents = function () {
    sideNav.innerHTML = "";
    data.forEach((component) => {
      sideNav.appendChild(createSideNavItem(component));
    });
  };

  sidecar.filterComponents = function (filterQuery) {
    filterQuery = filterQuery.toLowerCase();
    sideNav.innerHTML = "";

    const filteredComponents = data.filter(
      (component) => filterQuery === "" || component.Element.toLowerCase().includes(filterQuery)
    );

    filteredComponents.forEach((component) => {
      sideNav.appendChild(createSideNavItem(component));
    });
  };

  return sidecar;
}
