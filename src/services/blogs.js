import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
  }
}

const update = async (updatedObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const response = await axios.put(baseUrl + `/${updatedObject._id}`, updatedObject, config)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
  }
}

const deleteBlog = async (objectToDelete) => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const response = await axios.delete(baseUrl + `/${objectToDelete._id}`, config)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
  }
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken, create, update, deleteBlog }