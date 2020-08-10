function time(){
    var date = new Date();
    var sec=date.getSeconds();
    var min = date.getMinutes()*60;
    var hr = date.getHours()-12;

    document.querySelector(".sec").style.transform = "rotate("+(sec*6)+"deg)";
    document.querySelector(".min").style.transform = "rotate("+((min/10)+180)+"deg)";
    document.querySelector(".hour").style.transform = "rotate(-"+((hr*120)+90)+"deg)";
}

setInterval(time,1000);
