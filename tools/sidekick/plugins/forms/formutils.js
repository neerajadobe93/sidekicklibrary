import { createFormPreview } from "./formpreview.js";

export function registerContentContainerEvents(
  contentContainer,
  canvasContainer,
  formbuilderContainer,
  formpreviewContainer,
  formExcelContainer,
  excelUtils,
  formClient
) {

  function showContainer(container) {
    formbuilderContainer.style.display = container === "builder" ? "block" : "none";
    formpreviewContainer.style.display = container === "preview" ? "block" : "none";
    formExcelContainer.style.display = container === "exceltable" ? "block" : "none";
  }

  contentContainer.addEventListener("click", (event) => {
    const targetValue = event.target.getAttribute("value");
    if (targetValue === "builder" || targetValue === "preview" || targetValue === "exceltable") {
      showContainer(targetValue);

      if (targetValue === "preview") {
        const data = formClient.componentListJson;
        formpreviewContainer.innerHTML = "";
        createFormPreview(data, formClient.sitepageurl).then((res) => {
          formpreviewContainer.appendChild(res);
        });
      } else if (targetValue === "exceltable") {
        const table = excelUtils.createExcelTable();
        const excelViewContainer = formExcelContainer.querySelector(".excelview-container");
        excelViewContainer.innerHTML = "";
        excelViewContainer.appendChild(table);
      }
    }
  });

  const copyButton = canvasContainer.querySelector(".action-container sp-button");
  copyButton.addEventListener("click", () => {
    const table = formExcelContainer.querySelector("table");
    if (table) {
      excelUtils.copyToClipBoard(table);
    }
  });
}
