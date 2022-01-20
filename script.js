const form = document.getElementById("TeamForm")
form.addEventListener("submit", (e) => {
    let messages = [];
    UploadProcessTeam()
    e.preventDefault()
})

const ApplicantForm = document.getElementById("ApplicantForm")
ApplicantForm.addEventListener("submit", (e) => {
    let messages = [];
    UploadProcessApplicant()
    e.preventDefault()
})

function UploadProcessTeam() {
    var fileUpload = document.getElementById("TeamRankings");
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    GetTableFromTeamExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    GetTableFromTeamExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else { alert("This browser does not support HTML5."); }
    }
    else { alert("Please upload a valid Excel file."); }
};

function GetTableFromTeamExcel(data) {
    //Read the Excel File data in binary 
    var workbook = XLSX.read(data, { type: 'binary' });

    //get the name of First Sheet. 
    var Sheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
    var ExcelTable = document.getElementById("ExcelTable");

    //Create a HTML Table element. 
    var myTable = document.createElement("table");
    myTable.border = "1";

    //Add the header row. 
    var row = myTable.insertRow(-1);

    //Add the header cells. 
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Email";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Rank";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "FirstName";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "LastName";
    row.appendChild(headerCell);

    //Add the data rows from Excel file. 
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row. 
        var row = myTable.insertRow(-1);
        //Add the data cells. 
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Email;
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Rank;
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].FirstName;
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].LastName;
    }
    var ExcelTable = document.getElementById("ExcelTable");
    document.getElementById("ExcelTable").innerHTML = "";
    ExcelTable.appendChild(myTable);
};

function UploadProcessApplicant() {
    var fileUpload = document.getElementById("ApplicantRankings");
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    GetTableFromApplicantExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    GetTableFromApplicantExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else { alert("This browser does not support HTML5."); }
    }
    else { alert("Please upload a valid Excel file."); }
};

function GetTableFromApplicantExcel(data) {
    //Read the Excel File data in binary 
    var workbook = XLSX.read(data, { type: 'binary' });

    //get the name of First Sheet. 
    for (int i = 0; i < SheetNames.size(); ++i) {
        var Sheet = workbook.SheetNames[i];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
        var ExcelTable = document.getElementById("ExcelTable");

        //Create a HTML Table element. 
        var myTable = document.createElement("table");

        //Add the header row. 
        var row = myTable.insertRow(-1);

        //Add the header cells. 
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "Email";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Ranking";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Team";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "FirstName";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "LastName";
        row.appendChild(headerCell);

        //Add the data rows from Excel file. 
        for (var j = 0; j < excelRows.length; j++) {
            //Add the data row. 
            var row = myTable.insertRow(-1);
            //Add the data cells. 
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Email;
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Ranking;
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Team;
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].FirstName;
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].LastName;
        }
        var ExcelTable = document.getElementById("ExcelTable2");
        document.getElementById("ExcelTable2").innerHTML = "";
        ExcelTable.appendChild(myTable);
    }
};