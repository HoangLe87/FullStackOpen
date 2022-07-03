
export const Persons = ({searchResult,deleteName}) => {
  return (
    <li>{searchResult.name} {searchResult.number} <button type='button' onClick={deleteName}>delete</button></li>
  )
}

export const PersonForm = ({addNewName, newName, handleInputField, hadleInputNumber}) => {
  return (
    <form onSubmit={addNewName}>
    <div>
      name: <input value={newName} onChange={handleInputField}/>
    </div>
    <div>number: <input onChange={hadleInputNumber}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export const Filter = ({handleSearch}) => {
  return (
    <div>filter shown with <input onChange={handleSearch}/></div>
  )
}
