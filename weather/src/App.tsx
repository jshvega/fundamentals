// import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from './api'
import { getWeather } from './api'
import { getForecast } from './api'

import {msToKm, mToKm, formatLocalTime} from './lib/utils'

import CurrentWeather from "./components/CurrentWeather"
import WeatherIcon from "./components/WeatherIcon"


function App(){
  const cityName = "Tokyo"


  /* --- useQuery --- */
  // useQuery: the hook that runs a fetch function and hands back its state
  const {data:geoData, isPending, isError} = useQuery({
    queryKey: ["geocode", cityName], //unique label for this query's cached result
    queryFn: () => getGeocode(cityName) //the function that does the fetching
  })
  const coordinates = geoData?.[0]

  const {data:weatherData} = useQuery({
    queryKey: ["weather", coordinates?.lat, coordinates?.lon],
    queryFn: () => getWeather(coordinates!),
    enabled: !!coordinates,
  })

  const {data:forecastData} = useQuery({
    queryKey: ["forecast", coordinates?.lat, coordinates?.lon],
    queryFn: () => getForecast(coordinates!),
    enabled: !!coordinates,
  })


  /* --- GUARDS --- */
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  if (!weatherData) return <p>Something went wrong</p> // Placeholder. Will polish in Phase 9.


  /* --- RETURN --- */
  return (
    <>

      <pre>{JSON.stringify(geoData, null, 2)}</pre>
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      <pre>{JSON.stringify(forecastData, null, 2)}</pre>

      <CurrentWeather 
        // No mapping function. Mapped inline.
        condition={weatherData.weather[0].description}
        conditionIcon={<WeatherIcon iconCode={weatherData.weather[0].icon}/>}
        temp={Math.round(weatherData.main.temp)} 
        time={formatLocalTime(weatherData.dt, weatherData.timezone)} 
        wind={msToKm(weatherData.wind.speed)} 
        humidity={weatherData.main.humidity} 
        visibility={mToKm(weatherData.visibility)}
      />

    </>
  )
}



export default App