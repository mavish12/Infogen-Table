let selection = 0;
let names = ["Rohit", "Joy", "Roshni", "Amar", "Preeti", "Riya"];
console.log(names)
let roles = ["Developer"];
let mainArr = [];
let mainObject = new Object();
console.log(mainObject);
console.log(mainArr);

function createTable() {
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;

  let date1 = new Date(startDate);
  let date2 = new Date(endDate);
  let Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  // Header row with dates
  let namesHead = document.createElement("th");
  namesHead.innerHTML='Team Members';
  let rolesHead = document.createElement("th");
  rolesHead.innerHTML='Roles';
  let headerRow = document.createElement("tr");
  headerRow.appendChild(namesHead);
  headerRow.appendChild(rolesHead);
  for (let i = 0; i <= Difference_In_Days; i++) {
    let cell = document.createElement("th");
    cell.textContent = date1.toLocaleDateString();
    date1.setDate(date1.getDate() + 1);
    headerRow.appendChild(cell);
    mainObject.date = cell.innerHTML;
  }
  thead.appendChild(headerRow);

  // Body rows with names and attendance status
  //for (let name of names)
  for (let i=0; i<names.length; i++){
    let row = document.createElement("tr");
    //row.setAttribute('id', selection)
    let nameCell = document.createElement("td");
    nameCell.setAttribute("id", selection);
    nameCell.textContent = names[i];
    row.appendChild(nameCell);
    //-----------------------------------------------------
    let qq = document.createElement("td");
    qq.setAttribute("id", "qw");
    qq.textContent = roles;
    row.appendChild(qq);
    //-----------------------------------------------------
    for (let i = 0; i <= Difference_In_Days; i++) {
      let cell = document.createElement("td");
      let select = document.createElement("select");

      select.setAttribute("onchange", `updateAttendance('${names}', this)`);
      let optionDummy = document.createElement("option");
      optionDummy.textContent = "Select";
      let optionPresent = document.createElement("option");
      optionPresent.textContent = "Present";
      optionPresent.value = 8;
      let optionAbsent = document.createElement("option");
      optionAbsent.textContent = "Absent";
      optionAbsent.value = 0;
      let optionHalf = document.createElement("option");
      optionHalf.textContent = "Half-day";
      optionHalf.value = 4;
      select.appendChild(optionDummy);
      select.appendChild(optionPresent);
      select.appendChild(optionAbsent);
      select.appendChild(optionHalf);

      cell.appendChild(select);
      row.appendChild(cell);

      mainObject.names = nameCell.innerHTML;
      // mainObject.name.id;
      mainArr.push(mainObject);
      //mainObject.name=
      // mainArr.push()
      //storeData()
    }
    tbody.appendChild(row);
    selection++;
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("table-container").innerHTML = "";
  document.getElementById("table-container").appendChild(table);
}

function updateAttendance(names, select) {
  let attendanceDate = select.parentElement.parentElement.cells[1].textContent;
  console.log(attendanceDate);
  // Save attendance status in the database or in local storage for now
  localStorage.setItem(`${names}_${attendanceDate}`, select.value);
  // console.log  (localStorage);

  var data = localStorage.getItem('value');
  console.log(data)
}
function storeData() {
  let jsonData = JSON.stringify(mainArr);
  console.log(jsonData);
  localStorage.setItem("attend", jsonData);
}

function storeAttendance() {
  const selectElements = document.querySelectorAll("select");
  const attendanceData = {};

  selectElements.forEach((select) => {
    const selectId = select.getAttribute("id");
    const selectValue = select.value;
    const selectName = selectId.split("-")[1];
    const selectDate = selectId.split("-")[2];

    if (!attendanceData[selectName]) {
      attendanceData[selectName] = {};
    }

    attendanceData[selectName][selectDate];
  });
}

// --------------------------------------------------------------------------
