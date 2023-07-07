/**
 * Called when a user tries to load the plugin
 * @param {HTMLElement} container The container to render the plugin in
 * @param {Object} data The data contained in the plugin sheet
 * @param {String} query If search is active, the current search query
 */

import { componentUtils } from "./components.js";
import { createTag } from "./dom.js";
import {
  renderContentDrawerSplitContainer,
  renderFormBuilderContainer,
  renderFormExcelContainer,
  renderFormPreViewContainer,
  renderScaffolding,
} from "./formHtmlutils.js";
import { formBuilderClient } from "./formBuilderClient.js";
import { registerContentContainerEvents } from "./formutils.js";
import { sidecarmenu } from "./sidecar-menu.js";
import { excelUtils } from "./excelviewutil.js";
import { preview } from "./formpreview.js";


function nodeParentWithClass(node, className) {
  return node.closest('.' + className);
}

export async function decorate(container, data, query) {
  // container.dispatchEvent(new CustomEvent('ShowLoader'));
  const pageContainer = createTag(
    "div",
    { class: "form-library" },
    renderScaffolding()
  );
  container.append(pageContainer);

  const sidecarMenu = sidecarmenu(createTag, pageContainer ,data );
  sidecarMenu.addComponents();

  const sidecarSearch = pageContainer.querySelector(".sidecarmenu-search sp-search");
  sidecarSearch.addEventListener("input" , (event) =>{
    sidecarMenu.filterComponents(event.target.value);
  })

  // content container

  const contentContainer = pageContainer.querySelector(".content");
  contentContainer.innerHTML = renderContentDrawerSplitContainer();
  const canvasContainer = contentContainer.querySelector(".canvas-container");


  const formbuilderContainer = createTag("div", {class: "form-builder"},renderFormBuilderContainer());
  const formpreviewContainer = createTag("div", {class: "form-preview"},renderFormPreViewContainer());
  const formExcelContainer = createTag("div", {class: "form-excel"},renderFormExcelContainer());

  canvasContainer.appendChild(formbuilderContainer);
  canvasContainer.appendChild(formpreviewContainer);
  canvasContainer.appendChild(formExcelContainer);

  formpreviewContainer.style.display = "none";
  formExcelContainer.style.display = "none";
  const compUtils = componentUtils();

  const formClient = formBuilderClient(contentContainer, canvasContainer, compUtils);
  const excUtils = excelUtils(container, formClient);

  const formPreviewClient =  preview();
  registerContentContainerEvents(contentContainer, canvasContainer, formbuilderContainer, formpreviewContainer, formExcelContainer, excUtils, formPreviewClient, formClient);
  formClient.updateComponentList();


  container?.addEventListener("click", (event) => {
     console.log(nodeParentWithClass(event.target, "component-wrapper"));
  });


}

export default {
  title: "Forms",
  searchEnabled: true,
};
