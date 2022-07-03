import { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons} from './components'
import connection from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('type something...')
  const [newNumber, setNewNumber] = useState('')
  const [search,setSearch] =useState(true)
  const [searchValue,setSearchValue] =useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const Notification = () => {
    if (errorMessage===null) return null
    else return <div className='error'>{errorMessage}</div>
  }

  useEffect(()=>{
    connection.getAll().then(initialData => setPersons(initialData))
  }, [])

  const handleInputField = (e) => {
    setNewName(e.target.value)
  }
  const hadleInputNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    if (searchValue.length!=='') {
      setSearch(true)
    } else {
      setSearch(false)
    }
  }

  const addNewName = (e) => {
    e.preventDefault()
    const newNameObject = {
      name: newName,
      number: newNumber
    }
    if (duplicateCheck()) {
      const findName = persons.find(person=>person.name===newName)
      const changedName = {...findName, number: newNumber}
      connection.update(findName.id,changedName).then(result => setPersons(persons.map(person=> person.id != findName.id ? person : changedName)))
    } 
    else {
      connection.create(newNameObject).then(results=>setPersons(persons.concat(results)))
      setNewName('someone else?')
      setErrorMessage(`Succesfully added ${newNameObject.name}`)
      setTimeout(()=> setErrorMessage(null),3000)
    }
  }

  const duplicateCheck = () => {
    for (let i of persons) {
      if (i.name.includes(newName)) {
        alert(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        return true
      }
    }
  }

  const deleteName = (id) => {
    const nameObject = persons.find(person => person.id===id)
    if (window.confirm(`delete ${nameObject.name}?`)) {
      connection.deletePerson(id).then(x => setPersons(persons.filter(person=>person.id!=id)))
    }
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return <div style={footerStyle}>
      <br/>
      <em>Created by Hoang 2022</em>
    </div>
  }

  const searchResults  = search ? persons.filter(person => person.name.toLowerCase().startsWith(searchValue.toLowerCase())) : persons
  return (
    <div>
      <h2 className='test'>Phonebook</h2>
      <Notification errorMessage={errorMessage}/>
      <Filter handleSearch={handleSearch}/>
      <h2>add a new </h2>
      <PersonForm addNewName={addNewName} newName={newName} handleInputField={handleInputField} hadleInputNumber={hadleInputNumber}/>
      <h2>Numbers</h2>
      {searchResults.map(searchResult => <Persons key={searchResult.id} searchResult={searchResult} deleteName={()=>deleteName(searchResult.id)}/>)}
      <Footer />
    </div>
  )
}

export default App
