// import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from './api'
import { getWeather } from './api'
import { getDaily } from './api'
import { getHourly } from './api'
import { getAddl } from "./api"
import { getAirPollution } from "./api"

import {msToKm, mToKm, formatLocalTime, formatWeekday} from './lib/utils'
// formatLocalTime2, formatLocalTime3, formatDegs

import CurrentWeather from "./components/CurrentWeather"
import DailyWeather from "./components/DailyForecast"
// import HourlyWeather from "./components/HourlyForecast"
// import Addl from "./components/Addl"
import Aqi from "./components/Aqi"

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

  // DAILY HOURLY
  const {data:hourlyData} = useQuery({
    queryKey: ["hourly", coordinates?.lat, coordinates?.lon],
    queryFn: () => getHourly(coordinates!),
    enabled: !!coordinates,
  })

  // ADDL INFO
  const {data:addlData} = useQuery({
    queryKey: ["addl", coordinates?.lat, coordinates?.lon],
    queryFn: () => getAddl(coordinates!),
    enabled: !!coordinates,
  })

  // AIR POLLUTION
   const {data:airData} = useQuery({
    queryKey: ["air_pollution", coordinates?.lat, coordinates?.lon],
    queryFn: () => getAirPollution(coordinates!),
    enabled: !!coordinates,
  })


  /* --- GUARDS --- */
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  if (!dailyData || !weatherData || !hourlyData || !addlData || !airData) return <p>Something went wrong</p> // Placeholder. Will polish in Phase 9.


  /* --- RETURN --- */
  return (
    <>
 
      <pre>{JSON.stringify(airData, null, 2)}</pre>

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
        day={formatWeekday(dailyData.data[0].dt, dailyData?.timezone_offset)}
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

      {/*
      <HourlyWeather 
        items={hourlyData.data.slice(0, 12).map(item=>({
          time: formatLocalTime2(item.dt, hourlyData?.timezone_offset),
          icon:<WeatherIcon iconCode={item.weather[0].icon}/>,
          temp: Math.round(item.temp),
        }))}
      />
      */}

      {/*
      <Addl 
        preassure={addlData.data[0].pressure}
        cloudiness={addlData.data[0].clouds}
        uv={addlData.data[0].uvi}
        winddeg={formatDegs(addlData.data[0].wind_deg)}
        sunset={formatLocalTime3(addlData.data[0].sunset, addlData.timezone_offset)}
        sunrise={formatLocalTime3(addlData.data[0].sunrise, addlData.timezone_offset)}
      />
      */}

      <Aqi
        aqi={airData.list[0].main.aqi}
        pmtwo={Math.round(airData.list[0].components.pm2_5)}
        pmten={Math.round(airData.list[0].components.pm10)}
        othree={Math.round(airData.list[0].components.o3)}
        notwo={Math.round(airData.list[0].components.no2)}
        co={Math.round(airData.list[0].components.co)}
      />

    </>
  )
}



export default App