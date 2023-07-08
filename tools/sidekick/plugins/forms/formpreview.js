export function preview() {
  const client = {};

  client.createForm = async function (data, sitepage = null) {
    const formblock = await import(`/blocks/form/form.js`);
    const myform = await formblock.createForm(data);
    console.log(myform);
  
    const iframe = document.createElement("iframe");
    iframe.classList.add("preview-iframe");
    iframe.src = (sitepage == null) ? "/tools/sidekick/blocks/form" : sitepage;
  
    const loadFormIntoIframe = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const formElement = iframeDocument.querySelector("form");
      if (formElement) {
        formElement.innerHTML = myform.innerHTML;
        console.log(formElement);
      } else {
        setTimeout(loadFormIntoIframe, 100);
      }
    };
  
    iframe.onload = loadFormIntoIframe;  
    return iframe;
  };
  
  return client;
}
