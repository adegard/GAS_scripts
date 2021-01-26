//*****************************get range Name and put them in new sheet*********************************
//**************CREATE A NEW SHEET AND PUT ALL RANGE NAME OF THE FILE*********************************
function getNameRanges() {
  
  var spreadsheet =  SpreadsheetApp.getActive();
  spreadsheet.insertSheet(2);
  spreadsheet.getActiveSheet().setName('range'); 
  
  var namedRanges = spreadsheet.getNamedRanges();
  // var rangessheet = spreadsheet.getSheet().getNamedRanges();   not working
  spreadsheet.getRange('D1').setValue('TOTAL :'); 
  spreadsheet.getRange('E1').setValue(namedRanges.length );  
  spreadsheet.getRange('D2').setValue('Update Named ranges by setting New name in C-column, then launch function 2.Update ranged Names');  
  
  var row= 0;
  var rangestring="";
  //var mysheetName ="";
  var Anotations = "";
  var myvalue = "";
  spreadsheet.toast('Start!', "Name Range"); 
  
  for (var i = 0; i < namedRanges.length; i++) {
    row =i+1;
    spreadsheet.getRange('A'+row).setValue(namedRanges[i].getName()); 
    Anotations =namedRanges[i].getRange().getSheet().getName()+ "!"+namedRanges[i].getRange().getA1Notation();
    spreadsheet.getRange('B'+row).setValue(Anotations);  
    //myvalue =namedRanges[i].getRange().getValues();
    //spreadsheet.getRange('C'+row).setValue(myvalue);    //slow down extraction process
  }
  
  spreadsheet.getRange('A:C').activate()
  .sort({column: 1, ascending: true});
  
  spreadsheet.toast('Finish!', "Name Range"); 
}