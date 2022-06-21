import axios from "axios"

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
  try {
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': 'd2f72cda5fmsh42ef0f1ceb90887p1c71bfjsnd8fe09dd87e7',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })

    return data

  } catch(error) {
    console.log(error)
  }
}
