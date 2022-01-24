// const form = document.getElementById("TeamForm")
// form.addEventListener("submit", (e) => {
//     let messages = [];
//     UploadProcessTeam()
//     e.preventDefault()
// })

// const ApplicantForm = document.getElementById("ApplicantForm")
// ApplicantForm.addEventListener("submit", (e) => {
//     let messages = [];
//     UploadProcessApplicant()
//     e.preventDefault()
// })
$(function () {
    $('button').click(function () {
        var team = new FormData($('#TeamRankings')[0]);
        var applicant = new FormData($('#ApplicantRankings')[0]);
        var spots = new FormData($('#Spots')[0]);
        var serverData = [{ "team": team, "applicant": applicant, "spots": spots }]
        $.ajax({
            url: '/',
            data: serverData,
            contentType: "application/json",
            dataType: 'json',
            type: 'POST',
            success: function (response) {
                document.getElementById("ExcelTable").innerHTML = "budsi"
                alert("yay")
                console.log(response);
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
                document.getElementById("ExcelTable").innerHTML = "budsa"
                console.log(xhr.responseText)
                console.log("ahhh")
            }
        });
    });
});

// const RunButton = document.getElementById("runButton")
// RunButton.addEventListener("submit", (e) => {
//     var teamRankingsUpload = document.getElementById("TeamRankings");
//     var applicantRankingsUpload = document.getElementById("ApplicantRankings");
//     var teamSpotsUpload = document.getElementById("Spots")
//     e.preventDefault()
//     var sheetData = ({ "team": teamRankingsUpload, "candidate": applicantRankingsUpload, "spots": teamSpotsUpload }).serialize();
//     $.ajax({
//         url: '/mhealMatch',
//         data: $('SpotsForm').serialize(),
//         // dataType: json, // prevents error
//         type: 'POST',
//         success: function (data) {
//             document.getElementById("ExcelTable").innerHTML = "budsi"
//             alert("success")
//         },
//         error: function (xhr, status, error) {
//             alert(xhr.responseText);
//             document.getElementById("ExcelTable").innerHTML = "budsa"
//         }
//     });
//     document.getElementById("ExcelTable").innerHTML = "e"
// })

// const RunButton = document.getElementById("runButton")
// RunButton.addEventListener("submit", (e) => {
//     var teamRankingsUpload = document.getElementById("TeamRankings");
//     var applicantRankingsUpload = document.getElementById("ApplicantRankings");
//     var teamSpotsUpload = document.getElementById("Spots")
//     e.preventDefault()
//     var sheetData = ({ "team": teamRankingsUpload, "candidate": applicantRankingsUpload, "spots": teamSpotsUpload }).serialize();
//     $.ajax({
//         url: '/mhealMatch',
//         data: $('SpotsForm').serialize(),
//         // dataType: json, // prevents error
//         type: 'POST',
//         success: function (data) {
//             document.getElementById("ExcelTable").innerHTML = "budsi"
//             alert("success")
//         },
//         error: function (xhr, status, error) {
//             alert(xhr.responseText);
//             document.getElementById("ExcelTable").innerHTML = "budsa"
//         }
//     });
//     document.getElementById("ExcelTable").innerHTML = "e"
// })

// $(function () {
//     $('submit').click(function () {
//         var teamRankingsUpload = document.getElementById("TeamRankings");
//         var applicantRankingsUpload = document.getElementById("ApplicantRankings");
//         var teamSpotsUpload = document.getElementById("Spots")
//         $.ajax({
//             url: '/mhealMatch',
//             data: {
//                 team: teamRankingsUpload,
//                 candidate: applicantRankingsUpload,
//                 spots: teamSpotsUpload
//             },
//             type: 'POST',
//             success: function (response) {
//                 document.getElementById("ExcelTable").innerHTML = "budsu"
//                 console.log(response);
//             },
//             error: function (error) {
//                 document.getElementById("ExcelTable").innerHTML = "budsa"
//                 console.log(error);
//             }
//         });
//     });
// });


function UploadProcessTeam() {
    var fileUpload = document.getElementById("TeamRankings");
    //Validate whether File is valid Excel file.
    // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    // if (regex.test(fileUpload.value.toLowerCase())) {
    //     if (typeof (FileReader) != "undefined") {
    //         var reader = new FileReader();

    //         //For Browsers other than IE.
    //         if (reader.readAsBinaryString) {
    //             reader.onload = function (e) {
    //                 GetTableFromTeamExcel(e.target.result);
    //             };
    //             reader.readAsBinaryString(fileUpload.files[0]);
    //         } else {
    //             //For IE Browser.
    //             reader.onload = function (e) {
    //                 var data = "";
    //                 var bytes = new Uint8Array(e.target.result);
    //                 for (var i = 0; i < bytes.byteLength; i++) {
    //                     data += String.fromCharCode(bytes[i]);
    //                 }
    //                 GetTableFromTeamExcel(data);
    //             };
    //             reader.readAsArrayBuffer(fileUpload.files[0]);
    //         }
    //     } else { alert("This browser does not support HTML5."); }
    // }
    // else { alert("Please upload a valid Excel file."); }
};

// function GetTableFromTeamExcel(data) {
//     xlsxToCSV(data);
//     //Read the Excel File data in binary 
//     var workbook = XLSX.read(data, { type: 'binary' });

//     for (var i = 0; i < workbook.SheetNames.length; ++i) {
//         //get the name of First Sheet. 
//         var Sheet = workbook.SheetNames[i];

//         //Read all rows from First Sheet into an JSON array.
//         var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
//         var ExcelTable = document.getElementById("ExcelTable");

//         //Create a HTML Table element. 
//         var myTable = document.createElement("table");
//         myTable.border = "1";

//         //Add the header row. 
//         var row = myTable.insertRow(-1);

//         //Add the header cells. 
//         var headerCell = document.createElement("TH");
//         headerCell.innerHTML = "Email";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "Rank";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "FirstName";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "LastName";
//         row.appendChild(headerCell);

//         //Add the data rows from Excel file. 
//         for (var j = 0; j < excelRows.length; j++) {
//             //Add the data row. 
//             var row = myTable.insertRow(-1);
//             //Add the data cells. 
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].Email;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].Rank;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].FirstName;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].LastName;
//         }
//         var ExcelTable = document.getElementById("ExcelTable");
//         ExcelTable.append("Team: " + workbook.SheetNames[i], myTable);
//     }
// };

function UploadProcessApplicant() {
    var fileUpload = document.getElementById("ApplicantRankings");
    //Validate whether File is valid Excel file.
    // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    // if (regex.test(fileUpload.value.toLowerCase())) {
    //     if (typeof (FileReader) != "undefined") {
    //         var reader = new FileReader();

    //         //For Browsers other than IE.
    //         if (reader.readAsBinaryString) {
    //             reader.onload = function (e) {
    //                 GetTableFromApplicantExcel(e.target.result);
    //             };
    //             reader.readAsBinaryString(fileUpload.files[0]);
    //         } else {
    //             //For IE Browser.
    //             reader.onload = function (e) {
    //                 var data = "";
    //                 var bytes = new Uint8Array(e.target.result);
    //                 for (var i = 0; i < bytes.byteLength; i++) {
    //                     data += String.fromCharCode(bytes[i]);
    //                 }
    //                 GetTableFromApplicantExcel(data);
    //             };
    //             reader.readAsArrayBuffer(fileUpload.files[0]);
    //         }
    //     } else { alert("This browser does not support HTML5."); }
    // }
    // else { alert("Please upload a valid Excel file."); }
};

// function GetTableFromApplicantExcel(data) {
//     //Read the Excel File data in binary 
//     var workbook = XLSX.read(data, { type: 'binary' });

//     //get the name of First Sheet. 
//     for (var i = 0; i < workbook.SheetNames.length; ++i) {
//         var Sheet = workbook.SheetNames[i];

//         //Read all rows from First Sheet into an JSON array.
//         var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
//         var ExcelTable = document.getElementById("ExcelTable2");

//         //Create a HTML Table element. 
//         var myTable = document.createElement("table");
//         myTable.border = 1;

//         //Add the header row. 
//         var row = myTable.insertRow(-1);

//         //Add the header cells. 
//         var headerCell = document.createElement("TH");
//         headerCell.innerHTML = "Email";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "Ranking";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "Team";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "FirstName";
//         row.appendChild(headerCell);

//         headerCell = document.createElement("TH");
//         headerCell.innerHTML = "LastName";
//         row.appendChild(headerCell);

//         //Add the data rows from Excel file. 
//         for (var j = 0; j < excelRows.length; j++) {
//             //Add the data row. 
//             var row = myTable.insertRow(-1);
//             //Add the data cells. 
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].Email;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].Ranking;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].Team;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].FirstName;
//             cell = row.insertCell(-1);
//             cell.innerHTML = excelRows[j].LastName;
//         }
//         var ExcelTable = document.getElementById("ExcelTable2");
//         ExcelTable.append("Applicant: " + workbook.SheetNames[i], myTable);
//     }
// };


function xlsxToCSV(data) {
    var writeStr = "a"
    var rows = []
    //var fs = require("fs");

    //Read the Excel File data in binary 
    var workbook = XLSX.read(data, { type: 'binary' });
    // //get the name of First Sheet. 
    // for (var i = 0; i < workbook.SheetNames.length; ++i) {
    //     var Sheet = workbook.SheetNames[i];

    //     //Read all rows from First Sheet into an JSON array.
    //     var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

    //     for (var r = 0; r < excelRows.length; ++r) {
    //         rows.push(Sheet['data'][r]);
    //     }
    //     for (var j = 0; j < excelRows.length; j++) {
    //         writeStr += excelRows[r].join(",") + "\n";
    //     }
    // }
    //var fileCSV = XLSX.utils.book_to_csv(workbook)
    let worksheet = workbook.SheetNames[workbook.SheetNames[0]]
    //var new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "CSV_Sheet")
    XLSX.writeFile(workbook, "/test.csv")
    document.getElementById("a").innerHTML = writeStr


    //writes to a file, but you will presumably send the csv as a      
    //response instead
    // fs.writeFile(__dirname + "/test.csv", writeStr, function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("test.csv was saved in the current directory!");
    // }); 

}