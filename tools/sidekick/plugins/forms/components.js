export function componentUtils() {
  const componentUtils = {};

  componentUtils.createComponent = function (type) {
    const componentWrapper = document.createElement("div");
    componentWrapper.classList.add("component-wrapper");
    const compWizard = createComponentWizards();
    const inputComponent = getInputComponent(type);
    componentWrapper.appendChild(inputComponent);
    componentWrapper.appendChild(compWizard);
    return componentWrapper;
  };


  componentUtils.getComponentJson = function ( type ) {
        let componentJson = {};
        switch (type) {
          case "Text":
            componentJson.type="text";
            componentJson.value="text"
            break;
          case "Button":
            componentJson.type="button";
            componentJson.value="button"
            break;
          case "Textarea":
            componentJson.type="textarea";
            componentJson.value="textarea"
            break;
          // Add cases for other input types as needed
          default:
            componentJson.type="text";
            componentJson.value="text"
            break;
        }
        return componentJson;
  }

  componentUtils.registerEvents = function (
    component,
    propsModal,
    componentList,
    updateComponentList
  ) {
    const propertiesButton = component.querySelector("button.settings-button");
    propertiesButton.addEventListener("click", () => {
      propsModal.classList.toggle("open");
    });

    const removeButton = component.querySelector("button.delete-button");
    removeButton.addEventListener("click", () => {
      const index = componentList.indexOf(component);
      if (index !== -1) {
        componentList.splice(index, 1);
        updateComponentList();
      }
    });
  };

  function createComponentWizards() {
    // Create the container div
    const containerDiv = document.createElement("div");
    containerDiv.id = "compnent_wizard";
    containerDiv.classList.add("selectedControls", "bottom","compnent_wizard");

    // Create the line div
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("line", "selectedControlsLine");
    lineDiv.setAttribute("role", "group");
    lineDiv.setAttribute("aria-label", "Selected Field Controls");

    const propertiesButton = document.createElement("button");
    propertiesButton.type = "button";
    propertiesButton.classList.add("settings-button");
    propertiesButton.innerHTML = "&#9881;"; // Gear sign
    lineDiv.appendChild(propertiesButton);

    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("sc-Remove", "btn");
    removeButton.setAttribute("aria-label", "Remove");
    removeButton.innerHTML = "<span>Remove</span>";
    lineDiv.appendChild(removeButton);

    removeButton.classList.add("delete-button");
    removeButton.innerHTML = "&#10005;"; // Cross sign
    // Append the elements to the container div
    containerDiv.appendChild(lineDiv);
    // containerDiv.appendChild(orderButtonsDiv);

    return containerDiv;
  }

  function getInputComponent(type) {
    let component = document.createElement("div");
    component.classList.add("input-component")
    switch (type) {
      case "Button":
        const buttonInput = document.createElement("input");
        buttonInput.type="button"
        buttonInput.value="button";
        buttonInput.disabled = true;
        component.appendChild(buttonInput);
        break;
      case "Textarea":
        const textAreaLabel = document.createElement("label");
        textAreaLabel.textContent = "Enter your question here";
        const textAreaInput = document.createElement("input");
        textAreaInput.placeholder="Enter your text here";
        textAreaInput.disabled = true;
        component.appendChild(textAreaLabel);
        component.appendChild(textAreaInput);
        break;
      default:
        const textInputLabel = document.createElement("label");
        textInputLabel.textContent = "Enter your question here";
        const textInput = document.createElement("input");
        textInput.placeholder = "Enter your text here";
        textInput.disabled = true;
        component.appendChild(textInputLabel);
        component.appendChild(textInput);
        break;
    }

    return component;
  }


  function createInputComponent(inputType) {
    const input = document.createElement("input");
    input.type = inputType;
    return input;
  }

  return componentUtils;
}
