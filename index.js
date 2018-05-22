// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#input");
var $searchBtn = document.querySelector("#filter");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

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
  var filterDate = $dateInput.value.trim().toLowerCase();

  // Set filteredData to an array of all sightings whose datetime matches the filter
  filteredData = dataSet.filter(function(curr_record) {
    var sightingDate = curr_record.datetime;
    // If true, add the record to the filteredData, otherwise don't add it to filteredData
    return sightingDate === filterDate;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
