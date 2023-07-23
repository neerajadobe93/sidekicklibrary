export const loadElementProperties = async (properties) => {
  // iterate over properties and for each properties add label and input element

  const propsContainer = document.createElement("div");
  propsContainer.classList.add("props-container");

  const removeButton = document.createElement("button");
  removeButton.classList.add("close-props-container");

  const propCompHeader = document.createElement("h1");
  propCompHeader.textContent = "Properties";
  propsContainer.appendChild(propCompHeader);

  // Create and append the divider
  const divider = document.createElement("sp-divider");
  propsContainer.appendChild(divider);

  properties.forEach((property) => {
    switch (property) {
      case "Mandatory":
        const mandatoryLabel = document.createElement("label");
        mandatoryLabel.textContent = "Mandatory";
        const mandatoryInput = document.createElement("input");
        mandatoryInput.type = "checkbox";
        mandatoryInput.checked = property.value;
        mandatoryInput.addEventListener("change", (event) => {
            property.value = event.target.checked;
        });
        appendElements(propsContainer, mandatoryLabel, mandatoryInput);
        break;
      default:
        const label = document.createElement("label");
        label.textContent = property;
        const input = document.createElement("input");
        input.type = "text";
        input.value = property.value;
        input.addEventListener("change", (event) => {
          property.value = event.target.value;
        });
        appendElements(propsContainer, label, input);
    }
  });
};
