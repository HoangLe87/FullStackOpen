import axios from 'axios'
import {useState, useEffect} from 'react'
import {Content, SubmitBar, FilterButton} from './components'
import Hoang from './services'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote,setNewNote] = useState('type in something...')
  const [filter,setFilter] = useState(true)


  useEffect(() => {
    Hoang.getAll()
         .then(initialNotes=>setNotes(initialNotes))
  }, [])

  const handleAddNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random()>0.5,
    }
    Hoang.create(newNoteObject)
         .then(returnedNote=> {
           setNotes(notes.concat(returnedNote))
           setNewNote('type in something...')
         })
  }
  
  const handleFilterButton = () => setFilter(!filter)
  const handleUserInput = event => setNewNote(event.target.value)
  
  
  const toggleImportance = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    Hoang.update(id,changedNote).then(returnedNote => {setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }) 
         .catch(error=> {
           alert(`the note '${note.content}' was already deleted from server`)
           setNotes(notes.filter(note=>note.id!=id))
         })
  }
 

  const notesToShow = filter ? notes.filter(note => note.important) : notes
 
  return(
    <div>
      <FilterButton filter={filter} handleFilterButton={handleFilterButton}/>
      <ul>
        {notesToShow.map(note => <Content key={note.id} note={note} toggleImportance={()=>toggleImportance(note.id)} />)}
      </ul>
      <SubmitBar handleAddNote={handleAddNote} newNote={newNote} handleUserInput={handleUserInput}/>
    </div>
  )
}


export default App
