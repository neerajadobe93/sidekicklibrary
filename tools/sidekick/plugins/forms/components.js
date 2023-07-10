export function componentUtils() {
  const componentUtils = {};

  componentUtils.createComponent = function (componentJson) {
    const componentWrapper = document.createElement("div");
    componentWrapper.id = componentJson.Id;
    componentWrapper.classList.add("component-wrapper");
    const compWizard = createComponentWizards();
    const inputComponent = getInputComponent(componentJson);
    componentWrapper.append(inputComponent, compWizard);
    return componentWrapper;
  };

  componentUtils.getComponentJson = function (type) {
    let componentJson = {
      Name: "",
      Type: "",
      Label: "",
      Placeholder: "",
      Mandatory: "false",
    };

    switch (type) {
      case "Button":
        componentJson.Type = "button";
        componentJson.Label = "Button";
        break;
      case "Textarea":
        componentJson.Type = "textarea";
        componentJson.Label = "Question";
        componentJson.Placeholder = "Enter your text here"
        break;
      default:
        componentJson.Type = "text";
        componentJson.Label = "Question";
        componentJson.Placeholder = "Enter your text here"
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
      if (propsModal.classList.contains("open")) {
        componentUtils.openPropsContainer(canvasContainer);
      } else {
        componentUtils.closePropsContainer(canvasContainer);
      }
    });

    const removeButton = component.querySelector("button.delete-button");
    removeButton.addEventListener("click", () => {
      client.removeComponent(componentJson);
    });
  };


  componentUtils.openPropsContainer = function(canvasContainer) {
    const canvasSplitter = canvasContainer.querySelector(".form-builder sp-split-view");
    let pos = 1500;
    const decreasePos = () => {
      canvasSplitter.setAttribute("splitter-pos", pos);
      pos -= 50;
      if (pos > 1100) {
        setTimeout(decreasePos, 80);
      }
    };
    decreasePos();    
  }

  componentUtils.closePropsContainer = function(canvasContainer) {
    const canvasSplitter = canvasContainer.querySelector(".form-builder sp-split-view");
    let pos = parseInt(canvasSplitter.getAttribute("splitter-pos"));
    const increasePos = () => {
      canvasSplitter.setAttribute("splitter-pos", pos);
      pos += 50;
      if (pos <= 1500) {
        setTimeout(increasePos, 80);
      }
    };
    increasePos();
  }

  


  function createComponentWizards() {
    // Create the container div
    const containerDiv = document.createElement("div");
    containerDiv.id = "component-wizard";
    containerDiv.classList.add("selectedControls", "bottom", "component-wizard");

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
        buttonInput.value = componentJson.Label;
        buttonInput.disabled = true;
        component.appendChild(buttonInput);
        break;
      case "submit":
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.value = componentJson.Label;
        submitBtn.name = componentJson.Label;
        submitBtn.textContent = componentJson.Label;
        submitBtn.disabled = true;
        component.appendChild(submitBtn);
        break;
      case "textarea":
        const textAreaLabel = document.createElement("label");
        textAreaLabel.textContent = componentJson.Label;
        const textAreaInput = document.createElement("textarea");
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
