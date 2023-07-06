export function componentUtils() {
  const componentUtils = {};

  componentUtils.createComponent = function (componentJson) {
    const componentWrapper = document.createElement("div");
    componentWrapper.id = componentJson.Id;
    componentWrapper.classList.add("component-wrapper");
    const compWizard = createComponentWizards();
    const inputComponent = getInputComponent(componentJson);
    componentWrapper.appendChild(inputComponent);
    componentWrapper.appendChild(compWizard);
    return componentWrapper;
  };

  componentUtils.getComponentJson = function (type) {
    let componentJson = {
      Name: "",
      Type: "",
      Label: "",
      Placeholder: "",
      Mandatory: false,

    };

    switch (type) {
      case "Button":
        componentJson.Type = "button";
        componentJson.Name = "button";
        componentJson.Label = "button";
        break;
      case "Textarea":
        componentJson.Type = "textarea";
        componentJson.Name = "textarea";
        componentJson.Label = "textarea";
        break;
      default:
        componentJson.Type = "text";
        componentJson.Name = "text";
        componentJson.Label = "text";
        break;
    }
    return componentJson;
  };

  componentUtils.registerEvents = function (
    component,
    propsModal,
    client,
    componentJson,
    canvasContainer
  ) {
    const propertiesButton = component.querySelector("button.settings-button");
    propertiesButton.addEventListener("click", () => {
      client.renderPropsModal(componentJson.Id);
      propsModal.classList.toggle("open");
      const canvasSplitter = canvasContainer.querySelector("sp-split-view");
      if (propsModal.classList.contains("open")) {
        for (let pos = 2000; pos > 1000; pos -= 100) {
          canvasSplitter.setAttribute("splitter-pos", pos);
        }
      } else {
        canvasSplitter.setAttribute("splitter-pos", 2000);
      }
    });

    const removeButton = component.querySelector("button.delete-button");
    removeButton.addEventListener("click", () => {
      client.removeComponent(componentJson);
    });
  };

  function createComponentWizards() {
    // Create the container div
    const containerDiv = document.createElement("div");
    containerDiv.id = "compnent_wizard";
    containerDiv.classList.add("selectedControls", "bottom", "compnent_wizard");

    const propertiesButton = document.createElement("button");
    propertiesButton.type = "button";
    propertiesButton.classList.add("settings-button");
    propertiesButton.innerHTML = "&#9881;"; // Gear sign
    containerDiv.appendChild(propertiesButton);

    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("sc-Remove", "btn","delete-button");
    removeButton.setAttribute("aria-label", "Remove");
    removeButton.innerHTML = "&#10005;"; // Cross sign
    containerDiv.appendChild(removeButton);

    return containerDiv;
  }

  function getInputComponent(componentJson) {
    let component = document.createElement("div");
    component.classList.add("input-component");
    switch (componentJson.Type) {
      case "button":
        const buttonInput = document.createElement("input");
        buttonInput.type = "button";
        buttonInput.value = "button";
        buttonInput.disabled = true;
        component.appendChild(buttonInput);
        break;
      case "textarea":
        const textAreaLabel = document.createElement("label");
        textAreaLabel.textContent = componentJson.Label;
        const textAreaInput = document.createElement("input");
        textAreaInput.placeholder = componentJson.Placeholder;
        textAreaInput.disabled = true;
        component.appendChild(textAreaLabel);
        component.appendChild(textAreaInput);
        break;
      default:
        const textInputLabel = document.createElement("label");
        textInputLabel.textContent = componentJson.Label;
        const textInput = document.createElement("input");
        textInput.placeholder = componentJson.Placeholder;
        textInput.disabled = true;
        component.appendChild(textInputLabel);
        component.appendChild(textInput);
        break;
    }

    return component;
  }

  return componentUtils;
}
