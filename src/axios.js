import axios from 'axios'

const axiosInstance = () => {
  return axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-FullContact-APIKey': '2a5de7a16697e442'
    }
  })
}

export default axiosInstance;
