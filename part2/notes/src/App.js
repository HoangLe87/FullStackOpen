
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [newNote, setNewNote] = useState('new Note')
  const [allNotes, setAllNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  const filteredNotes = showAll
    ? allNotes
    : allNotes.filter(i=>i.important===true)

  const saveNote = (e) => {
    e.preventDefault()
    let random = Math.random()
    let newNoteObject = {
      id: allNotes.length,
      content: newNote,
      important: (random>0.5)?true:false
    }
    setAllNotes(allNotes.concat(newNoteObject))
  }

  const inputUpdate = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportant = () => {
    setShowAll(!showAll)
  }

  useEffect(()=> {
    let result = (async() => {
      let promise = await axios.get('http://localhost:3001/notes')
      setAllNotes(promise.data)
    })()
  }, [])
 

  return (
    <div>
    <h1>Notes</h1>
    <button onClick={toggleImportant}>{showAll?'show important':'show all'}</button>
    <ul>
      {filteredNotes.map(i=><li key={i.id}>{i.content}</li>)}
    </ul>
    <form onSubmit={saveNote}>
      <input value={newNote} onChange={inputUpdate}/>
      <button type="submit">save</button>
    </form>   
  </div>
)
}

export default App;
