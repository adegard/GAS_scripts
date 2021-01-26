function convertPDF(docId) {
  // var doc = DocumentApp.getActiveDocument();
  // var doc = DriveApp.getFileById(docId); //DOESN'T LET TIME TO FLUSH...

  
  // Re-Open a document by ID.
  var doc = DocumentApp.openById(docId);
  //  Browser.msgBox('docId :'+docId);
  
  // var docId = doc.getId();
  var docFolder = DriveApp.getFileById(docId).getParents().next().getId();
  
  //  var ui = DocumentApp.getUi();
  var docblob = doc.getAs('application/pdf');
  
  //  var docblob = DriveApp.getFileById(docId).getAs('application/pdf');
  //  var docblob = DocumentApp.getActiveDocument().getAs('application/pdf');
  /* Add the PDF extension */
  docblob.setName(doc.getName() + ".pdf");
  var file = DriveApp.createFile(docblob);
  
  var fileId = file.getId();
  moveFileId(fileId, docFolder);
  
  showAnchor("Open PDF Folder",'https://drive.google.com/drive/folders/'+docFolder); 
}



function moveFileId(fileId, toFolderId) {
   var file = DriveApp.getFileById(fileId);
   var source_folder = DriveApp.getFileById(fileId).getParents().next();
   var folder = DriveApp.getFolderById(toFolderId)
   folder.addFile(file);
   source_folder.removeFile(file);
}


function showAnchor(name,url) {
  var html = '<html><body><a href="'+url+'" target="blank" onclick="google.script.host.close()">'+name+'</a></body></html>';
  var ui = HtmlService.createHtmlOutput(html)
  SpreadsheetApp.getUi().showModelessDialog(ui,"OPEN FILE:");
}