export function excelUtils() {
  const utils = {};

  utils.createExcelTable = function () {
    var table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var thead = document.createElement("thead");
    var theadRow = document.createElement("tr");
    var formFields = [
      {
        Name: "yourDetails",
        Type: "plaintext",
        Label: "Your Details",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: "",
        Repeatable: "",
      },
      {
        Name: "yourDetailsFirstName",
        Type: "text",
        Label: "First Name",
        Mandatory: "true",
        Min: "0",
        Max: "200",
        Options: "",
        Repeatable: "",
      },
      {
        Name: "yourDetailsLastName",
        Type: "text",
        Label: "Last Name",
        Mandatory: "true",
        Min: "0",
        Max: "200",
        Options: "",
        Repeatable: "",
      },
      {
        Name: "yourDetailsEmail",
        Type: "email",
        Label: "Email",
        Mandatory: "true",
        Min: "",
        Max: "",
        Options: "",
        Repeatable: "",
      },
      {
        Name: "send",
        Type: "submit",
        Label: "Send",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: "",
        Repeatable: "",
      },
    ];

    var thStyles = "border: 1px solid black; padding: 8px; text-align: left;";
    var thLabels = [
      "Field Name",
      "Type",
      "Label",
      "Mandatory",
      "Min",
      "Max",
      "Options",
      "Repeatable",
    ];

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
        var cell = document.createElement("td");
        cell.style = "border: 1px solid black; padding: 8px;";
        cell.textContent = field[prop];
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
  };

  utils.copyToClipBoard = function (table) {
    var tableText = '';

    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        tableText += table.rows[i].cells[j].textContent + '\t';
      }
      tableText += '\n';
    }
  
    navigator.clipboard.writeText(tableText).then(function() {
      alert("Table copied to clipboard!");
    }).catch(function(error) {
      console.error("Unable to copy table: ", error);
    });
  };

  return utils;
}
