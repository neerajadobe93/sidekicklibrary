export function formBuilderClient(
  contentContainer,
  canvasContainer,
  componentUtils
) {
  const client = {};
  client.componentListJson = [
    {
      Name: "name",
      Type: "text",
      Label: "Name",
      Placeholder: "Enter your text",
      Mandatory: false,
    },
  ];
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
    const selectedComponent = client.componentListJson.find(comp => comp.Id === componentId);
    const propsContainer = document.createElement("div");
    propsContainer.classList.add("props-container");

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

    nameInput.addEventListener("change", ( event )=>{
      if (event.target.value.length === 0) {
        event.target.value = "question";
      }
    })

    // Create the Type input element
    let propComp2 = document.createElement("div");

    const placholderLabel = document.createElement("label");
    placholderLabel.setAttribute("for", "type-input");
    placholderLabel.textContent = "Placeholder";

    const placholderInput = document.createElement("input");
    placholderInput.type = "text";
    placholderInput.id = "type-input";
    placholderInput.value = selectedComponent.Placeholder;
    placholderInput.addEventListener("change", (event) =>{
      selectedComponent.Placeholder= event.target.value;
      client.updateComponentList();
    });
    propComp2.appendChild(placholderLabel);
    propComp2.appendChild(placholderInput);

    propsContainer.appendChild(propComp2)

    // Create the Label input element
    let propComp3 = document.createElement("div");
    const labelLabel = document.createElement("label");
    labelLabel.setAttribute("for", "label-input");
    labelLabel.textContent = "Label:";

    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.id = "label-input";
    labelInput.value = selectedComponent.Label;
    labelInput.addEventListener("change", (event) =>{
      selectedComponent.Label= event.target.value;
      client.updateComponentList();
    })


    propComp3.appendChild(labelLabel);
    propComp3.appendChild(labelInput);
    propsContainer.appendChild(propComp3);

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

  return client;
}
