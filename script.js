const watchmode_api_key = "WImwIw6CGs2o5Lsg9Io6YkEV9ip0oEMA5c3g0dJ8";
const giphy_api_key = "TEO60zBkEeYuD3lQieCc6BMsBxbxmiwU";

var nameInput = null;
var nameBtn = null;
var titleInput = null;
var titleBtn = null;
var titlesList = null;
var imagesList = null;
var nameForm = null;
var titleForm = null;
var homeBtn = null;
var txtLocalStorage = "";

document.addEventListener("DOMContentLoaded", function(event) {
    
    nameInput = document.getElementById("name-input");
    nameBtn = document.getElementById("submit-btn-name");
    titleInput = document.getElementById("title-input");
    titleBtn = document.getElementById("submit-btn-title");
    titlesList = document.getElementById("titles-list");
    imagesList = document.getElementById("images-list");

    nameForm = document.getElementById("name-form");
    titleForm = document.getElementById("title-form");
    homeBtn = document.getElementById("home-btn");
/*
    nameForm.style.visibility = "visible";
    titleForm.style.visibility = "hidden";
*/
    nameForm.style.display = "";
    titleForm.style.display = "none";


    console.log("---localStorage----");
    console.log(allStorage());
    init();

    homeBtn.addEventListener("click", function(event) {
        /*
        nameForm.style.visibility = "visible";
        titleForm.style.visibility = "hidden";
*/
        nameForm.style.display = "";
        titleForm.style.display = "none";

    });

    titleBtn.addEventListener("click", function(event) {
        //event.preventDefault();
        console.log("title submitted");

        nameForm.style.display = "none";
        titleForm.style.display = "";
        
        emptyTitlseList();
        emptyImagesList();

        var title = titleInput.value.trim();
        
        getTitles(title);

        txtLocalStorage = `{"nameInput" : "${nameInput.value}", "titleInput" : "${titleInput.value}"}`;
        localStorage.setItem(nameInput.value, txtLocalStorage);

    });

    nameBtn.addEventListener("click", function(event) {
        if (nameInput.value.substring(0, 3) == "---") {
            localStorage.clear();
        } else if (nameInput.value.substring(0, 2) == "--") {
            localStorage.removeItem(nameInput.value.substring(2));
            nameInput.value = "";
        } else {
            nameForm.style.display = "none";
            titleForm.style.display = "";
        
            emptyTitlseList();
            emptyImagesList();

            txtLocalStorage = localStorage.getItem(nameInput.value.trim());
            var jsonLocalStorage = JSON.parse(txtLocalStorage);
            console.log(jsonLocalStorage.titleInput);
            titleInput.value = jsonLocalStorage.titleInput;
            
            getTitles(titleInput.value);

        }

    });

    titlesList.addEventListener('click', function (e) {
        var title = titleInput.value.trim();
        if (e.target.classList.contains('titleBtn')) {
            selectedTitle = e.target.innerHTML;
            console.log("titlesList event");
            getGiphy(e.target.innerHTML, e.target.id);
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

function emptyTitlseList() {
    var child = titlesList.lastElementChild; 
    while (child) {
        titlesList.removeChild(child);
        child = titlesList.lastElementChild;
    }
}

function emptyImagesList() {
    var child = imagesList.lastElementChild; 
    while (child) {
        imagesList.removeChild(child);
        child = imagesList.lastElementChild;
    }
}
function getTitles(title) {
    console.log("getTitles: " + title);
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
                if (!document.getElementById(data.title_results[i].imdb_id)) {
                    console.log("appendChild");
                    var titleBtnHere = document.createElement("button");
                    titleBtnHere.textContent = data.title_results[i].name;
                    titleBtnHere.id = data.title_results[i].imdb_id;
                    titleBtnHere.setAttribute("class", "titleBtn");
                    titlesList.appendChild(titleBtnHere);
                }
            }
        })
        .catch(function (error){
            console.log(error)
        });
}

function getGiphy(selectedTitle, imdb_id) {
    console.log("getGiphy: " + selectedTitle + ", " + imdb_id);

    var requestURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_api_key}&q=${selectedTitle}&limit=1`;
  
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("getGiphy data");
            console.log(data);

            if (!document.getElementById("img_" + imdb_id)) {
                var imgHere = document.createElement("img");
                console.log("image url: " + data.data[0].source);
                // imgHere.setAttribute("src", data.data[0].source);
                imgHere.setAttribute("src", `https://i.giphy.com/media/${data.data[0].id}/giphy.webp`);
                imagesList.appendChild(imgHere);
                imgHere.id = "img_" + imdb_id;
            }
        })
        .catch(function (error){
            console.log("getGiphy error!");
            console.log(error);
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

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}