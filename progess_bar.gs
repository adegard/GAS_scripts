
/******************Progess bar function***********************
    ____                                     __              
   / __ \_________  ____ ____  __________   / /_  ____ ______
  / /_/ / ___/ __ \/ __ `/ _ \/ ___/ ___/  / __ \/ __ `/ ___/
 / ____/ /  / /_/ / /_/ /  __(__  |__  )  / /_/ / /_/ / /    
/_/   /_/   \____/\__, /\___/____/____/  /_.___/\__,_/_/     
                 /____/                                      
*/                 
//*****************draw progess bar*****************************
//call eg: myprogessbar((i-12), (row+1-12), 'Progess_Cell')
function myprogessbar(start, stop, CellRange){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //PROGESS BAR LOOP
  var percentProg = parseInt(start/stop*100);
  var progBarSymbols ="";
  for (var s=1; s<11; s++) {   //symbol position
    
  // if (s % 2){ ss.getRange(CellRange).setBackgroundRGB(250, 0, 0);}else{ss.getRange(CellRange).setBackgroundRGB(0, 0, 255);}
               
    if (percentProg/10<s ){ 
      if ((percentProg/10 - parseInt(percentProg/10))*10 +1> s ){  
        progBarSymbols+="»";
      }else{progBarSymbols+="░";  }
    }else{ progBarSymbols+="█"; }   
  }
  
  //setting cell Progess bar
  ss.getRange(CellRange).setValue(progBarSymbols+" ("+percentProg+ " %)");
}
//****************************************************************