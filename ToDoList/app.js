const TaskList = [];

const addButton = document.getElementById("plus").addEventListener('click',TaskAddition);
const textbox = document.getElementById("taskText").addEventListener('keyup',function(event){
    if(event.keyCode===13){
        document.getElementById("plus").click();
    }
});

function TaskAddition(){

    //getting text from text box
    const text = document.getElementById("taskText").value;
    
    if(text!==""){
        //creating div
        var newDiv = document.createElement('div');
        newDiv.setAttribute("class","sampletask");
        newDiv.setAttribute("id","task_"+TaskList.length);

        //creating button
        var btncontnr = document.createElement('div');
        btncontnr.setAttribute("class","btncontainer");
        var newDivBtn = document.createElement('button');
        newDivBtn.setAttribute("class","statusbtn");
        newDivBtn.setAttribute("id","taskstatus_"+TaskList.length);
        newDivBtn.setAttribute("onclick","doneTask('taskstatus_"+TaskList.length+"'"+")");
        btncontnr.appendChild(newDivBtn);

        //creating span
        var spancontnr = document.createElement('div');
        spancontnr.setAttribute("class","spancontainer");
        var newDivSpan = document.createElement('span');
        newDivSpan.setAttribute("class","textspan");
        spancontnr.appendChild(newDivSpan);

        //creating delete button
        var delcontnr = document.createElement('div');
        delcontnr.setAttribute("class","delcontainer");
        var newDivDel = document.createElement('button');
        newDivDel.setAttribute("class","delbtn");
        newDivDel.setAttribute("id","delete_"+TaskList.length);
        newDivDel.setAttribute("onclick","removeTask('delete_"+TaskList.length+"'"+")");
        newDivDel.innerHTML="Delete";
        delcontnr.appendChild(newDivDel);

        //appending Button and span and delete to newDiv
        newDiv.appendChild(btncontnr);
        newDiv.appendChild(spancontnr);
        newDiv.appendChild(delcontnr);

        //set span text
        newDivSpan.innerHTML=text;
        newDivSpan.style.paddingLeft="12px";

        //appending newDiv to TaskList
        var divElement = document.getElementById("taskList");
        divElement.appendChild(newDiv);
    
        //pushing the new added task text to TaskList array
        TaskList.push(text);
        document.getElementById("taskText").value="";
    }

}

function removeTask(id){
    
    if(confirm("Delete Task?")){

        var btn_parent = document.getElementById(id).parentElement;
        var parent = btn_parent.parentElement;

    //getting taskList div and sample task div to remove the latter from the former
    var maindiv = document.getElementById("taskList");
   
    //removing the target task
    maindiv.removeChild(parent);
}
   

}

function doneTask(id){

    if(confirm("Task Done?")){
        var btn_parent = document.getElementById(id).parentElement;
        var parent = btn_parent.parentElement;
        var inputtext = parent.querySelector(".spancontainer span");
        var btn = document.getElementById(id);
        btn.style.backgroundColor="green";
        btn.style.boxShadow="0px 0px 10px 1px green";
        inputtext.style.color="green";
        inputtext.style.textDecoration="line-through";
        inputtext.style.textShadow="0px 0px 10px green"
    }
}
