const axios = require('axios')
const DATA_URL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001'

module.exports = async function (locations) {
  const Authorization = process.env.OPEN_DATA_AUTH_CODE
  const authParam = `Authorization=${Authorization}`
  const locationParam = `locationName=${locations.join(',')}`

  const url = DATA_URL + '?' + authParam + '&' + locationParam
  // console.log(url)
  const res = await axios.get(url)
  return res.data
}
