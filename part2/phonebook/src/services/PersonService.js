import axios from 'axios'

const baseUrl = '/api/persons/'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
  }

const remove = (personId) => {
    const url = `${baseUrl}${personId}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const update = (person) =>
{
    const request = axios.put(`${baseUrl}${person.id}`, person)
    return request.then(response => response.data)
}

export default {
    getAll,
    add,
    update,
    remove
}