document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById("inpt");
    const SearchButton=document.getElementById("btn");
    const container=document.getElementsByClassName("show-details");
    const  CityName=document.getElementById("city-name");
    const  Temperature=document.getElementById("temperature");
    const  description=document.getElementById("description");
    const errorMessage=document.getElementById("error-mesg");
    const API_KEY="5f56d525d1619d0a2cd2eac4ce55588e";
    SearchButton.addEventListener('click',async()=>{
        const city=cityInput.value.trim();
        if(!city)return;
        try{
            const weatherData=await findCityWeather(city);
            displayWeatherData(weatherData);

        }
        catch(error){
            showError();
        }
    })
    async function findCityWeather(city){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("City not found")
        }
        const data=await response.json();
        return data;
    
    }
    function displayWeatherData(data){
        const {name,main,weather}=data;
        CityName.textContent=name;
        Temperature.textContent=`Temperature : ${main.temp}`;
        description.textContent=`Weather : ${weather[0].description}`;
        container.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    


    }
    function showError(){
        container.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }
})