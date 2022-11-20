import axios from 'axios'
import {useState, useEffect} from 'react'

const SearchBar = ({ country, filterFunc }) => {
  return (
    <div>
      <label>find countries</label>
      <input value={country} onChange={filterFunc}/>
    </div>
  )
}

const Display = ({results, show, setWeather, weather}) => {
  if (results.length>10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(results.length===1) {
    let languageArray = Object.values(results[0].languages)
    return(
      <div>
        <h1>{results[0].name.common}</h1>
        <p>capital {results[0].capital}</p>
        <p>area {(results[0].area/1000).toFixed(2)}k km2</p>
        <br/>
        <p><b>Languages</b></p>
        <ul>
          {languageArray.map(i=><li key={languageArray.indexOf(i)}>{i}</li>)}
        </ul>
          <div className='flag'><img src={results[0].flags.png}/></div>
          <ShowWeather results={results} setWeather={setWeather} weather={weather}/>
      </div>
    )
  } else {
    return (
      <ul>
        {results.map(country => <li key={results.indexOf(country)}>{country.name.common} <button id={results.indexOf(country)} onClick={show}>show</button></li>)}
      </ul>
    )
  }
}

const ShowWeather = ({results, setWeather, weather}) => {
  const options = {
    method: 'GET',
    url: process.env.REACT_APP_URL,
    params: {q: results[0].capital[0], days: '3'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_KEY_HOST,
    }
  };

  useEffect(()=>{
    let getWeather = (async () => {
      let promise = await axios.request(options)
      setWeather(promise.data)
    })()
  },[results[0]])

  if (weather) {
    return (
      <div>
        <h1>Weather in {weather.location.name}</h1>
        <p>{weather.location.localtime}</p>
        <p>{weather.current.condition.text}</p><img src={weather.current.condition.icon}/>
        <p>current temperature: {weather.current.temp_c} °C</p>
      </div>
    )
  }
}

function App() {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [weather, setWeather] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  useEffect(()=> {
    let fetchData = (async() => {
      let promise = await axios.get(process.env.REACT_APP_COUNTRIES_URL)
      setAllCountries(promise.data)
    })()
  }, [])

  const filterFunc = (e) => {
    setCountry(e.target.value)
    if (e.target.value==='') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const results = showAll
    ? allCountries
    : allCountries.filter(i=>i.name.common.toLowerCase().includes(country.toLowerCase()))

  const show = (e) => {
    let index = e.target.id
    setCountry(results[index].name.common)
  }

  return (
    <div className="App">
      <SearchBar country={ country } filterFunc={ filterFunc }/>
      <Display results={results} show={show} setWeather={setWeather} weather={weather} />
    </div>
  );
}

export default App;
