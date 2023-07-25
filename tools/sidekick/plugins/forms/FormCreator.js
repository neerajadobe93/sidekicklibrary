function setPlaceholder(element, fd) {
  if (fd.Placeholder) {
    element.setAttribute("placeholder", fd.Placeholder);
  }
}

function setNumberConstraints(element, fd) {
  if (fd.Max) {
    element.max = fd.Max;
  }
  if (fd.Min) {
    element.min = fd.Min;
  }
  if (fd.Step) {
    element.step = fd.Step || 1;
  }
}
function createLabel(fd, tagName = "label") {
  const label = document.createElement(tagName);
  label.setAttribute("for", fd.Id);
  label.className = "field-label";
  label.textContent = fd.Label || "";
  if (fd.Tooltip) {
    label.title = fd.Tooltip;
  }
  if (fd.Mandatory && fd.Mandatory.toLowerCase() === "true") {
    const requiredTextSpan = document.createElement("span");
    requiredTextSpan.className = "required-text";
    requiredTextSpan.textContent = "  *";
    label.append(requiredTextSpan);
  }

  return label;
}

function createFieldWrapper(fd, tagName = "div") {
  const fieldWrapper = document.createElement(tagName);
  const nameStyle = fd.Name ? ` form-${fd.Name}` : "";
  const fieldId = `form-${fd.Type}-wrapper${nameStyle}`;
  fieldWrapper.className = fieldId;
  fieldWrapper.dataset.fieldset = fd.Fieldset ? fd.Fieldset : "";
  fieldWrapper.classList.add("field-wrapper");
  fieldWrapper.append(createLabel(fd));
  return fieldWrapper;
}

function createButton(fd) {
  const wrapper = createFieldWrapper(fd);
  const button = document.createElement("button");
  button.textContent = fd.Label;
  button.type = fd.Type;
  button.classList.add("button");
  button.dataset.redirect = fd.Extra || "";
  button.id = fd.Id;
  button.name = fd.Name;
  wrapper.replaceChildren(button);
  return wrapper;
}

function createInput(fd) {
  const input = document.createElement("input");
  input.type = fd.Type;
  setPlaceholder(input, fd);
  setNumberConstraints(input, fd);
  return input;
}

const withFieldWrapper = (element) => (fd) => {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(element(fd));
  return wrapper;
};

const createTextArea = withFieldWrapper((fd) => {
  const input = document.createElement("textarea");
  setPlaceholder(input, fd);
  return input;
});

const createSelect = withFieldWrapper((fd) => {
  const select = document.createElement("select");
  if (fd.Placeholder) {
    const ph = document.createElement("option");
    ph.textContent = fd.Placeholder;
    ph.setAttribute("disabled", "");
    ph.setAttribute("selected", "");
    select.append(ph);
  }
  fd.Options.split(",").forEach((o) => {
    const option = document.createElement("option");
    option.textContent = o.trim();
    option.value = o.trim();
    select.append(option);
  });
  select.selectedIndex = 0;
  return select;
});

function createRadio(fd) {
  const wrapper = createFieldWrapper(fd);
  wrapper.insertAdjacentElement("afterbegin", createInput(fd));
  return wrapper;
}

const createOutput = withFieldWrapper((fd) => {
  const output = document.createElement("output");
  output.name = fd.Name;
  output.dataset.fieldset = fd.Fieldset ? fd.Fieldset : "";
  output.innerText = fd.Value;
  return output;
});

function createHidden(fd) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.id = fd.Id;
  input.name = fd.Name;
  input.value = fd.Value;
  return input;
}

function createFieldSet(fd) {
  const wrapper = createFieldWrapper(fd, "fieldset");
  wrapper.name = fd.Name;
  //   wrapper.replaceChildren(createLegend(fd));
  return wrapper;
}

function groupFieldsByFieldSet(form) {
  const fieldsets = form.querySelectorAll("fieldset");
  fieldsets?.forEach((fieldset) => {
    const fields = form.querySelectorAll(`[data-fieldset="${fieldset.name}"`);
    fields?.forEach((field) => {
      fieldset.append(field);
    });
    if (fieldset.getAttribute("required") !== null) {
      fieldset.append(createErrorText(fieldset));
    }
  });
}

function createPlainText(fd) {
  const paragraph = document.createElement("p");
  const nameStyle = fd.Name ? `form-${fd.Name}` : "";
  paragraph.className = nameStyle;
  paragraph.dataset.fieldset = fd.Fieldset ? fd.Fieldset : "";
  paragraph.textContent = fd.Label;
  return paragraph;
}

const getId = (function getId() {
  const ids = {};
  return (name) => {
    ids[name] = ids[name] || 0;
    const idSuffix = ids[name] ? `-${ids[name]}` : "";
    ids[name] += 1;
    return `${name}${idSuffix}`;
  };
})();

const fieldRenderers = {
  radio: createRadio,
  checkbox: createRadio,
  submit: createButton,
  textarea: createTextArea,
  select: createSelect,
  button: createButton,
  output: createOutput,
  hidden: createHidden,
  fieldset: createFieldSet,
  plaintext: createPlainText,
};

export function renderField(fd) {
  const renderer = fieldRenderers[fd.Type.toLowerCase()];
  let field;
  if (typeof renderer === "function") {
    field = renderer(fd);
  } else {
    field = createFieldWrapper(fd);
    field.append(createInput(fd));
  }
  return field;
}

export function createForm(data) {
  const form = document.createElement("div");
  form.classList.add("form-c");
  data.forEach((fd) => {
    const el = renderField(fd);
    const input = el.querySelector("input,textarea,select");
    if (fd.Type === "submit") {
    }
    if (fd.Mandatory && fd.Mandatory.toLowerCase() === "true") {
      if (input !== null) {
        input.setAttribute("required", "required");
      } else {
        el.setAttribute("required", "required");
      }
    }
    if (input) {
      input.id = fd.Id;
      input.name = fd.Name;
      input.value = fd.Value;
      if (fd.Description) {
        input.setAttribute("aria-describedby", `${fd.Id}-description`);
      }
    }
    form.append(el);
  });
  groupFieldsByFieldSet(form);
  // eslint-disable-next-line prefer-destructuring
  // form.dataset.action = pathname.split(".json")[0];

  return form;
}

export function createFormElement(fd) {
  const el = renderField(fd);
  const input = el.querySelector("input,textarea,select");
  if (fd.Mandatory && fd.Mandatory.toLowerCase() === "true") {
    if (input !== null) {
      input.setAttribute("required", "required");
      el.append(createErrorText(fd));
    } else {
      el.setAttribute("required", "required");
    }
  }
  if (input) {
    input.id = fd.Id;
    input.name = fd.Name;
    input.value = fd.Value || "";
    input.disabled = true;
  }
  return el;
}
