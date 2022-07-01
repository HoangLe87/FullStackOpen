export const Persons = ({searchResults}) => {
  return (
    searchResults.map(searchResult => <div key={searchResult.name}>{searchResult.name} {searchResult.number}</div>)
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
