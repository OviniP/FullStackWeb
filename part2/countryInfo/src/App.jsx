import { useState, useEffect} from 'react'
import Countries from './Components/Countries'
import CountryService from './Services/CountryService'
import WeatherService from './Services/WeatherService'
import Filter from './Components/Filter'
import './index.css'
import CountryInfo from './Components/CountryInfo'


function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({})

  const effectHookCountries = () => {
    CountryService.getAll()
    .then(response => {
      setCountries(response)
    })
    .catch(error =>{
      console.log('Error on country data retrieval')
    })
  }

  const effectHookWeather = () => {
    if(selectedCountry) {
      WeatherService.getCountryWeather(selectedCountry.capitalInfo.latlng)
        .then(response => 
          {setWeatherInfo(response)})
        .catch(error => console.log('error retrieving weather data'))
    }
  }

  useEffect(effectHookCountries,[])
  useEffect(effectHookWeather,[selectedCountry])

  const hanndleSearch = (event) => {
    setFilterText(event.target.value);
    const filterdCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()) > 0)
    setFilteredCountries(filterdCountries)
    if(filterdCountries && filterdCountries.length === 1){
      setSelectedCountry(filterdCountries[0])
    }
   }

   const showCountry = (country) => {
    setSelectedCountry(country)
    setFilteredCountries([country])
   }

  return (
    <div className='main'>
      <Filter filterText = {filterText} onChange = {hanndleSearch}></Filter>
      {filteredCountries.length === 1 ? (<CountryInfo country={filteredCountries[0]} weatherInfo={weatherInfo}></CountryInfo>) : 
        (<Countries countries={filteredCountries} onSelect={showCountry}></Countries>)}
    </div>
  )
}

export default App
