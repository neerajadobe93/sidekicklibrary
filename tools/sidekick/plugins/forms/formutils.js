export function registerContentContainerEvents(contentContainer) {
  const formBuilderView = contentContainer.querySelector("formbuilder-renderer");
  const formPreviewView = contentContainer.querySelector("formpreview-renderer");
  const formExcelView = contentContainer.querySelector("formexcel-renderer");
  const propsModal = contentContainer.querySelector(".propsmodal");

  const builderView = contentContainer.querySelector(
    'sp-action-button[value="builder"]'
  );
  builderView?.addEventListener("click", () => {
    formBuilderView.style.display = "block";
    formPreviewView.style.display = "none";
    formExcelView.style.display = "none";
  });

  const previewView = contentContainer.querySelector(
    'sp-action-button[value="preview"]'
  );
  previewView?.addEventListener("click", () => {
    formBuilderView.style.display = "none";
    formPreviewView.style.display = "block";
    formExcelView.style.display = "none";
  });

  const excelView = contentContainer.querySelector(
    'sp-action-button[value="exceltable"]'
  );
  excelView?.addEventListener("click", () => {
    formBuilderView.style.display = "none";
    formPreviewView.style.display = "none";
    formExcelView.style.display = "block";
  });


  const propsModalCloseButton = propsModal.querySelector(".modal-content span.close");
  propsModalCloseButton.addEventListener("click", ()=> {
    propsModal.classList.toggle("open");
  })
}


