import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './components/Queries'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, {
    //pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm notify={notify}/>
      <PhoneForm notify={notify}/>
    </div>
  )
}

export default App
