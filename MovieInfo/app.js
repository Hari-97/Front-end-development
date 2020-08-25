const watchList = [];
const divArray = {};

const omdb_url = "http://www.omdbapi.com/?apikey=64407bbe&t=";
document.getElementById("searchbar").addEventListener("keyup",(event)=>{
    if(event.keyCode===13){
        const title = document.getElementById("searchbar").value
        document.querySelector(".titleheader").style.display="block"
        document.querySelector(".searchResult").style.display="flex"
        document.querySelector(".MyWatchList").style.display="none"
        document.querySelector(".home").style.display="none"
        api_call(title)
    }
})
function searchaction(id){
    const title = document.getElementById(id).textContent
        document.querySelector(".titleheader").style.display="block"
        document.querySelector(".searchResult").style.display="flex"
        document.querySelector(".MyWatchList").style.display="none"
        api_call(title)
}

async function api_call(title){
    
    const response = await fetch(omdb_url+title);
    const data = await response.json();
    console.log(data)
    //getting image
    const img_resp = await fetch(data.Poster);
    const img = await img_resp.blob();
    document.getElementById("image").src = URL.createObjectURL(img);

    document.getElementById("movie_title").textContent = data.Title
    for(var i=0;i<watchList.length;i++) {
        if (watchList[i]===data.Title){
            document.getElementById("watchlist").style.display="none"
            document.getElementById("remwatchlist").style.display="flex"  
            console.log("true")
            break
        }
        else{
            document.getElementById("remwatchlist").style.display="none"
            document.getElementById("watchlist").style.display="flex"
        }
    };
    
    var rating_value = (data.Ratings[0].Value).split('/')
    document.getElementById("ratingPoint").textContent=rating_value[0]
    document.getElementById("totalrating").textContent="/10"
    document.getElementById("type").textContent="| "+data.Type+" |"
    document.getElementById("rating").textContent=data.Rated+" |"
    document.getElementById("runtime").textContent=data.Runtime+" |"
    document.getElementById("genre").textContent=data.Genre+" |"
    document.getElementById("date").textContent=data.Released+" |"
    document.getElementById("lang").textContent=data.Language+" |"
    document.getElementById("country").textContent=data.Country+" |"
    document.getElementById("plot").textContent=data.Plot
    document.getElementById("director").textContent=data.Director
    document.getElementById("Writers").textContent=data.Writer
    document.getElementById("Actors").textContent=data.Actors
    document.getElementById("Production").textContent=data.Production
    document.getElementById("Boxofc").textContent=data.BoxOffice
    document.getElementById("awards").textContent=data.Awards
    document.getElementById("MetaScore").textContent=data.Metascore
    document.getElementById("imdbId").textContent=data.imdbID
    //addWatchListDiv()
}
document.getElementById("watchlist").addEventListener("click",()=>{
    addWatchListDiv()
    watchList.push((document.getElementById("movie_title").textContent))
    //localStorage.setItem("watchList",watchList)
    updateWatchlist()
    document.getElementById("watchlist").style.display="none"
    document.getElementById("remwatchlist").style.display="flex"
    console.log(watchList);

})
document.getElementById("remwatchlist").addEventListener("click",()=>{
    console.log(document.getElementById("movie_title").textContent)
    removeElementfromWatchList(document.getElementById("movie_title").textContent)
    updateWatchlist()
    
    console.log(watchList);

})

function updateWatchlist(){
     console.log(watchList.length)
    if (watchList.length===0){
        document.getElementById("listlen").style.display="none"
    }
    else{
        document.getElementById("listlen").style.display="block"
        document.getElementById("listlen").textContent=watchList.length
    }
}

function removeElementfromWatchList(title){
    //var id = watchList.indexOf(title);
    let id;
    var titleArray = document.querySelectorAll(".wl-title")
    console.log(titleArray)
    for(var i=0;i<titleArray.length;i++){
        console.log(titleArray[i].textContent,title)
        if(title===titleArray[i].textContent){
            id = titleArray[i].getAttribute("id") 
            console.log(id,"idd")
        }
    }
    var div_to_remove = document.getElementById("item-"+id[9]);
    console.log(div_to_remove)
    document.querySelector(".watchListItems").removeChild(div_to_remove)
    for(var i=0;i<watchList.length;i++){
        if (watchList[i]===title){
            watchList.splice(i,1)
            //localStorage.setItem("watchList",watchList)
        }
    }
    restorebtn()
}
function restorebtn(){
    document.getElementById("remwatchlist").style.display="none"
    document.getElementById("watchlist").style.display="flex"
}
function removeItemdiv(id){
    var title = document.getElementById("wl-title-"+id[5]).textContent
    for(var i=0;i<watchList.length;i++){
        if (watchList[i]===title){
            watchList.splice(i,1)
            //localStorage.setItem("watchList",watchList)
        }
    }
    console.log(title)
    var div_to_remove = document.getElementById(id);
    document.querySelector(".watchListItems").removeChild(div_to_remove)
    //divArray.pop(div_to_remove);
    //localStorage.setItem("divArray",JSON.stringify(divArray))
    if (title===document.getElementById("movie_title").textContent){
        restorebtn()
    }
    updateWatchlist()
    displayItems()
    if(watchList.length===0){
        document.getElementById("wl-warning").style.display="flex"
    }
    
}

function addWatchListDiv(){

    const watchlistArray = document.querySelectorAll(".MyWatchList .watchListItems .itemcontainer")
    var num
    if(watchlistArray.length===0){
        num = 0
    }
    else{
        num = Number((watchlistArray[watchlistArray.length-1].getAttribute("id"))[5])
    }
    

    //create itemcontainer
    var main_div = document.createElement("div")
    main_div.setAttribute("class","itemcontainer")
    main_div.setAttribute("id","item-"+(num+1))

    //create wl-imagecontainer
    var wl_image = document.createElement("div")
    wl_image.setAttribute("class","wl-image")
    //create img element
    var wl_img = document.createElement("img")
    wl_img.setAttribute("src","")
    wl_img.setAttribute("id","wl-img-"+(num+1))
    //add img element to wl-image-container
    wl_image.appendChild(wl_img)

    //Preparing wl-details div
    var wl_details = document.createElement("div")
    wl_details.setAttribute("class","wl-details")

    var wl_titlecontainer = document.createElement("div")
    wl_titlecontainer.setAttribute("class","wl-titlecontainer")
    wl_titlecontainer.setAttribute("id","wl-titlecontainer")

    var wl_title = document.createElement("button")
    wl_title.setAttribute("class","wl-title")
    wl_title.setAttribute("id","wl-title-"+(num+1))
    wl_title.setAttribute("onclick","searchaction('wl-title-"+(num+1)+"')")

    var wl_rembtn = document.createElement("div")
    wl_rembtn.setAttribute("id","wl-removebutton")
    var btn = document.createElement("button")
    btn.setAttribute("id","wl-remove")
    btn.setAttribute("onclick","removeItemdiv('item-"+(num+1)+"')")
    btn.textContent="Remove"
    wl_rembtn.appendChild(btn)

    wl_titlecontainer.appendChild(wl_title)
    wl_titlecontainer.appendChild(wl_rembtn)

    //Preparing wl-subdetails div
    var wl_subdetails = document.createElement("div")
    wl_subdetails.setAttribute("class","wl-subdetails")
    wl_subdetails.setAttribute("id","wl-subdetails")

    var wl_genre = document.createElement("span")
    wl_genre.setAttribute("id","wl-genre-"+(num+1))

    var wl_runtime = document.createElement("span")
    wl_runtime.setAttribute("id","wl-runtime-"+(num+1))

    var wl_releasedate = document.createElement("span")
    wl_releasedate.setAttribute("id","wl-releasedate-"+(num+1))

    wl_subdetails.appendChild(wl_genre)
    wl_subdetails.appendChild(wl_runtime)
    wl_subdetails.appendChild(wl_releasedate)

    //Preparing rating & plot div
    var wl_rating = document.createElement("div")
    wl_rating.setAttribute("class","wl-rating")
    wl_rating.setAttribute("id","wl-rating-"+(num+1))

    var wl_plot = document.createElement("div")
    wl_plot.setAttribute("class","wl-plot")
    wl_plot.setAttribute("id","wl-plot-"+(num+1))

    //appending child to wl-details div
    wl_details.appendChild(wl_titlecontainer)
    wl_details.appendChild(wl_subdetails)
    wl_details.appendChild(wl_rating)
    wl_details.appendChild(wl_plot)

    //final appending into main_div(itemcontainer div)
    main_div.appendChild(wl_image)
    main_div.appendChild(wl_details)

    document.querySelector(".watchListItems").appendChild(main_div)

    document.getElementById("wl-img-"+(num+1)).src=document.getElementById("image").src
    document.getElementById("wl-title-"+(num+1)).textContent=document.getElementById("movie_title").textContent
    document.getElementById("wl-genre-"+(num+1)).textContent=document.getElementById("genre").textContent
    document.getElementById("wl-runtime-"+(num+1)).textContent=document.getElementById("runtime").textContent
    document.getElementById("wl-releasedate-"+(num+1)).textContent=document.getElementById("date").textContent
    document.getElementById("wl-rating-"+(num+1)).textContent=document.getElementById("ratingPoint").textContent+"/10"
    document.getElementById("wl-plot-"+(num+1)).textContent=document.getElementById("plot").textContent

    /*divArray[main_div.getAttribute("id")]=document.getElementById(main_div.getAttribute("id"))
    localStorage.setItem("divArray",divArray)
    console.log(divArray)
    console.log(String(main_div))*/
}
function updateID(){
    const watchlistArray = document.querySelectorAll(".MyWatchList .watchListItems .itemcontainer")
    var num = Number((watchlistArray[watchlistArray.length-1].getAttribute("id"))[5])
    console.log(num)
}
function displayWatchlist(){
    init()
    document.querySelector(".home").style.display="none"
    displayItems()
    document.getElementById("searchbar").value=""
    document.querySelector(".MyWatchList").style.display="block"
}
function displayHome(){
    init()
    document.querySelector(".home").style.display="grid"
    document.getElementById("searchbar").value=""
}
function displayItems(){
    const watchlistArray = document.querySelectorAll(".MyWatchList .watchListItems .itemcontainer")
    if(watchlistArray.length===0){
        document.querySelector(".watchListItems").style.display="none"
        document.getElementById("wl-warning").style.display="flex"
    }
    else{
        document.querySelector(".watchListItems").style.display="block"
        document.getElementById("wl-warning").style.display="none"
    }
}
function clickSearch(){
    document.getElementById("searchbar").click()
}


function init(){
    document.querySelector(".titleheader").style.display="none"
    document.querySelector(".searchResult").style.display="none"
    document.getElementById("remwatchlist").style.display="none"
    document.querySelector(".MyWatchList").style.display="none"
}

init()
updateWatchlist()
//updateID()
//console.log(localStorage.getItem("divArray"))
//api_call('96');
//console.log(poster);
