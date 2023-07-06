export function excelUtils(container, formclient) {
  const utils = {};
  utils.container = container;
  utils.formclient = formclient;

  utils.createExcelTable = function () {
    var table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var thead = document.createElement("thead");
    var theadRow = document.createElement("tr");
    var formFields = formclient.componentListJson;
    var thStyles = "border: 1px solid black; padding: 8px; text-align: left;";
    var thLabels = ["Name", "Type", "Label", "Mandatory"];

    thLabels.forEach(function (label) {
      var th = document.createElement("th");
      th.style = thStyles;
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
          cell.style = "border: 1px solid black; padding: 8px;";
          cell.textContent = field[prop];
          row.appendChild(cell);
        }
      }
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

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
