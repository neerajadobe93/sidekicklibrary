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

export async function decorate(container, data, query) {
  // container.dispatchEvent(new CustomEvent('ShowLoader'));
  const pageContainer = createTag(
    "div",
    { class: "form-library" },
    renderScaffolding()
  );
  container.append(pageContainer);

  const sidecarMenu = sidecarmenu(createTag, pageContainer);
  sidecarMenu.addComponents(data);

  // content container

  const contentContainer = pageContainer.querySelector(".content");
  contentContainer.innerHTML = renderContentDrawerSplitContainer();
  const canvasContainer = contentContainer.querySelector(".canvas-container");


  const formbuilderContainer = renderFormBuilderContainer();
  const formpreviewContainer = renderFormPreViewContainer();
  const formExcelContainer = renderFormExcelContainer();

  canvasContainer.innerHTML = formbuilderContainer;


  registerContentContainerEvents(contentContainer, canvasContainer, formbuilderContainer, formpreviewContainer, formExcelContainer);
  const compUtils = componentUtils();
  const formClient = formBuilderClient(contentContainer, compUtils);
}

export default {
  title: "Forms",
  searchEnabled: true,
};
