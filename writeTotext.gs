/*
,   . ,-.  , ,---. ,--. 
| . | |  ) |   |   |    
| ) ) |-<  |   |   |-   
|/|/  |  \ |   |   |    
' '   '  ' '   '   `--' 
                        
,---. .   , ,---.       
  |    \ /    |         
  |     X     |         
  |    / \    |         
  '   '   `   '         
                        
                        */
// write text file in gdrive, by gscript (eg. gsheet)
// you can read it aloud by vbs, see https://gist.github.com/adegard/cb7b21c19ed0d65a9233ae5150f8d33c#file-read_file-tts-vbs
// adegard, 2020, v1.0

//https://stackoverflow.com/questions/35865273/how-to-update-google-drive-text-file-via-google-script

function createOrAppendFile() {
  var fileName="test.txt";
  var folderName="test";

  var content = "this is text data to be written in text file";

  // get list of folders with matching name
  var folderList = DriveApp.getFoldersByName(folderName);  
  if (folderList.hasNext()) {
    // found matching folder
    var folder = folderList.next();

    // search for files with matching name
    var fileList = folder.getFilesByName(fileName);

    if (fileList.hasNext()) {
      // found matching file - append text
      var file = fileList.next();
      var combinedContent = file.getBlob().getDataAsString() + content;
      file.setContent(combinedContent);
    }
    else {
      // file not found - create new
      folder.createFile(fileName, content);
    }
  }
}