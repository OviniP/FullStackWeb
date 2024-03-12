import axios from "axios"

const getCountryWeather = (latlng) => {
    const exclude = "hourly,daily"
    const units = "metric";
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=${units}&appid=${apiKey}`

    const request = axios.get(url)
    return request.then(response => {
        return response.data
    })
}

export default {
    getCountryWeather
}