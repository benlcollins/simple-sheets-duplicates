/**
* add menu to run function from Sheet
*/
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Remove duplicates')
  .addItem('Remove duplicate rows','removeDupRows')
  .addToUi();
}

/**
* remove duplicate rows from Google Sheets data range
*/
function removeDupRows() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Sheet1');
  
  // change the row number of your header row
  var startRow = 7;
  
  // get the data
  var range = sheet.getRange(startRow,1,sheet.getLastRow(),sheet.getLastColumn()).getValues();
  
  // remove duplicates with helper function
  var dedupRange = arrayUnique(range);
  Logger.log(dedupRange);
  
  // check if duplicate sheet exists already, if not create new one
  if (ss.getSheetByName('Sheet1 Duplicates Removed')) { 
    
    // case when dedup sheet already exists
    var dedupSheet = ss.getSheetByName('Sheet1 Duplicates Removed');
    var lastRow = Math.max(dedupSheet.getLastRow(),1);
    var lastColumn = Math.max(dedupSheet.getLastColumn(),1);
    
    // clear out any previous de-duplicate data
    dedupSheet.getRange(1,1,dedupSheet.getLastRow(),dedupSheet.getLastColumn()).clear();
    
    // replace with new de-duplicated data
    dedupSheet.getRange(1,1,dedupRange.length,sheet.getLastColumn()).setValues(dedupRange);
  }
  else {
    
    // case when there is no dedup sheet
    var dedupSheet = ss.insertSheet('Sheet1 Duplicates Removed',0);
    dedupSheet.getRange(1,1,dedupRange.length,dedupRange[0].length).setValues(dedupRange);
  }
  
  // make the de-duplicate sheet the active one
  dedupSheet.activate();
  
}

/** 
* helper function returns unique array
*/
function arrayUnique(arr) {
  
  var tmp = [];
  
  // filter out duplicates
  return arr.filter(function(item, index){
    
    // convert row arrays to strings for comparison
    var stringItem = item.toString(); 
    
    // push string items into temporary arrays
    tmp.push(stringItem);
    
    // only return the first occurrence of the strings
    return tmp.indexOf(stringItem) >= index;
    
  });
}
