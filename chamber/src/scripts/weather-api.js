

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed= document.querySelector('#wind-speed');
const windChill = document. querySelector('#wind-chill');

const zip = 83672

const url =`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=9b60de9cb85d53b6b4102f19c69a8921&units=imperial`


async function apiFetch(){
    
  try{
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        console.log(data);
        
        displayResults(data);
      
    }else{
        throw Error(await response.text());
    }
  } catch(error){
    console.log(error);
  }
} 
function displayResults(weatherData){
  const temp = currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
  
  
  const iconsrc =`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  const desc = weatherData.weather[0].description;
  const speed = weatherData.wind.speed;
  const kMH = (speed * 1.609344).toFixed(2);


  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  windSpeed.textContent = kMH;

  const chill = 35.74+ (.6215* temp)- 35.75*(Math.pow(speed,.16))+ .4275*(temp*(Math.pow(speed,.16)));
  if (temp < 50 || speed > 3){
    windChill.textContent = chill.toFixed(2);}
    else{
      windChill.textContent = ("N/A");
    }
}
apiFetch();

// 