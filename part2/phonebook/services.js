import axios from "axios";
const URL = 'http://localhost:3001/persons'

const getAll = () => {
    const result = axios.get(URL)
    return result.then(response=>response.data)
}

const create = (newNameObject) => {
    return axios.post(URL, newNameObject).then(response=>response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${URL}/${id}`).then(response=>response.data)
}

const update = (id, changedName) => {
    return axios.put(`${URL}/${id}`,changedName).then(response=>response.data)
}

export default {getAll, create, deletePerson,update}
