import Country from './Country'

const maxCountryCount = 10

const Countries = (props) => {
    if(props.countries.length > maxCountryCount)
    {
        return( 
            <div>
                Too many matches. Specify another filter.
            </div>
        )
    }
   /* else if (props.countries.length === 1){
        return (
            <CountryInfo country = {props.countries[0]}></CountryInfo>
        )
    }*/
    return (
        <ul>
            {props.countries.map(element => <Country key={element.name.common} country = {element} onSelect = {props.onSelect}></Country>)}
        </ul>
    )
}

export default Countries