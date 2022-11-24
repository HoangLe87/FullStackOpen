
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [newNote, setNewNote] = useState('new Note')
  const [allNotes, setAllNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  const filteredNotes = showAll
    ? allNotes
    : allNotes.filter(i=>i.important===true)

  const saveNote = async(e) => {
    e.preventDefault()
    let newNoteObject = {
      content: newNote,
    }
    let promise = await axios.post('/notes/', newNoteObject)
    if (promise.status===200) {
      setAllNotes(promise.data)
    }
  }

  const inputUpdate = (e) => {
    setNewNote(e.target.value)
  }

  const showAllNotes = () => {
    setShowAll(!showAll)
  }

  useEffect(()=> {
    let result = (async() => {
      let promise = await axios.get('/notes')
      setAllNotes(promise.data)
    })()
  }, [])


  return (
    <div>
    <h1>Notes</h1>
    <button onClick={showAllNotes}>{showAll?'show important':'show all'}</button>
    <ul>
      {filteredNotes.map(i=><li key={i.id}>{i.content} 
      <button>{i.important?'make not important':'make important'}</button></li>)}
    </ul>
    <form onSubmit={saveNote}>
      <input value={newNote} onChange={inputUpdate}/>
      <button type="submit">save</button>
    </form>   
  </div>
)
}

export default App;
