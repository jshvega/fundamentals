// import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from './api'
import { getWeather } from './api'
import { getDaily } from './api'

import {msToKm, mToKm, formatLocalTime, formatWeekday} from './lib/utils'

import CurrentWeather from "./components/CurrentWeather"
import DailyWeather from "./components/DailyForecast"
import WeatherIcon from "./components/WeatherIcon"


function App(){
  const cityName = "Mexico City"


  /* --- useQuery --- */

  // GEOCODE
  // useQuery: the hook that runs a fetch function and hands back its state
  const {data:geoData, isPending, isError} = useQuery({
    queryKey: ["geocode", cityName], //unique label for this query's cached result
    queryFn: () => getGeocode(cityName) //the function that does the fetching
  })
  const coordinates = geoData?.[0]

  // CURRENT WEATHER
  const {data:weatherData} = useQuery({
    queryKey: ["weather", coordinates?.lat, coordinates?.lon],
    queryFn: () => getWeather(coordinates!),
    enabled: !!coordinates,
  })

  // DAILY FORECAST
  const {data:dailyData} = useQuery({
    queryKey: ["daily", coordinates?.lat, coordinates?.lon],
    queryFn: () => getDaily(coordinates!),
    enabled: !!coordinates,
  })


  /* --- GUARDS --- */
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  if (!dailyData || !weatherData) return <p>Something went wrong</p> // Placeholder. Will polish in Phase 9.


  /* --- RETURN --- */
  return (
    <>
 
      {/* 
      <pre>{JSON.stringify(dailyData, null, 2)}</pre>
      */}

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

      <DailyWeather 
        day={formatWeekday(dailyData?.data[0].dt, dailyData?.timezone_offset)}
        temp={Math.round(dailyData.data[0].temp.day)}
        max={Math.round(dailyData.data[0].temp.max)} 
        min={Math.round(dailyData.data[0].temp.min)}

        strips={dailyData.data.slice(1, 6).map(day=>({
          day: formatWeekday(day.dt, dailyData?.timezone_offset),
          temp: Math.round(day.temp.day),
          max: Math.round(day.temp.max),
          min: Math.round(day.temp.min),
        }))}
      />

    </>
  )
}



export default App