import { createTag } from "./dom.js";

export async function createSideMenu(pageContainer, componentSheetData) {
  const sidecar = {};
  const sideNav = createTag("sp-sidenav", {
    variant: "multilevel",
    "data-testid": "components",
  });

  const sidecarSearch = pageContainer.querySelector(".sidecarmenu-search sp-search");
  const listContainer = pageContainer.querySelector(".sidecarmenu .list-container");

  // Cache the created side navigation items for future filtering
  const sideNavItems = componentSheetData.map((component) => {
    const { Element } = component;
    const componentIcon = createTag("sp-icon-file-template", { slot: "icon", size: "s" });
    const sidenavitem = createTag("sp-sidenav-item", {
      label: Element,
      draggable: true,
    }, [componentIcon]);

    sidenavitem.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", Element);
    });

    return sidenavitem;
  });

  // Add all the side navigation items to the side navigation container
  sideNavItems.forEach((item) => sideNav.appendChild(item));

  sidecar.addComponents = function () {
    listContainer.appendChild(sideNav);
  };

  sidecar.filterComponents = function (filterQuery) {
    filterQuery = filterQuery.toLowerCase();

    sideNavItems.forEach((item) => {
      const itemText = item.getAttribute("Label").toLowerCase();
      item.style.display = itemText.includes(filterQuery) ? "block" : "none";
    });
  };

  // Attach the event listener for the search input using event delegation
  sidecarSearch.addEventListener("input", (event) => {
    sidecar.filterComponents(event.target.value);
  });

  sidecar.addComponents();

  return sidecar;
}
