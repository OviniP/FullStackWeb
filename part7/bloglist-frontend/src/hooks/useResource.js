import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (url) => {
    const [resources, setResources] = useState([])

    useEffect( () => {
        const getResources = async () =>{
            const response = await axios.get(url)
            setResources(response.data)
        }
        getResources()
    }, [url])

    const services = {}

    return [resources, services]

}
/*
let token

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getTokenConfig = () => {
  return  {
    headers : { Authorization : token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const token = getTokenConfig()
  const response = await axios.post(baseUrl,blog, token)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getTokenConfig())
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`,getTokenConfig())
  return response
}

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog
}*/