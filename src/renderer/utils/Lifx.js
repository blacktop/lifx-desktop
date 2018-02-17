import axios from 'axios'

class LIFX {
  constructor(api_key) {
    this.api = axios.create({
      baseURL: 'https://api.lifx.com/v1',
      timeout: 1000,
      headers: { Authorization: 'bearer' + api_key },
    })
  }

  toggleAll() {
    console.log('Toggle all lights')

    this.api
      .post('/lights/all/toggle')
      .then(response => {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  getAllLights() {
    this.api
      .get('/lights/all')
      .then(response => {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  getAllScenes() {
    this.api
      .get('/scenes')
      .then(response => {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

export default LIFX
