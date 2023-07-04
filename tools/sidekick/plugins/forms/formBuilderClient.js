export function formBuilderClient(contentContainer, componentUtils) {
  const client = {};
  client.componentListJson = [];
  client.componentList = [];
  client.componentUtils = componentUtils;
  const dropzone = contentContainer.querySelector(".dropzone");
  const propsModal = contentContainer.querySelector(".propsmodal");

  client.addComponent = function (component) {
    client.componentList.push(component);
    this.updateComponentList();
  };

  client.removeComponent = function (component) {
    const index = client.componentList.indexOf(component);
    if (index !== -1) {
      client.componentList.splice(index, 1);
    }
    this.updateComponentList();
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
    const component = componentUtils.createComponent(componentType);
    componentUtils.registerEvents(
      component,
      propsModal,
      client.componentList,
      client.updateComponentList
    );
    client.componentListJson.push(componentUtils.getComponentJson(componentType));
    client.addComponent(component);
    client.updateComponentList();
  });

  client.updateComponentList = function () {
    dropzone.innerHTML = "";
    client.componentList.forEach((component) => {
      const listItem = document.createElement("li");
      listItem.appendChild(component);
      dropzone.appendChild(listItem);
    });
    if (!dropzone.hasChildNodes()) {
      dropzone.classList.add("empty");
    } else {
      dropzone.classList.remove("empty");
    }
  };

  return client;
}
