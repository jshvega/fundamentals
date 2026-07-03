import { geocodeSchema } from './schemas/geocodeSchema'
import { weatherSchema } from './schemas/weatherSchema'
import { dailySchema } from './schemas/dailySchema'
import type { Coordinates } from './types'
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


export async function getWeather(coordinates:Coordinates) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${key}`

    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`API failed: ${response.status}`)
    }

    const data = await response.json()
    return weatherSchema.parse(data)
}


export async function getDaily(coordinates:Coordinates) {
    const url = `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${key}`

    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`API failed: ${response.status}`)
    }

    const data = await response.json()
    return dailySchema.parse(data)
}








