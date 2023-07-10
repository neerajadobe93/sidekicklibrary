export function formBuilderClient(
  contentContainer,
  canvasContainer,
  componentUtils
) {
  const client = {};
  client.componentListJson = [];
  client.sitepageurl = null;
  client.submitJson = {
    Name: "submit",
    Type: "submit",
    Label: "Submit",
    Placeholder: "",
    Mandatory: "",
  };
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
      formdata.forEach((formElement) => {
        client.componentListJson.push(formElement);
      });

      client.updateComponentList();
    }
  }

  initializeComponentList();

  client.componentUtils = componentUtils;
  const dropzone = contentContainer.querySelector(".dropzone");
  const propsModal = contentContainer.querySelector(".propsmodal");

  client.addComponent = function (componentJson) {
    if (client.componentListJson.length == 0) {
      client.componentListJson.push(componentJson);
      client.componentListJson.push(client.submitJson);
    } else {
      const insertIndex = client.componentListJson.length - 1;
      client.componentListJson.splice(insertIndex, 0, componentJson);
    }
    client.updateComponentList(true);
  };

  client.removeComponent = function (componentJson) {
    client.componentListJson = client.componentListJson.filter(
      (component) => component.Id !== componentJson.Id
    );
    if (client.componentListJson.length == 1) {
      client.componentListJson = [];
    }
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
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("drag-over");
    const componentType = event.dataTransfer.getData("text");
    const componentJson = componentUtils.getComponentJson(componentType);
    client.addComponent(componentJson);
  });

  client.renderPropsModal = function (componentId) {
    const selectedComponent = client.componentListJson.find(
      (comp) => comp.Id == componentId
    );

    const propsContainer = document.createElement("div");
    propsContainer.classList.add("props-container");

    // Create and append the header
    const propCompHeader = document.createElement("h1");
    propCompHeader.textContent = "Properties";
    propsContainer.appendChild(propCompHeader);

    // Create and append the divider
    const divider = document.createElement("sp-divider");
    propsContainer.appendChild(divider);

    // Create and append the Name input element
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Field Name";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = selectedComponent.Name;
    nameInput.addEventListener("change", (event) => {
      if (event.target.value.length === 0) {
        event.target.value = "question";
      }
      selectedComponent.Name = event.target.value;
    });
    appendElements(propsContainer, nameLabel, nameInput);

    // Create and append the Placeholder input element
    const placeholderLabel = document.createElement("label");
    placeholderLabel.textContent = "Placeholder";
    const placeholderInput = document.createElement("input");
    placeholderInput.type = "text";
    placeholderInput.value = selectedComponent.Placeholder;
    placeholderInput.addEventListener("change", (event) => {
      selectedComponent.Placeholder = event.target.value;
      client.updateComponentList();
    });
    appendElements(propsContainer, placeholderLabel, placeholderInput);

    // Create and append the Label input element
    const labelLabel = document.createElement("label");
    labelLabel.textContent = "Label:";
    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.value = selectedComponent.Label;
    labelInput.addEventListener("change", (event) => {
      selectedComponent.Label = event.target.value;
      client.updateComponentList();
    });
    appendElements(propsContainer, labelLabel, labelInput);

    // Create and append the Mandatory switch
    const mandatoryLabel = document.createElement("label");
    mandatoryLabel.textContent = "Required";
    const mandatorySwitch = createSwitchInput(selectedComponent);
    mandatorySwitch.addEventListener("change", () => {
      const checkbox = mandatorySwitch.querySelector("input[type='checkbox']");
      selectedComponent.Mandatory = checkbox.checked ? "true" : "false";
    });
    appendElements(propsContainer, mandatoryLabel, mandatorySwitch);

    // Clear and append the propsContainer to the propsModal
    propsModal.innerHTML = "";
    propsModal.appendChild(propsContainer);
  };

  // Helper function to append multiple elements to a container
  function appendElements(container, ...elements) {
    elements.forEach((element) => container.appendChild(element));
  }

  // Helper function to create a switch input element
  function createSwitchInput(selectedComponent) {
    const switchLabel = document.createElement("label");
    switchLabel.classList.add("switch");
    const switchInput = document.createElement("input");
    switchInput.type = "checkbox";
    switchInput.checked = selectedComponent.Mandatory == "true";
    const slider = document.createElement("span");
    slider.classList.add("slider");
    appendElements(switchLabel, switchInput, slider);
    return switchLabel;
  }

  client.updateComponentList = function (showAnimation = false) {
    dropzone.textContent = ""; // Clear the dropzone element

    client.componentListJson.forEach((componentJson, index) => {
      const compId = index + 1;

      const { Name, Id } = componentJson;

      componentJson.Id = compId;
      componentJson.Name =
        Name == null || Name == undefined || Name == ""
          ? "Question-" + compId
          : Name;

      const listItem = document.createElement("li");
      const component = client.componentUtils.createComponent(componentJson);
      if (componentJson.Name !== "submit") {
        client.componentUtils.registerEvents(
          component,
          propsModal,
          client,
          componentJson,
          canvasContainer
        );
      }

      if (showAnimation && index === client.componentListJson.length - 1) {
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

    dropzone.classList.toggle("empty", !dropzone.hasChildNodes());
  };

  client.showComponentWizards = function (componentId) {};

  return client;
}
