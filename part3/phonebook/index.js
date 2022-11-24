const express = require('express')
const cors = require('cors')

let people = [
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

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/people', (request, response)=> {
    response.json(people)
})

app.get('/info', (request, response)=> {
    response.send(
        `<div>Phonebook has info for ${people.length} people</br></br>
        ${new Date()}
        </div>`
    )
})

app.get('/api/people/:id', (request, response)=> {
    let id = Number(request.params.id)
    person = people.find(i=>i.id===id)
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = 'id not found!'
        response.status(404).end()
    }
})

app.delete('/api/people/:id', (request, response)=> {
    let id = Number(request.params.id)
    people = people.filter(i=>i.id !== id)
    response.status(204).end()
})

app.post('/api/people/', (request, response)=> {
    let id = people.length>0
        ? Math.max(...people.map(i=>i.id))+1
        : 0

    const person = {
        id: id,
        name: request.body.name,
        number: request.body.number,
    }
    if (!request.body.name) {
        response.statusMessage='name is missing'
        return response.status(204).end()
    }
    else if (!request.body.number) {
        response.statusMessage='number is missing'
        return response.status(204).end()
    }
    
    else if (people.find(i=>i.name===request.body.name)) {
        response.statusMessage='name must be unique'
        return response.status(204).end()
    }
    else {
        people = people.concat(person)
        response.json(person)
    }
})


const PORT = 3001

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})