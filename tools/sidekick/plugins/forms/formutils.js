export function registerContentContainerEvents(
  contentContainer,
  canvasContainer,
  formbuilderContainer,
  formpreviewContainer,
  formExcelContainer,
  excelUtils
) {
  
  const builderView = contentContainer.querySelector(
    'sp-action-button[value="builder"]'
  );
  builderView?.addEventListener("click", () => {
    canvasContainer.innerHTML = formbuilderContainer;
    const propsModal = canvasContainer.querySelector(".propsmodal");
    const propsModalCloseButton = propsModal.querySelector(
      ".modal-content span.close"
    );
    propsModalCloseButton.addEventListener("click", () => {
      propsModal.classList.toggle("open");
    });
  });

  const previewView = contentContainer.querySelector(
    'sp-action-button[value="preview"]'
  );
  previewView?.addEventListener("click", () => {
    canvasContainer.innerHTML = formpreviewContainer;
  });

  const excelView = contentContainer.querySelector(
    'sp-action-button[value="exceltable"]'
  );
  excelView?.addEventListener("click", () => {
    const table = excelUtils.createExcelTable();
    canvasContainer.innerHTML = formExcelContainer;
    const excelViewContainer = canvasContainer.querySelector(".excelview-container");
    excelViewContainer.appendChild(table)


    const copyButton = canvasContainer.querySelector(".actions sp-button");
    copyButton.addEventListener("click", () => {
      excelUtils.copyToClipBoard(table);
    })
  });

}
