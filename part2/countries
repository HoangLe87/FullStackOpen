import {useEffect, useState} from 'react'
import axios from 'axios'

const SingleView = ({country}) => {
  const langs = Object.values(country.languages)
  return (
    <div><h1>{country.name.common}</h1>
    <p> capital {country.capital[0]} </p>
    <p> area {country.area} </p>
    <h3>languages:</h3>
    <ul>
      {langs.map(lang=><li key={lang}>{lang}</li>)}
    </ul>
    <img src={country.flags.png}/>
  </div>
  )
}

const Results = ({countriesToShow, handleButtonClick}) => {
    console.log(handleButtonClick)
    if (countriesToShow.length>10){
        return <div>Too many matches, specify another filter</div>
    } else if (countriesToShow.length==1) {
      const langs = Object.values(countriesToShow[0].languages)
      return (
        <SingleView country={countriesToShow[0]} />
      )
    } else {
      return (
        countriesToShow.map(countryToShow=> <div key={countryToShow.name.common}>{countryToShow.name.common} <button id={countryToShow.name.common} onClick={handleButtonClick}>show</button></div>)
        )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [newSearch,setNewSearch] = useState(false)
  const [contents,setContents] = useState([])
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
         .then(response => setContents(response.data))
  },[])

  const handleSearch = (e) => {
    setNewSearch(true)
    setSearch(e.target.value)
  }

  const handleButtonClick = (e) => {
    setNewSearch(true)
    setSearch(e.target.id)
  }

  const countriesToShow = newSearch ? contents.filter(content => content.name.common.toLowerCase().startsWith(search.toLowerCase())) : contents

  return (
    <div>
      <div>find countries <input type='text' value={search} onChange={handleSearch}/></div>
      <Results countriesToShow={countriesToShow} handleButtonClick={handleButtonClick}/>
    </div>
  )
}

export default App
