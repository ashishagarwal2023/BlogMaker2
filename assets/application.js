window.onload = function(){
    var xmlhttp = new XMLHttpRequest();
    var url = "../db.json";
    var posts = document.getElementById("posts");

    xmlhttp.onerror = function(error){
        error.preventDefault();
        posts.innerHTML = "Failed to load posts.";
        console.error("Failed to load posts.",error);
    };

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            listPosts(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function listPosts(response) {
        var obj = JSON.parse(response);
        var arr = obj.posts;
        var i, htmlurl;
        var out = "";
        for(i = 0; i < arr.length; i++){
            var htmlurl = `post.html?id=${arr[i].id}`;
            out += `<article><div class="meta"><p class="date">${arr[i].posted}</p><h1><a href="${htmlurl}">${arr[i].name}</a></h1><p>${arr[i].smalldesc}</p><p><a href="${htmlurl}" class="button">Read more</a></p></div></article>`;
        }
        posts.innerHTML = out;
    }    
}