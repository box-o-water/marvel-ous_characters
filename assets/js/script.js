const APIKeyWatchmode = "WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8";
const APIGIPHY = "TEO60zBkEeYuD3lQieCc6BMsBxbxmiwU";

$(document).ready(function(){
    document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
    $(document).on("click", "#btnSearchMovie", function() {
        
        console.log($("#titleMovie").val());
        getImages(APIGIPHY, $("#titleMovie").val());
        $("#tabSearch").css("display", "none");
        $("#tabMovie").css("display", "");
    });

    $(document).on("click", "#btnBack", function() {
        $("#tabSearch").css("display", "");
        $("#tabMovie").css("display", "none");
    });
    $(document).on("click", "#infoBoxClose", function() {
        $("#infoMovie").css("visibility", "hidden");
    });
});

function searchMovie(APIKey, txtMovie) {
    var URL = `https://api.watchmode.com/v1/search/?apiKey=${APIKey}&search_field=name&search_value=${txtMovie}`;
    console.log(URL);
    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.title_results);
            $("#infoUsername").html($("#username").val());
            $("#infoTitle").html(data.title_results[0].name);
            $("#infoReleaseDate").html(data.title_results[0].year);
            $("#infoMovie").css("visibility", "visible");
            
        })
        .catch(function(error) {
            console.log(error);
        });
}

// https://api.watchmode.com/v1/search/?apiKey=WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8&search_field=imdb_id&search_value=tt0109707

function getImages(APIKey, txtTitle) {
    // GIPHY
    var URL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${txtTitle}&limit=6`;

    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var txtCards = "";
            var numOFImage = data.data.length;
            if (numOFImage > 5) numOFImage == 5;
            $("#cards").html("");
            for (var i = 0; i < numOFImage; i++) {
                var id = data.data[i].id;
                txtTitle = data.data[i].title.substring(0, data.data[i].title.indexOf(" " + data.data[i].type.toUpperCase())).replaceAll(" ","%20");
                addCard(id, txtTitle, data.data[i].rating);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function addCard(image_id, txtTitle, txtRating) {
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");

    newDiv.classList.add("cardMovie");
    newImg.src = `https://i.giphy.com/media/${image_id}/giphy.webp`;
    newImg.classList.add("cardImage");
    newImg.setAttribute("data-title", txtTitle);
    newImg.setAttribute("data-rating", txtRating);
    newDiv.appendChild(newImg);
    document.getElementById("cards").appendChild(newImg);
    newImg.style.visibility = "hidden";
    newImg.onload = function() {
        adjustImage($(this));
        newImg.style.visibility = "visible";
    }
    newImg.addEventListener("click", function() {
        console.log($(this).attr("data-title"));
        $("#infoUSRating").html($(this).attr("data-rating"));
        searchMovie(APIKeyWatchmode, $(this).attr("data-title"));
    });
}

function searchMovieDetail(APIKey, title_id) {
    var URL = `https://api.watchmode.com/v1/title/${title_id}/details/?apiKey=${APIKey}&append_to_response=sources`;

    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function adjustImage(obj) {
    var maxWidth = 100;
    var maxHeight = 100;
    var ratio = 0;
    var width = obj.width();
    var height = obj.height();

    if (width > maxWidth){
        ratio = maxWidth / width;
        obj.css("width", maxWidth);
        obj.css("height", height * ratio);
        height = height * ratio;
        width = width * ratio;
    }

    if (height > maxHeight){
        ratio = maxHeight / height;
        obj.css("height", maxHeight);
        obj.css("width", width * ratio);
        width = width * ratio;
        height = height * ratio;
    }

    obj.css("margin-left", Math.floor((maxWidth - width) / 2));
    obj.css("margin-top", Math.floor((maxHeight - height) / 2));
}