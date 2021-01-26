//******************************OPEN GOOGLE MAP************************************
function checkGGMap() {
  var sheet = SpreadsheetApp.getActiveSheet(); // Get current active sheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var lat= ss.getRange('lat').getValues(); 
  var lon= ss.getRange('lon').getValues();   
  openMap(lat, lon);
}

function openMap(lat, lon) {
  var selection = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
  //https://www.google.com/maps/@45.5344164,9.1996315,8z
  var html = "<script>window.open('https://www.google.com/maps/@" + lat + "," + lon + ",11.25z');google.script.host.close();</script>";
  
  var userInterface = HtmlService.createHtmlOutput(html);
  
  SpreadsheetApp.getUi().showModalDialog(userInterface, 'Open Tab');
}