// weather app
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ede67048f308c9dd3fc9818d416746f2";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if(city){
         try{
const weatherdata = await getweatherdata(city);
displayweatherinfo(weatherdata);
         }
         catch(error){
            console.error(error);
            displayError(error);
         }
    }
    else{
displayError("please enter a city")
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiurl);
    
    if(!response.ok){
        throw new Error("could not fetch wether data");
    }
    return await response.json();
}

function displayweatherinfo(data){
   const {name: city, main: {temp,humidity},weather: [{description,id}]} = data;
   card.textContent = "";
   card.style.display ="flex";

  const citydisplay = document.createElement("h1");
  const tempdisplay = document.createElement("p");
  const humiditydisplay = document.createElement("p");
  const descdisplay = document.createElement("p");
  const weatheremoji = document.createElement("p");


  citydisplay.textContent = city;
  tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humiditydisplay.textContent = `Humidity : ${humidity}%`;
  descdisplay.textContent = description;
  weatheremoji.textContent = getweatheremoji(id);



  citydisplay.classList.add("citydisplay");
  tempdisplay.classList.add("tempdisplay");
  humiditydisplay.classList.add("humiditydisplay");
  descdisplay.classList.add("descdisplay");
  weatheremoji.classList.add("weatheremoji");





  card.appendChild(citydisplay);
  card.appendChild(tempdisplay);
  card.appendChild(humiditydisplay);
  card.appendChild(descdisplay);
  card.appendChild(weatheremoji);
   

}
function getweatheremoji(weatherId){
   switch(true){
    case (weatherId >= 200 && weatherId < 300):
    return "⚡";
    case (weatherId >= 300 && weatherId < 400):
    return "💦";
    case (weatherId >= 500 && weatherId < 600):
    return "🌧️";
    case (weatherId >= 600 && weatherId < 700):
    return "❄️";
    case (weatherId >= 700 && weatherId < 800):
    return "🌫️";
    case (weatherId === 800):
    return "☀️";
    case (weatherId >= 801 && weatherId < 810):
    return "🌥️";
   default:
    return "?";
   }

}
function displayError(message){
     const errordisplay = document.createElement("p");
     errordisplay.textContent = message;
     errordisplay.classList.add("errordisplay")
     card.textContent = "";
     card.style.display = "flex";
     card.appendChild(errordisplay);
}