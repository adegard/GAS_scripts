//*******************SEND ME AN EMAIL WHEN COMPLETED****************************************
//******************************************************************************************
function emailmethat(mytext,mylink){
  var email = Session.getEffectiveUser().getEmail();
  var row = "";
    row = "<p>" + " file is ready: please <a href='" + mylink + "'>"+mytext+"</a>";
    row +=  "</br></p>";
  if (mylink !== "") {  MailApp.sendEmail(email, "Your file "+mytext+" is ready", "", {htmlBody: row});}
}
