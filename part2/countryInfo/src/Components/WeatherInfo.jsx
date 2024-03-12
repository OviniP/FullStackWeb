const WeatherInfo = ({city, weatherInfo}) => {

    const temp = Object.keys(weatherInfo).length > 0 ? weatherInfo.main.temp : null
    const wind = Object.keys(weatherInfo).length > 0 ? weatherInfo.wind.speed : null
    const icon = Object.keys(weatherInfo).length > 0 ? weatherInfo.weather[0].icon : null
    const imageUrl = icon != null ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''


    if(weatherInfo !== undefined)
    {
        console.log('main',weatherInfo);
        return(
            <div className="weatherData">
                <h3>Weathre in {city}</h3>
                <p>Temperature {temp} Celcius</p>
                <img src={imageUrl}></img>
                <p>Wind {wind} m/s</p>
            </div>
        )
    }
}

export default WeatherInfo