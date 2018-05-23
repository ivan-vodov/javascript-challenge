// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $prevBtn = document.querySelector("#prevButton");
var $nextBtn = document.querySelector("#nextButton");
var $dateInput = document.querySelector("#inputDate");
var $cityInput = document.querySelector("#inputCity");
var $stateInput = document.querySelector("#inputState");
var $shapeInput = document.querySelector("#inputShape");
var $searchBtn = document.querySelector("#filter");
var $resetBtn = document.querySelector("#reset");

//pagination parameter, disable prev button 
var curr_page = 1;
var items_per_page = 50;
$prevBtn.classList.add("disabled");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$resetBtn.addEventListener("click", handleResetButtonClick);
$nextBtn.addEventListener("click", handleNextButtonClick);
$prevBtn.addEventListener("click", handlePrevButtonClick);


// Set filteredData to dataSet initially
var filteredData = dataSet;


// renderTable renders the filteredData to the tbody
function renderTable() {
  pageData = filteredData.slice((curr_page - 1) * items_per_page, curr_page * items_per_page);
  $tbody.innerHTML = "";
  for (var i = 0; i < pageData.length; i++) {
    // Get get the current object and its fields
    var curr_record = pageData[i];
    var fields = Object.keys(curr_record);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    // insert resultset record order number
    var $cell = $row.insertCell(0);
    $cell.innerText = (curr_page-1)*items_per_page+i+1;
    for (var j = 0; j < fields.length; j++) {
      // For every field in the curr_record object, create a new cell at set its inner text to be the current value at the current curr_record's field
      var field = fields[j];
      var $cell = $row.insertCell(j+1);
      $cell.innerText = curr_record[field];
    }
  }
}

// move to next page
function handleNextButtonClick() {
  if (curr_page * items_per_page < filteredData.length) {
    curr_page++;
    renderTable();
  }

  // disabble and enable buttons
  if (curr_page * items_per_page >= filteredData.length) $nextBtn.classList.add("disabled");
  $prevBtn.classList.remove("disabled");
}

// move to prev page
function handlePrevButtonClick() {
  if (curr_page > 1) {
    curr_page--;
    renderTable();
  }

  // disabble and enable buttons
  if (curr_page == 1) $prevBtn.classList.add("disabled");
  $nextBtn.classList.remove("disabled");
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
    var result = (!filterDate || curr_record.datetime == filterDate) &&
      (!filterCity || curr_record.city == filterCity) &&
      (!filterState || curr_record.state == filterState) &&
      (!filterShape || curr_record.shape == filterShape);
    return result;
  });
  // reset page number and update pagination buttons state
  curr_page = 1;
  $prevBtn.classList.add("disabled");
  if (curr_page * items_per_page >= filteredData.length) $nextBtn.classList.add("disabled");
  else $nextBtn.classList.remove("disabled");

  //build table with current page recordset
  renderTable();
}


function handleResetButtonClick() {
  // Empty the search fields
  $dateInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $shapeInput.value = "";
  filteredData = dataSet;
  // reset page number and update pagination buttons state
  cur_page = 1
  $prevBtn.classList.add("disabled");
  if (curr_page * items_per_page >= filteredData.length) $nextBtn.classList.add("disabled");
  else $nextBtn.classList.remove("disabled");

  //build table with current page recordset
  renderTable();
}

// Render the table for the first time on page load
renderTable();
