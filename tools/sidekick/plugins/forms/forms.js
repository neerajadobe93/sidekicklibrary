import { createTag } from "./dom.js";
import {
  renderContentDrawerSplitContainer,
  renderFormBuilderContainer,
  renderFormExcelContainer,
  renderFormPreViewContainer,
  renderScaffolding,
} from "./html-templates.js";
import { formBuilderClient } from "./formbuilder.js";
import { registerContentContainerEvents } from "./formutils.js";
import { createSideMenu } from "./side-menu.js";
import { excelview } from "./form-excelview.js";

function createContainers() {
  const formbuilderContainer = createTag(
    "div",
    { class: "form-builder" },
    renderFormBuilderContainer()
  );

  const formpreviewContainer = createTag(
    "div",
    { class: "form-preview" },
    renderFormPreViewContainer()
  );

  const formExcelContainer = createTag(
    "div",
    { class: "form-excel" },
    renderFormExcelContainer()
  );

  return [formbuilderContainer, formpreviewContainer, formExcelContainer];
}

function setupContainers(canvasContainer, containers) {
  const [formbuilderContainer, formpreviewContainer, formExcelContainer] =
    containers;
  canvasContainer.append(
    formbuilderContainer,
    formpreviewContainer,
    formExcelContainer
  );
  formpreviewContainer.style.display = "none";
  formExcelContainer.style.display = "none";
}

export async function decorate(container, data, query) {
  const pageContainer = createTag(
    "div",
    { class: "form-library" },
    renderScaffolding()
  );
  container.append(pageContainer);

  createSideMenu(pageContainer, data);

  const contentContainer = pageContainer.querySelector(".content");
  contentContainer.innerHTML = renderContentDrawerSplitContainer();
  const canvasContainer = contentContainer.querySelector(".canvas-container");

  const containers = createContainers();
  setupContainers(canvasContainer, containers);

  const formClient = formBuilderClient(contentContainer, canvasContainer);
  const excUtils = excelview(container, formClient);

  registerContentContainerEvents(
    contentContainer,
    canvasContainer,
    ...containers,
    excUtils,
    formClient
  );

  container?.addEventListener("click", (event) => {
    const targetElement = event.target;
    const componentWrapper = targetElement.closest(".component-wrapper");
    const selectedId = componentWrapper?.id;
    if (selectedId && selectedId !== formClient.componentListJson.length) {
      const componentList =
        canvasContainer.querySelectorAll(".component-wrapper");
      if (componentList) {
        componentList.forEach((comp) => {
          comp.classList.remove("is-selected");
          if (comp.id === selectedId) {
            comp.classList.add("is-selected");
          }
        });
      }
      formClient.renderPropsModal(selectedId);
    }
  });
}

export default {
  title: "Forms",
  searchEnabled: true,
};
