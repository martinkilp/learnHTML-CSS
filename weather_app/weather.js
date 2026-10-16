

let liveTime = "-";
let liveWeather = "-";
let liveCountry = "-";



fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.4&lon=24.7")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        liveTime = data.properties.timeseries[0].time;
        liveWeather = data.properties.timeseries[0].data.instant.details.air_temperature;
        
        
        console.log(liveTime);
        

        document.querySelector(".todayweather2 p").textContent = `${liveTime} C`;
        document.querySelector(".todayweather2 h3").textContent = `${liveWeather} C`;

    })
    .catch(error => {
        console.error("Ilma laadimine ebaõnnestus:", error);
    });



