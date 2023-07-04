export function componentUtils() {
  const componentUtils = {};

  componentUtils.createComponent = function (type) {
    const componentWrapper = document.createElement("div");
    componentWrapper.classList.add("component-wrapper");
    const compWizard = createComponentWizards();
    const inputComponent = getInputComponent(type);
    componentWrapper.appendChild(compWizard);
    componentWrapper.appendChild(inputComponent);
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
    containerDiv.classList.add("selectedControls", "bottom");

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
    let component;
    switch (type) {
      case "Text":
        component = createInputComponent("text");
        break;
      case "Button":
        component = createInputComponent("button");
        component.textContent = "Button";
        break;
      case "Textarea":
        component = createInputComponent("textarea");
        break;
      // Add cases for other input types as needed
      default:
        component = createInputComponent("text");
        break;
    }
    component.classList.add("dropped-component");

    return component;
  }


  function createInputComponent(inputType) {
    const input = document.createElement("input");
    input.type = inputType;
    return input;
  }

  return componentUtils;
}
