import WeatherInfo from "./WeatherInfo"

const CountryInfo = ({country, weatherInfo}) => {
    console.log(weatherInfo)
    return (
        <>
            <div>
                <h2>{country.name.common}</h2>
            </div>
            <div>
                Capital {country.capital[0]}<br/>
                Area {country.area}
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => <li key = {key}>{value}</li>)}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.flags.alt}></img>
            </div>
            <WeatherInfo city = {country.capital[0]} weatherInfo={weatherInfo}></WeatherInfo>
        </>
    )
}

export default CountryInfo