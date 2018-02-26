import axios from 'axios'
const baseUrl = '/api/observations'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObservation) => {
  const response = await axios.post(baseUrl, newObservation)
  return response.data
}
export default {
  getAll, create
}
