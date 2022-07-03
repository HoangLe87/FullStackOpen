const { response, request } = require('express')
const express = require('express')
const app = express()

app.use(express.json())
persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res) => {
    res.json(persons)
})

app.get('/info', (req, res)=> {
    res.send(
        `<div>Phonebook has ${persons.length} people</div>
        ${new Date()}`)
})

app.get('/api/persons/:id', (req,res)=> {
    const id = Number(req.params.id)
    const personId = persons.find(x => x.id===id)
    if (personId)
        res.json(personId)
    else
        res.status(404).send('This person does not exist')
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
    res.status(204).end()
  })

const generateId = () => Math.floor(Math.random()*100)

app.post('/api/persons', (request, response)=> {
    const body = request.body
    if (!(body.name && body.number)) {
        response.status(400).json({error:'missing content'})
    } else if (persons.find(person=>person.name===body.name)) {
        response.status(400).json({error:'name must be unique'})
    }
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})
