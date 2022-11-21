var xmlhttp = new XMLHttpRequest();
var url = "/db.json";

xmlhttp.onerror = function(){
    document.getElementById("post").innerHTML = "Failed to load article.";
};

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        detailPost(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function detailPost(response) {
    var obj = JSON.parse(response);
    var arr = obj.posts.reverse();
    var m = new URL(window.location.href);
    m = m.searchParams;
    id = parseInt(m.get("id"));
    if(id == -0){
        id = 0;
    }
    if(0 > id || id == null){
        window.location = "index.html";
    }
    else{
        var title = document.createElement("h1");
        title.textContent = arr[id].name;
        document.querySelector("#post").appendChild(title);
        var exc = document.createElement("div");
        exc.classList.add("excerpt");
        var p = document.createElement("p");
        p.textContent = arr[id].smalldesc;
        exc.appendChild(p);
        document.querySelector("#post").appendChild(exc);
        var p = document.createElement("p");
        p.innerHTML = arr[id].desc.replaceAll("\n", "<br>");;
        document.querySelector("#post").appendChild(p);

        var nav = [`<a href="post.html?id=${id - 1}" class="button button-previous">Previous post</a>`,`<a href="post.html?id=${id + 1}" class="button button-next">Next post</a>`];
        if(id == 0){
            nav[0] = `<span class="button button-disabled button-previous">No previous posts</span>`;
        }
        if(id == (arr.length - 1)){
            nav[1] = `<span class="button button-disabled button-next">No newer posts</span>`;
        }
        document.querySelector("div#pag").innerHTML = nav[0];
        document.querySelector("div#pag").innerHTML += nav[1];
    }
}