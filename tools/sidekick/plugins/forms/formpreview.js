export function preview() {
  const client = {};

  client.createForm = async function (data, sitepage = null) {
    const formblock = await import(`/blocks/form/form.js`);
    const myform = await formblock.createForm(data);

    console.log(myform);
    var iframe = document.createElement("iframe");
    iframe.classList.add("preview-iframe");
    if (sitepage == null) {
      iframe.src = "/tools/sidekick/blocks/form";
    } else {
      iframe.src = sitepage;
    }

    iframe.onload = function () {
      setTimeout(() => {
        var iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        const element = iframeDocument.querySelector("form");
        element.innerHTML = myform.innerHTML;
        console.log(element);
      }, 1000);
    };
    return iframe;
  };

  return client;
}
