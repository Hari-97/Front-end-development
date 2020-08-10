function getHistory(){
    return document.getElementById("historyValue").innerText;
}
//alert(getHistory());

function printHistory(num){
    document.getElementById("historyValue").innerText=num;
}

function getOutput(){
    return document.getElementById("outputValue").innerText;
}
//alert(getOutput());

function printOutput(num){
    if(num==""){ 
        document.getElementById("outputValue").innerText="";
    }
    else if (num=="-"){
        document.getElementById("outputValue").innerText="-";
    }
    else if (num=="."){
        document.getElementById("outputValue").innerText=".";
    }
    else if (num.length>1 && num.substr(1,num.length)=="."){
        document.getElementById("outputValue").innerText=num;
    }
    else{
        document.getElementById("outputValue").innerText=getFormattedNum(num);
    }
}

function printResult(num){
    document.getElementById("outputValue").innerText=getFormattedNum(num);
}

function getFormattedNum(num){
    if(num=="-"){
        return "";
    }
    
    else{
    var n=Number(num);
    value=n.toLocaleString("en");
    return value;
    }
}

function reverseFormatNum(num){
    if (num=="-"){
        return "-";
    }
    else if (num=="."){
        return "0."
    }
    else if (num.length>1 && num.substr(1,num.length)=="."){
        return num;
    }
    else{
    return(Number(num.replace(/,/g,'')));
    }
}
//alert(reverseFormatNum(getOutput()));

var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
             var op = reverseFormatNum(getOutput()).toString();
             op=op.substr(0,op.length-1);
             printOutput(op);
        }
        else {
            var out = getOutput();
            var histry = getHistory();
            if(out=="" && histry!=""){
                if(isNaN(histry[histry.length-1])){
                    histry=histry.substr(0,histry.length-1);
                }
            }
            if (out!="" || histry!=""){
                outpt=out==""?out:reverseFormatNum(out);
                histry=histry+outpt;
                if(this.id=="="){
                    var result = eval(histry)
                    printResult(result);
                    printHistory("");
                }
                else{
                    histry=histry+this.id;
                    printHistory(histry);
                    printOutput("");
                }
            }
        }
    })
}

var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output = reverseFormatNum(getOutput());
        if (output!=NaN){
            output=output+this.id;
            printOutput(output);
        }
    })
}

var symbol = document.getElementsByClassName("symbol");
for(var i=0;i<symbol.length;i++){
    symbol[i].addEventListener('click',function(){
        if (this.id=="."){
            var output = getOutput();
            if(output==""){
                output=this.id;
                printOutput(output);
            }
            else{
                output=output+this.id;
                printOutput(output);
            }

        }
        else{
        var output = getOutput();
        if(output==""){
        output=this.id+output;
        printOutput(output);
        }
    }
    })
}
