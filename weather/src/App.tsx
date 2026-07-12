// React
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

// API fns
import { 
  getGeocode, 
  getWeather, 
  getDaily,
  getHourly, 
  getAddl, 
  getAirPollution 
} from './api'

// Utils
import {
  formatWind, 
  formatVisibility, 
  formatTemp, formatDegs, 
  formatTemp2, formatLocalTime, 
  formatLocalTime2, 
  formatLocalTime3, 
  formatWeekday
} from './lib/utils'

// Types
import type { MapType } from './types'

// Components
import CurrentWeather from "./components/CurrentWeather"
import DailyWeather from "./components/DailyForecast"
import HourlyWeather from "./components/HourlyForecast"
import Addl from "./components/Addl"
import Aqi from "./components/Aqi"
import Map from "./components/Map"
import LocationDropdown  from "./components/LocationDropdown"
import UnitsDropdown  from "./components/UnitsDropdown"
import TypeDropdown from "./components/TypeDropdown"
import WeatherIcon from "./components/WeatherIcon"


function App(){

  /* ---  USE SATES --- */
  const [city, setCity] = useState("Mexico City")
  const [units, setUnits] = useState<"metric" | "imperial">("metric")
  const [mapType, setMapType] = useState<MapType>("precipitation_new")


  /* --- USEQUERY --- */
  // Geocode
  const {data:geoData, isPending, isError} = useQuery({ // useQuery: the hook that runs a fetch function and hands back its state
    queryKey: ["geocode", city], //unique label for this query's cached result
    queryFn: () => getGeocode(city) //the function that does the fetching
  })
  const coordinates = geoData?.[0]
  // Current weather
  const {data:weatherData} = useQuery({
    queryKey: ["weather", coordinates?.lat, coordinates?.lon],
    queryFn: () => getWeather(coordinates!),
    enabled: !!coordinates,
  })
  // Daily forecast
  const {data:dailyData} = useQuery({
    queryKey: ["daily", coordinates?.lat, coordinates?.lon],
    queryFn: () => getDaily(coordinates!),
    enabled: !!coordinates,
  })
  // Daily hourly
  const {data:hourlyData} = useQuery({
    queryKey: ["hourly", coordinates?.lat, coordinates?.lon],
    queryFn: () => getHourly(coordinates!),
    enabled: !!coordinates,
  })
  // Addl info
  const {data:addlData} = useQuery({
    queryKey: ["addl", coordinates?.lat, coordinates?.lon],
    queryFn: () => getAddl(coordinates!),
    enabled: !!coordinates,
  })
  // Air pollution
   const {data:airData} = useQuery({
    queryKey: ["air_pollution", coordinates?.lat, coordinates?.lon],
    queryFn: () => getAirPollution(coordinates!),
    enabled: !!coordinates,
  })


  /* --- GUARDS --- */
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  if (!dailyData || !weatherData || !hourlyData || !addlData || !airData || !coordinates) return <p>Something went wrong</p> // Placeholder. Will polish in Phase 9.


  /* --- RETURN --- */
  return (
    <>
 
      {/*<pre>{JSON.stringify(airData, null, 2)}</pre>*/}

      {/*
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
      */}

      <LocationDropdown current={city} onChange={setCity}/>

      <UnitsDropdown current={units} onChange={setUnits}/>

      <TypeDropdown current={mapType} onChange={setMapType}/>

      <Map coordinates={coordinates} type={mapType}/>

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