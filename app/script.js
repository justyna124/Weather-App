var x = document.getElementById("result");
var data;
var degree = "C";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionSuccess);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function onPositionSuccess(position) {

    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(function (response) {
            // x.innerHTML =
            return response.json();
        }).then(res => {
        data = res;
        viewData();

    })
}

function changeDegree() {
    if (degree === "C") {
        degree = "F"
    } else {
        degree = "C"
    }
    viewData();
}

function viewData() {
    var degreeToView;
    var degreeSign;
    if (degree === "C") {
        degreeToView = data.main.temp;
        degreeSign = '&#8451;'
    }
    else {
        degreeToView = data.main.temp * 9 / 5 + 32;
        degreeSign = "&#8457;"
    }
    x.innerHTML = `<p>${data.name}, ${data.sys.country}</p>
            <p class="pointer" onclick="changeDegree()">${degreeToView.toFixed(1)} <span>  ${degreeSign}</span></p>
            <p>${data.weather["0"].main}</p>
            <img src="${data.weather["0"].icon}">`

}
