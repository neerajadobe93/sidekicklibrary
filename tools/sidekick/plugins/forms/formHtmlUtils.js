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

export function renderContentDrawerSplitContainer() {
  return `
      <sp-split-view
        vertical
        primary-size="2600"
        secondary-min="200"
        splitter-pos="250"
      >
            <div class="action-bar">
              <sp-action-group compact selects="single" selected="builder">
                <sp-action-button value="builder">
                    <sp-icon-magic-wand slot="icon"></sp-icon-magic-wand>
                    Form Builder
                </sp-action-button>
                <sp-action-button value="preview">
                    <sp-icon-preview slot="icon"></sp-icon-preview>
                    Form Preview
                </sp-action-button>
                <sp-action-button value="exceltable">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                    Excel Table
                </sp-action-button>
              </sp-action-group>
              <sp-divider size="s"></sp-divider>
            </div>


            <div class="canvas-container">
            </div> 
          
      </sp-split-view>
  `;
}

export function renderFormBuilderContainer() {
  return `
  
        <sp-split-view
          horizontal
          resizable
          primary-size="2600"
          secondary-min="300"
          splitter-pos="250"
        >


              <div class="formbuilder-view">
                  <formbuilder-renderer>
                      <ul class="formbuilder-list empty dropzone"> 
            
                      </ul>
                  </formbuilder-renderer>

              </div>


              <div id="propsmodal" class="modal propsmodal">
                  <div class="modal-content">
                    <span class="close">&times;</span>
                    <!-- Add your input blocks and settings content here -->
                  </div>
              </div>
    

        </sp-split-view>

  `;
}

export function renderFormPreViewContainer() {
  return `
  
       <div> form preview container </div>

  `;
}

export function renderFormExcelContainer() {
  return ` <sp-split-view
  vertical
  resizable
  primary-min="800"
  primary-size="2600"
  secondary-min="200"
  splitter-pos="250"
>
      <div class="excelview-container">
      </div>


      <div class="actions">
          <sp-button class="copy-button">Copy</sp-button>
      </div>
</sp-split-view>
`;
}
