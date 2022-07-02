const Content = ({note, toggleImportance}) => {
  return (
    <li>{note.content}
    <button onClick={toggleImportance}>{note.important ? 'make NOT Imp' : 'make IMP'}</button></li>
  )
}

const FilterButton = ({filter,handleFilterButton}) => {
  return(
    <div>
      <h1>Your Notes</h1>
      <button type='button' onClick={handleFilterButton}>show {filter? 'ALL' : 'IMP'}</button>
    </div>
  )
}

const SubmitBar = ({newNote,handleAddNote,handleUserInput}) => {
  return (
    <div>
      <form onSubmit={handleAddNote}>
        <input value={newNote} onChange={handleUserInput}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export {Content, SubmitBar, FilterButton} 