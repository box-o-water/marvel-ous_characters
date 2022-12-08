// https://api.watchmode.com/v1/search/?apiKey=WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8&search_field=name&search_value=Ed%20Wood
// https://api.watchmode.com/v1/title/345534/details/?apiKey=WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8&append_to_response=sources
// 345534 = id
// 138099
// https://api.watchmode.com/v1/title/345534/sources/?apiKey=WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8
// https://api.giphy.com/v1/gifs/search?api_key=TEO60zBkEeYuD3lQieCc6BMsBxbxmiwU&q=Avengers
const APIKeyWatchmode = "WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8";
const APIGIPHY = "TEO60zBkEeYuD3lQieCc6BMsBxbxmiwU";

$(document).ready(function(){

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
            getImages(APIGIPHY, data.title_results);

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
            for (var i = 0;i < data.data.length; i++) {
                var id = data.data[i].id;
                txtCards += addCard(id, (data.data[i].slug.replace("-"+id, "")).replaceAll("-"," "));
            }
            $("#cards").html(txtCards);
            $(".cardImage").each(function(index) {
                this.onload = function() {
                    adjustImage($(this));
                }
                $(this).click(function() {
                    console.log($(this).attr("data-title"));
                    searchMovie(APIKeyWatchmode, $(this).attr("data-title"));
                });
            });
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

function addCard(image_id, txtTitle) {
    return `<div class="cardMovie"><img src="https://i.giphy.com/media/${image_id}/giphy.webp" class="cardImage" data-title="${txtTitle}" /></div>`;
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