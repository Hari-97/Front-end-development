const Income_Title = [];
const Expense_Title = [];
const Income_Amount = [0];
const Expense_Amount = [0];


const displayContent = document.querySelectorAll(".dashboard .display section");

//when ENTER key is pressed from the input which gets the amount, the value from the input will be taken and processed
const input_title = document.getElementById("title").addEventListener("keyup",function(event){
    if(event.keyCode===13){
        //addcontent function is called which will check for valid inputs and process it further
        addContent();

        //the total income ,total expenses are calculated by adding each income and expense into an array and using reduce property
        var totalIncome = Income_Amount.reduce(function(total,j){
            return total+j;
        });
        var totalExpense = Expense_Amount.reduce(function(total,j){
            return total+j;
        })
        var bal = totalIncome-totalExpense;

        //the income , expense and balance will be displayed 
        document.getElementById("main-income").textContent=parseFloat(totalIncome);
        document.getElementById("main-exp").textContent=parseFloat(totalExpense);
        document.getElementById("main-bal").textContent=parseFloat(bal);

        //to update the canvas
        var temp = document.querySelector(".graph canvas")
        if(temp!==null){
            document.querySelector(".graph").removeChild(temp);
        }

        //to draw the chart-Orange circular chart at the center
        setGraph();
    }
});

//when ENTER is pressed from input which gets the title, it will taken and proceeded further
const input_amnt = document.getElementById("amt").addEventListener("keyup",function(event){
    if(event.keyCode===13){
        //addcontent function is called which will check for valid inputs and process it further
        addContent();

        //the total income ,total expenses are calculated by adding each income and expense into an array and using reduce property
        var totalIncome = Income_Amount.reduce(function(total,j){
            return total+j;
        });
        var totalExpense = Expense_Amount.reduce(function(total,j){
            return total+j;
        })
        var bal = totalIncome-totalExpense;

        //the income , expense and balance will be displayed 
        document.getElementById("main-income").textContent=parseFloat(totalIncome);
        document.getElementById("main-exp").textContent=parseFloat(totalExpense);
        document.getElementById("main-bal").textContent=parseFloat(bal);

        //to update the canvas
        var temp = document.querySelector(".graph canvas")
        if(temp!==null){
            document.querySelector(".graph").removeChild(temp);
        }

        //to draw the chart - orange circular chart at the center
        setGraph();
    }
});

//to check if the inputs are valid or not
function addContent(){
    var title = document.getElementById("title").value;
    var amt =  document.getElementById("amt").value;
    if(title===""){
        document.getElementById("title").style.boxShadow="0px 0px 10px 0px red";
        document.getElementById("amt").style.boxShadow="none";
    }
    if(amt===""){
        document.getElementById("amt").style.boxShadow="0px 0px 10px 0px red";
        document.getElementById("title").style.boxShadow="none";
    }
    if(title==="" && amt===""){
        document.getElementById("title").style.boxShadow="0px 0px 10px 0px red";
        document.getElementById("amt").style.boxShadow="0px 0px 10px 0px red";
    }
    if(title!=="" && amt!==""){
        document.getElementById("amt").style.boxShadow="none";
        document.getElementById("title").style.boxShadow="none";
        var temp_amount = document.getElementById("amt").value;
        if(isNaN(Number(temp_amount))){
            alert("Enter the amount in numbers!");
        }
        else{
            if(document.querySelector(".dashboard .drop-down select").value==="income"){
                var newdiv = addDiv("income");
                document.querySelector(".dashboard .display .display-income").appendChild(newdiv);
                var Alldiv = addDivtoAll("income");
                document.querySelector(".dashboard .display .display-all").appendChild(Alldiv);
            }
            else if(document.querySelector(".dashboard .drop-down select").value==="expense"){
                var newdiv = addDiv("expense");
                document.querySelector(".dashboard .display .display-expense").appendChild(newdiv);
                var Alldiv = addDivtoAll("expense");
                document.querySelector(".dashboard .display .display-all").appendChild(Alldiv);
            }
            
        }
    }
    if(isNaN(Number(temp_amount))){
        document.getElementById("amt").value="";
    }
    else{
        document.getElementById("title").value="";
        document.getElementById("amt").value="";
    }

}

//to add the income or expense title and amount on to the display when the inputs are given
//the following function will add the expense to expenses div and income to income div based on the argument passed in the function call

function addDiv(displayName){
    //creating a new div
    var rowdiv = document.createElement('div');

    //setting attributes to the div 
    if(displayName==="income"){
        rowdiv.setAttribute("class","income-row");
        rowdiv.setAttribute("id","income-"+Income_Amount.length);
    }
    else if (displayName==="expense"){
        rowdiv.setAttribute("class","expense-row");
        rowdiv.setAttribute("id","expense-"+Expense_Amount.length);
    }
    //creating a span to hold title
    var spanTitle = document.createElement('span');
    spanTitle.setAttribute("class","sample-content");
    spanTitle.textContent=document.getElementById("title").value;
    //creating a span to hold amount
    var spanAmt = document.createElement('span');
    spanAmt.setAttribute("class","sample-amount");
    if(displayName==="income"){
        spanTitle.setAttribute("id","title-"+Income_Amount.length);
        spanAmt.setAttribute("id","amt-"+Income_Amount.length);
        Income_Title.push(document.getElementById("title").value);
        Income_Amount.push(Number(document.getElementById("amt").value));
    }
    else if (displayName==="expense"){
        spanTitle.setAttribute("id","title-"+Expense_Amount.length);
        spanAmt.setAttribute("id","amt-"+Expense_Amount.length);
        Expense_Title.push(document.getElementById("title").value);
        Expense_Amount.push(Number(document.getElementById("amt").value));
    }
    spanAmt.textContent=document.getElementById("amt").value;
    //adding the spans to the div
    rowdiv.appendChild(spanTitle);
    rowdiv.appendChild(spanAmt);
    
    return rowdiv;
}

//the following function will add the expense as well as income title and amount to the All tab display 
//Expenses will be displayed in red and income in green

function addDivtoAll(action){
    //creating a new div to hold the title span and amount span
    var rowdiv = document.createElement('div');
    rowdiv.setAttribute("class","all-row");
    rowdiv.setAttribute("id",action+"-1");
    //creating a span to hold the title
    var spanTitle = document.createElement('span');
    spanTitle.setAttribute("class","sample-content");
    spanTitle.setAttribute("id","title-1");
    spanTitle.textContent=document.getElementById("title").value;
    //creating a span to hold the amount
    var spanAmt = document.createElement('span');
    spanAmt.setAttribute("class","sample-amount");
    spanAmt.setAttribute("id","amt-1");
    spanAmt.textContent=document.getElementById("amt").value;
    //adding the spans to the newly created div
    rowdiv.appendChild(spanTitle);
    rowdiv.appendChild(spanAmt);

    //In All tab , expenses will be displayed in red and income in green
    if(action==="income"){
        spanAmt.style.color="green";
        spanTitle.style.color="green"
    }
    else{
        spanAmt.style.color="red";
        spanTitle.style.color="red"
    }

    return rowdiv;
}

//to click the "All" when page reloads
function clickAllTab(){
    document.getElementById("alltab").click();
    document.getElementById("alltab").style.backgroundColor="teal";
    document.getElementById("alltab").style.color="white";
}

//to unclick the "All" tab
function unclickAllTab(){
    document.getElementById("alltab").style.backgroundColor="transparent";
    document.getElementById("alltab").style.color="rgb(30, 0, 58)";
}

//to unclick expense tab
function unclickExpenseTab(){
    document.getElementById("expensetab").style.backgroundColor="transparent";
    document.getElementById("expensetab").style.color="rgb(30, 0, 58)";
}

//to unclick income tab
function unclickIncomeTab(){
    document.getElementById("incometab").style.backgroundColor="transparent";
    document.getElementById("incometab").style.color="rgb(30, 0, 58)";
}


//Onclick activity for the tab buttons - Expenses,Income,All
//Expenses Button-tab
const expenseBtn = document.getElementById("expensetab").addEventListener('click',function(){
    displayContent.forEach(element => {
        element.style.display="none";
        if(element.className==="display-expense"){
            element.style.display="flex";
        }
    });
    document.getElementById("expensetab").style.backgroundColor="teal";
    document.getElementById("expensetab").style.color="white";
    //to unclick other tabs
    unclickAllTab();
    unclickIncomeTab();

    document.getElementById("action-drop").selectedIndex="2";

    //to enable input boxes since they will be disabled in the All tab
    document.getElementById("title").style.opacity="1";
    document.getElementById("amt").style.opacity="1";
    document.getElementById("action-drop").style.opacity="1";
    document.getElementById("title").style.pointerEvents="all";
    document.getElementById("amt").style.pointerEvents="all";
    document.getElementById("action-drop").style.pointerEvents="all";
    document.getElementById("title").value="";
    document.getElementById("amt").value="";
});

//Income button-tab
const incomeBtn = document.getElementById("incometab").addEventListener('click',function(){
    displayContent.forEach(element => {
        element.style.display="none";
        if(element.className==="display-income"){
            element.style.display="flex";
        }
    });
    document.getElementById("incometab").style.backgroundColor="teal";
    document.getElementById("incometab").style.color="white";
    //to unclick other tabs
    unclickAllTab();
    unclickExpenseTab();

    document.getElementById("action-drop").selectedIndex="1";

    //to enable input boxes since they will be disabled in the All tab
    document.getElementById("title").style.opacity="1";
    document.getElementById("amt").style.opacity="1";
    document.getElementById("action-drop").style.opacity="1";
    document.getElementById("title").style.pointerEvents="all";
    document.getElementById("amt").style.pointerEvents="all";
    document.getElementById("action-drop").style.pointerEvents="all";
    document.getElementById("title").value="";
    document.getElementById("amt").value="";
});

//All button-tab
const allBtn = document.getElementById("alltab").addEventListener('click',function(){
    displayContent.forEach(element => {
        element.style.display="none";
        if(element.className==="display-all"){
            element.style.display="flex";
        }
    });
    document.getElementById("alltab").style.backgroundColor="teal";
    document.getElementById("alltab").style.color="white";
    //to unclick other tabs
    unclickExpenseTab();
    unclickIncomeTab();

    document.getElementById("action-drop").selectedIndex="0";

    //to disable the input boxes in the All tab
    document.getElementById("title").style.pointerEvents="none";
    document.getElementById("amt").style.pointerEvents="none";
    document.getElementById("action-drop").style.pointerEvents="none";
    document.getElementById("title").style.opacity="0.5";
    document.getElementById("amt").style.opacity="0.5";
    document.getElementById("action-drop").style.opacity="0.5";
    document.getElementById("title").value="";
    document.getElementById("amt").value="";
});


//to set circular chart for balance wrt income
function setGraph(){
    //creating canvas and appending to div
    const circle = document.querySelector(".graph");
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    circle.appendChild(canvas);
    //calculating degrees to plot the balance percentage wrt income
    var bal = Number(document.getElementById("main-bal").textContent);
    var income  = Number(document.getElementById("main-income").textContent);
    var degree = ((bal/income)*100)*3.6;
    //creating context of canvas
    const ctx = canvas.getContext("2d");
    //setting properties for context
    ctx.strokeStyle = "orange";
    ctx.fillStyle = "orange";
    //drawwing arc
    ctx.beginPath();
    ctx.arc(25,25,20,0,degree*(Math.PI/180),false);
    ctx.fill();
    ctx.stroke();
}

//calling the below function to click the all tab when the page reloads
clickAllTab();
