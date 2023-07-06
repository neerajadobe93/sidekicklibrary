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
    console.log(componentId);
    const selectedComponent = client.componentListJson.find(comp => comp.Id === componentId);
    const propsContainer = document.createElement("div");
    propsContainer.classList.add("props-container");

    // Create the Name input element
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = selectedComponent.Label;
    nameInput.id = "name-input";
    propsContainer.appendChild(nameLabel);
    propsContainer.appendChild(nameInput);

    // Create the Type input element
    const typeLabel = document.createElement("label");
    typeLabel.setAttribute("for", "type-input");
    typeLabel.textContent = "Type:";

    const typeInput = document.createElement("input");
    typeInput.type = "text";
    typeInput.id = "type-input";

    propsContainer.appendChild(typeLabel);
    propsContainer.appendChild(typeInput);

    // Create the Label input element
    const labelLabel = document.createElement("label");
    labelLabel.setAttribute("for", "label-input");
    labelLabel.textContent = "Label:";

    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.id = "label-input";

    propsContainer.appendChild(labelLabel);
    propsContainer.appendChild(labelInput);
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
