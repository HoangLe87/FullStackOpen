const express = require('express')
const cors = require('cors')
const { allowedNodeEnvironmentFlags } = require('process')

let notes = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2022-1-17T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2022-1-17T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2022-1-17T19:20:14.298Z",
      "important": true
    }]

app=express()

app.use(express.json())
app.use(cors())

const PORT = 3001

app.get('/', (request, response)=> {
    response.send('<div>click here for <a href="/notes">notes</a></div>')
})

app.get('/notes/', (request, response)=> {
    response.json(notes)
})

app.get('/notes/:id', (request, response)=> {
    const id = Number(request.params.id)
    let note = notes.find(note=>note.id===id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).send(`${id} is not a valid id`)
    }
})

app.delete('/notes/:id', (request, response)=> {
    const id = Number(request.params.id)
    notes = notes.filter(note=>note.id!==id)
    response.status(204).end()
    }
)
app.post('/notes/', (request, response)=> {
    if (!request.body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }

    let maxId = notes.length>0
        ? Math.max(...notes.map(i=>i.id))
        : 0
    let index = maxId+1
    let newNote = {
        id: index,
        content: request.body.content,
        date: new Date(),
        important: request.body.important?request.body.important:false
    }
    notes = notes.concat(newNote)
    response.json(notes)
})

app.put('/notes/:id', (request, response)=> {
    const id = Number(request.params.id)
    let note = notes.find(note=>note.id===id)
    changedNotes = notes.concat(request.body)
    response.json(notes)
})

app.listen(PORT)
console.log(`app is running on port ${PORT}`)