import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (data) => {
    if(!Object.keys(data).includes("votes")){
        data.votes = 0
    }
    const response = await axios.post(baseUrl,data)
    return response.data
}

const vote = async({...data}) => {
    data.votes = data.votes + 1
    await axios.put(`${baseUrl}/${data.id}`, data)
}


export default {
    getAll,
    create,
    vote
  }