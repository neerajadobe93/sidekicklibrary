/**
 * Renders the scaffolding for the block plugin
 * @returns {String} HTML string
 */
export function renderScaffolding() {
  return /* html */ `
    <sp-split-view primary-size="350" secondary-min="200" dir="ltr" splitter-pos="250" resizable>
    <div class="sidecarmenu">
      <div class="search">  <sp-search></sp-search>   </div>
      <div class="list-container"> </div>
    </div>
    <div class="content"></div>
  </sp-split-view>
    `;
}

function createFormBuilder() {
  return `
     <ul class="formbuilder-list empty dropzone"> 
  
     </ul>
    `;
}

export function renderFrameSplitContainer() {
  const formBuilderHtml = createFormBuilder();
  return /* html */ `
      <sp-split-view
        vertical
        resizable
        primary-size="2600"
        secondary-min="200"
        splitter-pos="250"
      >
        <div class="view">
          <div class="action-bar">
            <sp-action-group compact selects="single" selected="desktop">
              <sp-action-button value="builder">
                  <sp-icon-device-phone slot="icon"></sp-icon-device-phone>
                  Form Builder
              </sp-action-button>
              <sp-action-button value="preview">
                  <sp-icon-device-tablet slot="icon"></sp-icon-device-tablet>
                  Form Preview
              </sp-action-button>
              <sp-action-button value="exceltable">
                  <sp-icon-device-desktop slot="icon"></sp-icon-device-desktop>
                  Excel Table
              </sp-action-button>
            </sp-action-group>
            <sp-divider size="s"></sp-divider>
          </div>
          <div class="formbuilder-view">
            <formbuilder-renderer>
                 ${formBuilderHtml}
            </formbuilder-renderer>
  
            <formpreview-renderer>
                 <div> form preview </div>
            </formpreview-renderer>
  
           <formexcel-renderer>
               <div> form excel </div>
            </formexcel-renderer>
            <div id="propsmodal" class="modal propsmodal">
              <div class="modal-content">
                <span class="close">&times;</span>
                <!-- Add your input blocks and settings content here -->
             </div>
            </div>
          </div>
          
        </div>
       
      </sp-split-view>
    `;
}
