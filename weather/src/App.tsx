// import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from './api'
import { getWeather } from './api'
import { getDaily } from './api'
import { getHourly } from './api'
import { getAddl } from "./api"
import { getAirPollution } from "./api"

import {formatWind, formatVisibility, formatTemp, formatTemp2, formatLocalTime, formatLocalTime2, formatWeekday} from './lib/utils'
// formatLocalTime3, formatDegs

import CurrentWeather from "./components/CurrentWeather"
import DailyWeather from "./components/DailyForecast"
import HourlyWeather from "./components/HourlyForecast"
// import Addl from "./components/Addl"
// import Aqi from "./components/Aqi"
import LocationDropdown  from "./components/LocationDropdown"
import UnitsDropdown  from "./components/UnitsDropdown"

import WeatherIcon from "./components/WeatherIcon"
import { useState } from "react"


function App(){

  const [city, setCity] = useState("Mexico City")
  const [units, setUnits] = useState<"metric" | "imperial">("metric")


  /* --- useQuery --- */

  // GEOCODE
  // useQuery: the hook that runs a fetch function and hands back its state
  const {data:geoData, isPending, isError} = useQuery({
    queryKey: ["geocode", city], //unique label for this query's cached result
    queryFn: () => getGeocode(city) //the function that does the fetching
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
 
      {/*<pre>{JSON.stringify(airData, null, 2)}</pre>*/}

      <CurrentWeather 
        // No mapping function. Mapped inline.
        condition={weatherData.weather[0].description}
        conditionIcon={<WeatherIcon iconCode={weatherData.weather[0].icon}/>}
        temp={formatTemp2(weatherData.main.temp, units)} 
        time={formatLocalTime(weatherData.dt, weatherData.timezone)} 
        wind={formatWind(weatherData.wind.speed, units)} 
        humidity={weatherData.main.humidity} 
        visibility={formatVisibility(weatherData.visibility, units)}
      />

      <DailyWeather 
        day={formatWeekday(dailyData.data[0].dt, dailyData?.timezone_offset)}
        temp={formatTemp(dailyData.data[0].temp.day, units)}
        max={formatTemp(dailyData.data[0].temp.max, units)} 
        min={formatTemp(dailyData.data[0].temp.min, units)}

        strips={dailyData.data.slice(1, 6).map(day=>({
          day: formatWeekday(day.dt, dailyData?.timezone_offset),
          temp: formatTemp(day.temp.day, units),
          max: formatTemp(day.temp.max, units),
          min: formatTemp(day.temp.min, units),
        }))}
      />

      <HourlyWeather 
        items={hourlyData.data.slice(0, 12).map(item=>({
          time: formatLocalTime2(item.dt, hourlyData?.timezone_offset),
          icon:<WeatherIcon iconCode={item.weather[0].icon}/>,
          temp: formatTemp(item.temp, units),
        }))}
      />

      <LocationDropdown current={city} onChange={setCity}/>

      <UnitsDropdown current={units} onChange={setUnits}/>

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

      {/*
      <Aqi
        aqi={airData.list[0].main.aqi}
        pmtwo={Math.round(airData.list[0].components.pm2_5)}
        pmten={Math.round(airData.list[0].components.pm10)}
        othree={Math.round(airData.list[0].components.o3)}
        notwo={Math.round(airData.list[0].components.no2)}
        co={Math.round(airData.list[0].components.co)}
      />
      */}

    </>
  )
}



export default App