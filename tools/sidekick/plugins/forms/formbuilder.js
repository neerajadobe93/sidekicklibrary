export function formBuilderClient(
  contentContainer,
  canvasContainer,
  componentUtils
) {
  const client = {};
  client.componentListJson = [];
  client.sitepageurl = null;
  async function initializeComponentList() {
    const urlParams = new URLSearchParams(window.location.search);

    // Retrieve the value of the 'name' parameter
    const formjsonURL = urlParams.get("formjson");
    if (formjsonURL !== null) {
      const pageurl = urlParams.get("pageurl");
      client.sitepageurl = pageurl;
      const res = await fetch(formjsonURL);
      const resJson = await res.json();
      const formdata = resJson.data;
      formdata.forEach( formElement => {
        client.componentListJson.push(formElement);
      })
   
      client.updateComponentList();
    }
  }

  initializeComponentList();

  client.componentUtils = componentUtils;
  const dropzone = contentContainer.querySelector(".dropzone");
  const propsModal = contentContainer.querySelector(".propsmodal");

  client.addComponent = function (componentJson) {
    client.componentListJson.push(componentJson);
    client.updateComponentList();
  };

  client.removeComponent = function (componentJson) {
    client.componentListJson = client.componentListJson.filter(
      (component) => component.Id !== componentJson.Id
    );
    client.updateComponentList();
  };

  dropzone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", (event) => {
    event.preventDefault();
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    // dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("drag-over");
    const componentType = event.dataTransfer.getData("text");
    const componentJson = componentUtils.getComponentJson(componentType);
    client.addComponent(componentJson);
    client.updateComponentList(true);
  });

  client.renderPropsModal = function (componentId) {
    const selectedComponent = client.componentListJson.find(
      (comp) => comp.Id === componentId
    );
    const propsContainer = document.createElement("div");
    propsContainer.classList.add("props-container");

    let propCompHeader = document.createElement("h1");
    propCompHeader.textContent = "Properties";
    propsContainer.appendChild(propCompHeader);
    propsContainer.style.alignContent = "center";

    let divider = document.createElement("sp-divider");
    propsContainer.appendChild(divider);

    let propComp1 = document.createElement("div");
    // Create the Name input element
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Field Name";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = selectedComponent.Label;
    nameInput.id = "name-input";
    propComp1.appendChild(nameLabel);
    propComp1.appendChild(nameInput);

    propsContainer.appendChild(propComp1);

    nameInput.addEventListener("change", (event) => {
      if (event.target.value.length === 0) {
        event.target.value = "question";
      }
    });

    // Create the Type input element
    let propComp2 = document.createElement("div");

    const placholderLabel = document.createElement("label");
    placholderLabel.setAttribute("for", "type-input");
    placholderLabel.textContent = "Placeholder";

    const placholderInput = document.createElement("input");
    placholderInput.type = "text";
    placholderInput.id = "type-input";
    placholderInput.value = selectedComponent.Placeholder;
    placholderInput.addEventListener("change", (event) => {
      selectedComponent.Placeholder = event.target.value;
      client.updateComponentList();
    });
    propComp2.appendChild(placholderLabel);
    propComp2.appendChild(placholderInput);

    propsContainer.appendChild(propComp2);

    // Create the Label input element
    let propComp3 = document.createElement("div");
    const labelLabel = document.createElement("label");
    labelLabel.setAttribute("for", "label-input");
    labelLabel.textContent = "Label:";

    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.id = "label-input";
    labelInput.value = selectedComponent.Label;
    labelInput.addEventListener("change", (event) => {
      selectedComponent.Label = event.target.value;
      client.updateComponentList();
    });

    propComp3.appendChild(labelLabel);
    propComp3.appendChild(labelInput);
    propsContainer.appendChild(propComp3);

    // Create the Label input element
    let propComp4 = document.createElement("div");
    propComp4.classList.add("mandatory-switch");
    let requiredHtml = `
      <label> Required </label>
      <label class="switch">
        <input type="checkbox">
        <span class="slider"></span>
      </label> 
     `;

    propComp4.innerHTML = requiredHtml;

    const mandatoryInput = propComp4.querySelector("input");
    mandatoryInput.addEventListener("change", () => {
      selectedComponent.Mandatory = mandatoryInput.checked;
    });

    propsContainer.appendChild(propComp4);

    propsModal.innerHTML = "";
    propsModal.appendChild(propsContainer);
  };

  client.updateComponentList = function (showAnimation = false) {
    dropzone.innerHTML = "";
    let compId = 1;
    const len = client.componentListJson.length;

    client.componentListJson.forEach((componentJson) => {
      componentJson["Id"] = compId++;
      const listItem = document.createElement("li");
      const component = client.componentUtils.createComponent(componentJson);
      client.componentUtils.registerEvents(
        component,
        propsModal,
        client,
        componentJson,
        canvasContainer
      );

      if (showAnimation && len == compId - 1) {
        component.classList.add("zoomout");
        listItem.appendChild(component);
        dropzone.appendChild(listItem);
        setTimeout(() => {
          component.classList.remove("zoomout");
        }, 1000);
      } else {
        listItem.appendChild(component);
        dropzone.appendChild(listItem);
      }
    });
    if (!dropzone.hasChildNodes()) {
      dropzone.classList.add("empty");
    } else {
      dropzone.classList.remove("empty");
    }
  };

  client.showComponentWizards = function (componentId) {};

  return client;
}
