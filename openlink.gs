/*****************************OPEN LINK in new TAB*******************************
   ____  ____  _______   __   __    _____   ____ __
  / __ \/ __ \/ ____/ | / /  / /   /  _/ | / / //_/
 / / / / /_/ / __/ /  |/ /  / /    / //  |/ / ,<   
/ /_/ / ____/ /___/ /|  /  / /____/ // /|  / /| |  
\____/_/   /_____/_/ |_/  /_____/___/_/ |_/_/ |_|  
                                                   
*/
function openTab(Link) {
  var selection = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
  
  var html = "<script>window.open('" + Link + "');google.script.host.close();</script>";
  
  var userInterface = HtmlService.createHtmlOutput(html);
  
  SpreadsheetApp.getUi().showModalDialog(userInterface, 'Open Tab');
}