const axios = require('axios')

const fetchApplicationData = async id => {
  try {
    const response = await axios.get(
      `http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/${id}`,
    )
    return response.data
  } catch (error) {
    console.error('Error fetching application data:', error.message)
    throw new Error('Failed to fetch application data.')
  }
}

module.exports = {fetchApplicationData}
