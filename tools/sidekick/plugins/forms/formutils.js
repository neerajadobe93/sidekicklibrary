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
    formbuilderContainer.style.display = "block";
    formpreviewContainer.style.display = "none";
    formExcelContainer.style.display = "none";
  

    const propsModal = canvasContainer.querySelector(".propsmodal");
    const propsModalCloseButton = propsModal.querySelector(
      ".modal-content span.close"
    );
    propsModalCloseButton.addEventListener("click", () => {
      propsModal.classList.toggle("open");
    });
  });


  // preview button
  const previewView = contentContainer.querySelector(
    'sp-action-button[value="preview"]'
  );
  previewView?.addEventListener("click", () => {
    formbuilderContainer.style.display = "none";
    formpreviewContainer.style.display = "block";
    formExcelContainer.style.display = "none";
  });



  // excel button
  const excelView = contentContainer.querySelector(
    'sp-action-button[value="exceltable"]'
  );
  excelView?.addEventListener("click", () => {
  const table = excelUtils.createExcelTable();
    formbuilderContainer.style.display = "none";
    formpreviewContainer.style.display = "none";
    formExcelContainer.style.display = "block";

    const excelViewContainer = formExcelContainer.querySelector(".excelview-container");
    excelViewContainer.innerHTML = "";
    excelViewContainer.appendChild(table)

    const copyButton = canvasContainer.querySelector(".actions sp-button");
    copyButton.addEventListener("click", () => {
      excelUtils.copyToClipBoard(table);
    })
  });

}