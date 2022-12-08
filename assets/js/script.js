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
    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.title_results[0].name);
            getImages(APIGIPHY, data.title_results[0].name);

        })
        .catch(function(error) {
            console.log(error);
        });
}


function getImages(APIKey, txtTitle) {
    // GIPHY
    var URL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${txtTitle}&limit=6`;

    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var txtCards = "";
            for (var i = 0;i < data.data.length; i++) {
                console.log(data.data[i].id);
                txtCards += addCard(data.data[i].id);
            }
            $("#cards").html(txtCards);
            
        })
        .catch(function(error) {
            console.log(error);
        });
}

function addCard(image_id) {
    return `<div class="cardMovie"><img src="https://i.giphy.com/media/${image_id}/giphy.webp" style="height:100px;width:100px;" /></div>`;
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