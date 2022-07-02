import axios from 'axios'

const URL = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response=>response.data)
}

const create = (newNoteObject) => {
    const request = axios.post(URL,newNoteObject)
    return request.then(response=>response.data)
}


const update = (id,changedNote) => {
    const request = axios.put(`${URL}/${id}`,changedNote)
    return request.then(response=>response.data)
}

export default {getAll, create, update}