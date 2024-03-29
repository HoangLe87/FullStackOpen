
import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonFrom from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'


const App = () => {
  const [name, setName] = useState('Martin Fowler')
  const [number, setNumber] = useState('0000')
  const [phoneBook, setPhoneBook] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    let fetchData = (async() => {
      let promise = await axios.get('http://localhost:3001/api/people')
      setPhoneBook(promise.data)
    })()
  },[])

  const nameChange = (e) => {
    setName(e.target.value)
  }

  const numberChange = (e) => {
    setNumber(e.target.value)
  }

  const filterFunc = (e) => {
    if (e.target.value) {
      setFilter(e.target.value)
    } else {
      setFilter('')
    }
  }

  const display = filter
    ? phoneBook.filter(i=>i.name.toLowerCase().startsWith(filter.toLowerCase()))
    : phoneBook

  const add = (e) => {
    e.preventDefault()
    let newContactObject = {
      name: name,
      number: number,
    }
    let postRequestFunc = (async() => {
      let postRequest = await axios.post('/api/people/', newContactObject)
      setPhoneBook(phoneBook.concat(postRequest.data))
      console.log(postRequest.data)
    })()
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterFunc={filterFunc}/>
      <h1>add a new</h1>
      <PersonFrom name={name} number={number} numberChange={numberChange} add={add} nameChange={nameChange}/>
      <h1>Numbers</h1>
      <Persons display={display}/>
    </div>
  )
}

export default App