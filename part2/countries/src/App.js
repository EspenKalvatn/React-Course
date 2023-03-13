import {useEffect, useState} from "react";
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Countries fetched')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      <Search handler={handleSearch} value={search}/>
      <DisplayCountries countries={countries} searchFilter={search}/>
    </div>
  )
}


const Search = ({handler, value}) => {
  return (
    <div>find countries <input onChange={handler} value={value}/></div>
  )
}

const Country = ({ country, expand }) => {

  const lat = country.latlng[0]
  const lng = country.latlng[1]


  return (
    expand?
      <div>
        <h2>{country.name.common}</h2>
        {`Capital: ${country.capital}`}<br/>
        {`Area: ${country.area}`}
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => <li>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
        <p>{country.flags.alt}</p>
        {/*<Weather lat={lat} lng={lng}/>*/}
      </div>
      :
      <>{country.name.common}</>
  )
}


// const Weather = ({lat, lng}) => {
//   const response = axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`)
//     .then(response => {
//       console.log(response.data)
//     })
//
//
//   return (
//     response?
//       <div>{response.data.properties.timeseries[0].data.instant.details.air_temperature}</div>
//       :
//       <div>Nei</div>
//
//   )
// }


const DisplayCountries = ({countries, searchFilter}) => {
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase()) ||
    country.name.official.toLowerCase().includes(searchFilter.toLowerCase())
  )


  if (filtered.length > 10) {
    return (
      <div>To many matches, specify another filter</div>
    )
  }
  else if (filtered.length === 0) {
    return (
      <div>No matches, try another filter</div>
    )
  }
  else if (filtered.length === 1) {
    return (
      <div>{ <Country country={filtered[0]} expand={true}/> }</div>
    )
  }
  else {
    return (
      <div>{ filtered.map(country => {
        return (
          <div>
          <Country country={country} expand={false}/><button>show</button>
          </div>
        )
      })}
      </div>
    )
  }

}

export default App;
