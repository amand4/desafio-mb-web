const BASE_URL = 'http://localhost:3000/api/'

export const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(`Error - ${response.status}: Some information is missing from the form`)
      } else if (response.status === 500) {
        throw new Error(`Error - ${response.status}: Internal server error`)
      } else {
        throw new Error(`Error - ${response.status} sending data to the API'`)
      }
    }

    return await response.json()
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}
