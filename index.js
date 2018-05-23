// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#inputDate");
var $cityInput = document.querySelector("#inputCity");
var $stateInput = document.querySelector("#inputState");
var $shapeInput = document.querySelector("#inputShape");
var $searchBtn = document.querySelector("#filter");
var $resetBtn = document.querySelector("#reset");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$resetBtn.addEventListener("click", handleResetButtonClick);

// Set filteredData to dataSet initially
var filteredData = dataSet;

// renderTable renders the filteredData to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get get the current object and its fields
    var curr_record = filteredData[i];
    var fields = Object.keys(curr_record);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the curr_record object, create a new cell at set its inner text to be the current value at the current curr_record's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = curr_record[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  
  // Set filteredData to an array of all sightings whose datetime matches the filter
  filteredData = dataSet.filter(function (curr_record) {
    // If true, add the record to the filteredData, otherwise don't add it to filteredData
    var result=(!filterDate || curr_record.datetime == filterDate) &&
              (!filterCity || curr_record.city == filterCity)&&
              (!filterState || curr_record.state == filterState)&&
              (!filterShape || curr_record.shape == filterShape);
    return result;
  });
  renderTable();
}


function handleResetButtonClick() {
// Empty the search fields
$dateInput.value.value="";
$cityInput.value="";
$stateInput.value="";
$shapeInput.value="";
filteredData=dataSet;
renderTable();
}

// Render the table for the first time on page load
renderTable();
