/**
 * Called when a user tries to load the plugin
 * @param {HTMLElement} container The container to render the plugin in
 * @param {Object} data The data contained in the plugin sheet
 * @param {String} query If search is active, the current search query
 */

import { componentUtils } from "./components.js";
import { createTag } from "./dom.js";
import {
  renderFrameSplitContainer,
  renderScaffolding,
} from "./formHtmlutils.js";
import { formBuilderClient } from "./formBuilderClient.js";
import { registerContentContainerEvents } from "./formutils.js";
import { sidecarmenu } from "./sidecarmenu.js";

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
  contentContainer.innerHTML = renderFrameSplitContainer();

  registerContentContainerEvents(contentContainer);
  const compUtils = componentUtils();
  const formClient = formBuilderClient(contentContainer, compUtils);
}

export default {
  title: "Forms",
  searchEnabled: true,
};
