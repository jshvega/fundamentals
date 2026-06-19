import { geocodeSchema } from './schemas/geocodeSchema'
const key = import.meta.env.VITE_OWM_KEY

export async function getGeocode(cityName:string) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`

    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`API failed: ${response.status}`)
    }

    const data = await response.json()
    return geocodeSchema.parse(data)
}