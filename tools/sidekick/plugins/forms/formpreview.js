export function preview() {
  const client = {};

  async function customFetch(originalFetch, url, data) {
    if (!url.includes("myform.json")) {
      // If the url is not the one we expect, use the original fetch
      return originalFetch(url);
    }
    return {
      json: async () => ({ data }), // Replacing {} with the actual data
    };
  }

  client.createForm = async function (data, sitepage = null) {
    const formblock = await import(`/blocks/form/form.js`);
    const blockData = document.createElement("div");
    blockData.innerHTML = ` <a href="https://example.com/myform.json">Download Form</a>`;

    const originalFetch = window.fetch;

    window.fetch = (url) => customFetch(originalFetch, url, data); // Pass 'data' to customFetch
    // update the form block with the data
    await formblock.default(blockData);

    const iframe = document.createElement("iframe");
    iframe.classList.add("preview-iframe");
    iframe.src = sitepage === null ? "/tools/sidekick/blocks/form" : sitepage;

    const loadFormIntoIframe = () => {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const iframeHeader = iframeDocument.querySelector("header");
      const iframeFooter = iframeDocument.querySelector("footer");

      if (iframeHeader) {
        iframeHeader.style.display = "none";
      }

      if (iframeFooter) {
        iframeFooter.style.display = "none";
      }

      const formElement = iframeDocument.querySelector("form");
      if (formElement) {
        formElement.innerHTML = blockData.querySelector("form").innerHTML;
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
