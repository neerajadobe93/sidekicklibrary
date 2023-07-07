export function excelUtils(container, formclient) {
  const utils = {};
  utils.container = container;
  utils.formclient = formclient;

  utils.createExcelTable = function () {
    var table = document.createElement("table");
    table.classList.add("excel-table");
    //table.style.borderCollapse = "collapse";
    //table.style.width = "100%";

    var thead = document.createElement("thead");
    var theadRow = document.createElement("tr");
    var formFields = formclient.componentListJson;
    //var thStyles = "border: 1px solid black; padding: 8px; text-align: left;";
    var thLabels = ["Name", "Type", "Label", "Placeholder", "Mandatory"];

    thLabels.forEach(function (label) {
      var th = document.createElement("th");
     // th.style = thStyles;
     th.classList.add("excel-header-row");
      th.textContent = label;
      theadRow.appendChild(th);
    });

    thead.appendChild(theadRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    formFields.forEach(function (field) {
      var row = document.createElement("tr");
      for (var prop in field) {
        if (prop != "Id") {
          var cell = document.createElement("td");
          cell.classList.add("excel-cell");
         // cell.style = "border: 1px solid black; padding: 8px;";
          cell.textContent = field[prop];
          row.appendChild(cell);
        }
      }
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
   
  // Add Blank rows for Excel look and feel 
    for (var i = 0; i < 25; i++) {
      var row = table.insertRow(-1); // Insert a new row
    
      // Add 5 cells to the new row
      for (var j = 0; j < 5; j++) {
        var cell = row.insertCell();
        cell.classList.add("extra-excel-cell");
        cell.innerHTML = " "; // Leave the cell content blank
      }
    }


    return table;
  };

  utils.copyToClipBoard = function (table) {
    var tableText = "";

    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        tableText += table.rows[i].cells[j].textContent + "\t";
      }
      tableText += "\n";
    }

    navigator.clipboard
      .writeText(tableText)
      .then(function () {
        utils.container.dispatchEvent(
          new CustomEvent("Toast", {
            detail: { message: "Copied Forms Excel" },
          })
        );
      })
      .catch(function (error) {
        utils.container.dispatchEvent(
          new CustomEvent("Toast", {
            detail: { message: "Unable Copied Block" },
          })
        );
      });
  };

  return utils;
}
