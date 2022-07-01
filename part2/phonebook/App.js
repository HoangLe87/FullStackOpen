import { useState } from 'react'
import {Filter, PersonForm, Persons} from './components'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('type something...')
  const [newNumber, setNewNumber] = useState('')
  const [search,setSearch] =useState(true)
  const [searchValue,setSearchValue] =useState('')
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
    if (!duplicateCheck()) {
      setPersons(persons.concat(newNameObject))
      setNewName('someone else?') }
  }

  const duplicateCheck = () => {
    for (let i of persons) {
      if (i.name.includes(newName)) {
        alert(`${newName} is already added to the phonebook`)
        return true
      }
    }
  }
  const searchResults  = search ? persons.filter(person => person.name.toLowerCase().startsWith(searchValue.toLowerCase())) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>add a new </h2>
      <PersonForm addNewName={addNewName} newName={newName} handleInputField={handleInputField} hadleInputNumber={hadleInputNumber}/>
      <h2>Numbers</h2>
      <Persons searchResults={searchResults}/>
    </div>
  )
}

export default App
