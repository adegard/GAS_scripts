/*
o.OOoOoo                                                   
 O                                                         
 o                     O                         O         
 ooOO                 oOo                       oOo        
 O       o   O .oOo    o   `OoOo. .oOoO' .oOo    o         
 o        OoO  O       O    o     O   o  O       O         
 O        o o  o       o    O     o   O  o       o         
ooOooOoO O   O `OoO'   `oO  o     `OoO'o `OoO'   `oO       
 
                                             O             
                                            oOo            
.oOo  .oOo. `oOOoOO. `oOOoOO. .oOo. 'OoOo.   o   .oOo      
O     O   o  O  o  o  O  o  o OooO'  o   O   O   `Ooo.     
o     o   O  o  O  O  o  O  O O      O   o   o       O     
`OoO' `OoO'  O  o  o  O  o  o `OoO'  o   O   `oO `OoO'     
                                                           

Version : v1.1
Author: IADe

Releases:									 
2021.03.05 v1.1 Export in gsheet the Comments 
2021.03.05 v1.0 function listComments Extract comments in log

References:
//https://stackoverflow.com/questions/50913184/access-google-docs-comments-from-google-app-scripts
//https://webapps.stackexchange.com/questions/47732/google-apps-script-copy-document-comments



 __
*/
//https://stackoverflow.com/questions/47297128/how-to-specify-request-params-with-drive-comments-list
function getComments(fileId) {
  var options = {
    'maxResults': 99  
  };

  var commnts =  Drive.Comments.list(fileId, options);

  return commnts;
  //Logger.log(cmnts.items.length);
}

//********************************

function clear() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A11:J1000').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('A10').activate();
};

//********************
  
function listComments() {
  //var myfileId =DocumentApp.getActiveDocument().getId()

  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 // var sheet = ss.getActiveSheet();
  var sheet = ss.getSheets()[0];
  var myfileId = ss.getRange('FileId').getValue(); 
  
  //var comments = Drive.Comments.list(myfileId);
  var comments = getComments(myfileId);  
  var mylog="";
 // var context ="";
	var Curl	="";

      
  var timezone = ss.getSpreadsheetTimeZone();
  var today     = new Date();
 // var oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);  
  var ExportTime = today.toISOString();  
 
  ss.getRange('ExportTime').setValue(ExportTime);
  
  //ss.msgBox('n°items :'+comments.items.length);
  
  if (comments.items && comments.items.length > 0) {
    for (var i = 0; i < comments.items.length; i++) {
    //for (var i = 0; i < 200; i++) {		
      var comment = comments.items[i];  
	  

 
      if(typeof comment.context !== 'undefined' ){ 
        var Ccontext=  	comment.context.value.toLocaleString();
        var Ccontent=  	comment.content.toLocaleString()
        var Cstatus			=	comment.status.toLocaleString();
        var CcommentId		=	comment.commentId.toLocaleString();
        var Cauthor			=	comment.author.displayName.toLocaleString();
        var CmodifiedDate		=	comment.modifiedDate.toLocaleString(); 
			Curl				=	"https://docs.google.com/document/d/"+ myfileId +"/edit?disco=" + CcommentId; 
        

        
        sheet.appendRow([(i+1),Ccontext,Cauthor, Ccontent,  Curl, CmodifiedDate, Cstatus,"","",""]);

      }
	  
      if (comment.replies && comment.replies.length > 0 ) {
        for (var j = 0; j < comment.replies.length; j++) {
          
          var reply = comment.replies[j]; 
        
          if ( typeof reply.content !== 'undefined') {
          
		var Rauthor			=	reply.author.displayName.toLocaleString();
		var RmodifiedDate	=	reply.createdDate.toLocaleString();
		
		  /*
		  mylog = mylog +'\n'+ '  -> replies : "' + reply.content.toLocaleString()+ '" (' + reply.author.displayName.toLocaleString()+ ' - ' +
            reply.createdDate.toLocaleString().substring(0,16) +') ' + '\n';
          */
		  
		sheet.appendRow(["","", "", "", "", "", "", reply.content,Rauthor,RmodifiedDate]);  
		  
		  }
        }
      }
      

    }
      //Logger.log(mylog);    
  } else {
    sheet.appendRow(['No comment found.']);
  }
}

//eg. file json output
// to see on https://jsoneditoronline.org/#right=local.sehuwa&left=local.vonoro
//{"anchor":"kix.o2cgryqx15h","context":{"value":"Hanno verificato che effettivamente la concorrenza NON ha impianti multi-solvente funzionanti","type":"text/html"},"fileId":"sZoliQJXs96Kw_tlV5xzpXA","modifiedDate":"2021-01-12T09:15:15.643Z","fileTitle":"MOM PACKAGES_PK - TC, emails etc ","replies":[{"htmlContent":"non ho indagato, me lo ha detto lui","kind":"drive#commentReply","modifiedDate":"2021-01-12T09:15:15.643Z","createdDate":"2021-01-12T09:15:15.643Z","content":"non ho indagato, me lo ha detto lui","replyId":"AAAALSVWvOo","author":{"picture":{"url":"//lh3.googleusercontent.com/a-/AOh14GjhJIZEqJnRP3IRzLanzTmkLuv1B0PNfTbfuXvS=s50-c-k-no"},"isAuthenticatedUser":false,"kind":"drive#user","displayName":"Andrea FORMIGONI"},"deleted":false}],"htmlContent":"hanno chiamato un loro cliente?","createdDate":"2021-01-12T08:35:27.949Z","status":"open","kind":"drive#comment","author":{"kind":"drive#user","isAuthenticatedUser":true,"picture":{"url":"//lh3.googleusercontent.com/a-/AOh14GgLwM8NfERSEGT3q3k7ilirxjUOvg4AGPTOs2GpaA=s50-c-k-no"},"displayName":"Arnaud DEGARDIN"},"content":"hanno chiamato un loro cliente?","commentId":"AAAALSVWvNo","deleted":false}
