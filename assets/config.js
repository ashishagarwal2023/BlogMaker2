var xmlhttp = new XMLHttpRequest();
var url = "../config.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        config(xmlhttp.responseText);
    }
}
xmlhttp.onerror = function(error){
    error.preventDefault();
    console.error("Failed to load configuration.",error);
    theme({"theme":"#283e89"});
    title({"title": "loading error"});
    message({"message": "failed to load, check your console."});
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function config(response) {
    var obj = JSON.parse(response);
    ifa(response,"title",title,obj);
    ifa(response,"message",message,obj);
    ifa(response,"theme",theme,obj);
}
function ifa(response,name,func,req){
    var obj = JSON.parse(response);
    if(obj[name]){
        func(req);
    }
}
function title(resp){
    var obj = resp;
    document.querySelector("#titlebar").textContent = obj["title"];
    document.querySelector(".title").textContent = obj["title"];
}
function message(resp){
    var obj = resp;
    if(document.querySelector("#about")){
        document.querySelector("#about").textContent = obj["message"];
    }
}
function theme(resp){
    var obj = resp;
    var theme = obj["theme"];
    var code = `<style>:root{--theme:${theme};}a{color:var(--theme);}h1 a:hover,h1 a:focus{color: var(--theme);}body{border-top:5px solid var(--theme);}header h2 a span{color:var(--theme);}blockquote{border-left:3px solid var(--theme);color:var(--theme);}::selection{color:white;background:var(--theme);}</style>`;
    document.head.innerHTML += code;
}