const watchmode_api_key = "WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8";
const giphy_api_key = "TEO60zBkEeYuD3lQieCc6BMsBxbxmiwU";

/*
var nameInput = document.getElementById("name-input");
var nameBtn = document.getElementById("submit-btn-name");
var titleInput = document.getElementById("title-input");
var titleBtn = document.getElementById("submit-btn-title");
var titlesList = document.getElementById("titles-list");
*/

var nameInput = null;
var nameBtn = null;
var titleInput = null;
var titleBtn = null;
var titlesList = null;
var imagesList = null;

document.addEventListener("DOMContentLoaded", function(event) {
    
    nameInput = document.getElementById("name-input");
    nameBtn = document.getElementById("submit-btn-name");
    titleInput = document.getElementById("title-input");
    titleBtn = document.getElementById("submit-btn-title");
    titlesList = document.getElementById("titles-list");
    imagesList = document.getElementById("images-list");

    init();
    titleBtn.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("title submitted");
    
        var title = titleInput.value.trim();
        getTitles(title);
    });
    
    nameBtn.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("name submitted");
    
        var name = nameInput.value.trim();
    
        nameInput.value = "";
        console.log(name);
        localStorage.setItem("name", JSON.stringify(name));    
    });

    titlesList.addEventListener('click', function (e) {
        var title = titleInput.value.trim();
        if (e.target.classList.contains('titleBtn')) {
            selectedTitle = e.target.innerHTML;

            //getGiphy(selectedTitle);
            getGiphy(e.target.innerHTML, e.target.imdb_id);
        }
    });
});

function renderName() {
    console.log("rendering name");

    var storedName = JSON.parse(localStorage.getItem("name"));
    console.log(storedName);

    if (storedName !== null) {
        var nameOutput = document.createElement("h2");
        nameOutput.textContent = storedName + ", pick a title."
        titlesList.appendChild(nameOutput);
    }

}

function getTitles(title) {
    console.log("getTitles")

    renderName()

    var requestURL = `https://api.watchmode.com/v1/search/?apiKey=${watchmode_api_key}&search_field=name&search_value=${title}`
  
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var numOfTitles = data.title_results.length;
            if (numOfTitles > 5) numOfTitles === 5;
            for (var i = 0; i < 5; i++) {
                var titleBtnHere = document.createElement("button");
                titleBtnHere.textContent = data.title_results[i].name;
                titleBtnHere.id = data.title_results[i].imdb_id;
                titleBtnHere.setAttribute("class", "titleBtn");
                titlesList.appendChild(titleBtnHere);
            }
        })
        .catch(function (error){
            console.log(error)
        })
};

function getGiphy(selectedTitle, imdb_id) {
    console.log("getTitles")

    var requestURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_api_key}&q=${selectedTitle}&limit=1`;
  
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            if (!document.getElementById("img_" + imdb_id)) {
                var imgHere = document.createElement("img");
                imgHere.setAttribute("src", data.data[0].source)
                imagesList.appendChild(imgHere);
                imgHere.id = "img_" + imdb_id;
            }
        })
        .catch(function (error){
            console.log(error)
        })
};

function getGiphy_backup(selectedTitle) {
    console.log("getTitles")

    var requestURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_api_key}&q=${selectedTitle}&limit=1`;
  
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var imgHere = document.createElement("img");
            imgHere.setAttribute("src", data.data[0].source)
            imagesList.appendChild(imgHere);
            //imgHere.id =
        })
        .catch(function (error){
            console.log(error)
        })
};

function init() {
    console.log("initialize application");
}

