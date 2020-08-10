xoArray=[[-3,-3,-3],[-3,-3,-3],[-3,-3,-3]];

line_1=["box-1","box-2","box-3"];
line_2=["box-4","box-5","box-6"];
line_3=["box-7","box-8","box-9"];
divArray=[line_1,line_2,line_3];

function refresh(){
    location.reload();
}

function printXO(id,div){
    player=document.querySelector(".container h1 span");

    if (player.innerHTML==="Player-1"){

        //setting 'X' to player 1 in html
        if(document.getElementById(id).innerHTML!=="X" && document.getElementById(id).innerHTML!=="O"){
            document.getElementById(id).innerHTML="X";

            //setting 1 to player 1 in array
            if(div==="line_1"){
                var index_1=divArray.indexOf(line_1);
                var index_2=line_1.indexOf(id);
            }
            else if(div==="line_2"){
                var index_1=divArray.indexOf(line_2);
                var index_2=line_2.indexOf(id);
        
            }
            else if(div==="line_3"){
                var index_1=divArray.indexOf(line_3);
                var index_2=line_3.indexOf(id);
           
            }
            xoArray[index_1][index_2]=1;
        
            //setting active player and color
            player.innerHTML="Player-2";
            player.style.color="green";
            checkWinner();
        }      
    }
    else{
        //setting 'O' to player 2 in html
        if(document.getElementById(id).innerHTML!=="X" && document.getElementById(id).innerHTML!=="O"){
            document.getElementById(id).innerHTML="O";

            //setting 0 to player 2 in array
            if(div==="line_1"){
                var index_1=divArray.indexOf(line_1);
                var index_2=line_1.indexOf(id);
          
            }
            else if(div==="line_2"){
                var index_1=divArray.indexOf(line_2);
                var index_2=line_2.indexOf(id);
          
            }
            else if(div==="line_3"){
                var index_1=divArray.indexOf(line_3);
                var index_2=line_3.indexOf(id);
           
            }
            xoArray[index_1][index_2]=0;

            //setting active player and color
            player.innerHTML="Player-1";
            player.style.color="red";
            checkWinner();
        }
    }
}

function checkWinner(){
    var rowSum=0;
    var colSum=0;
    var crossSum_left=0;
    var crossSum_right=0;
    for(var i=0;i<xoArray.length;i++){
        rowSum=0;
        var win;
        for(var j=0;j<xoArray[i].length;j++){

            if(i===0 && colSum!=0){
                colSum=0;
            }
            
            rowSum=rowSum+xoArray[i][j];

            if(i===0){
                colSum=colSum+xoArray[i][j]+xoArray[i+1][j]+xoArray[i+2][j];
                if(colSum===3 || colSum===0){
                    win = true;
                    break
                }
            }
            if (i===0 && j===0){
                crossSum_left=crossSum_left+xoArray[i][j]+xoArray[i+1][j+1]+xoArray[i+2][j+2];
                if(crossSum_left===3 || crossSum_left===0){
                    win=true;
                    break
                }

            }
            if (i===0 && j===2){
                crossSum_right=crossSum_right+xoArray[i][j]+xoArray[i+1][j-1]+xoArray[i+2][j-2];
                if(crossSum_right===3 || crossSum_right===0){
                    win=true;
                    break
                }
            }

        }
        if (rowSum===3 || rowSum===0){
            win = true;
            break
        }
    }


    if(win){
        document.querySelector(".container .board").style.display="none";
        document.querySelector(".container h1 span").style.color="gray";
        document.querySelector(".container h1 span").style.textDecoration="line-through";

        if(rowSum===3||colSum===3||crossSum_left===3||crossSum_right===3){
            document.querySelector(".container .winner").style.display="block";
        }
        else if(rowSum===0||colSum===0||crossSum_left===0||crossSum_right===0){
            document.querySelector(".container .winner").innerHTML="Player-2 wins!";
            document.querySelector(".container .winner").style.display="block";
        }
    }



}