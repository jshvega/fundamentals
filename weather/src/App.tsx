// React + Styles
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import styles from './App.module.css'

// API fns
import { 
  getGeocode,
  getWeather,
  getDaily,
  getHourly,
  getAddl,
  getAirPollution
} from './api'

// Mapper
import {
  mapCurrentWeather,
  mapDailyWeather,
  mapHourlyWeather,
  mapAddl,
  mapAqi
} from './lib/mappers.tsx'

// Types
import type { MapType } from './types'

// Components
import CurrentWeather     from "./components/CurrentWeather"
import DailyWeather       from "./components/DailyForecast"
import HourlyWeather      from "./components/HourlyForecast"
import Addl               from "./components/Addl"
import Aqi                from "./components/Aqi"
import Map                from "./components/Map"
import LocationDropdown   from "./components/LocationDropdown"
import UnitsDropdown      from "./components/UnitsDropdown"
import TypeDropdown       from "./components/TypeDropdown"


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
  if (
       !dailyData 
    || !weatherData 
    || !hourlyData 
    || !addlData 
    || !airData 
    || !coordinates
  ) return <p>Something went wrong</p> // Placeholder. Will polish in Phase 9.


  /* --- RETURN --- */
  return (
    <>
      <div className={styles.viewport}>
        <div className={styles.content}>

          <div className={styles.topNav}>
            <div className={styles.projectName}>
              <a className={styles.fundamentals} href='fundamentals.manfred.studio/'>FUNDAMENTALS</a>
              <p className={styles.weatherDashboard}>Weather Dashboard</p>
            </div>
            <div className={styles.dropdownBar}>
              <TypeDropdown current={mapType} onChange={setMapType}/>
              <UnitsDropdown current={units} onChange={setUnits}/>
              <LocationDropdown current={city} onChange={setCity}/>
            </div>
          </div>

          <div className={styles.widgetGrid}>

            <Map coordinates={coordinates} type={mapType}/>
          
            <CurrentWeather {...mapCurrentWeather(weatherData, units)}/>

            <DailyWeather {...mapDailyWeather(dailyData, units)}/>

            <HourlyWeather {...mapHourlyWeather(hourlyData, units)}/>
          
            <Addl {...mapAddl(addlData)}/>

          </div>
        </div>

        <div className={styles.sidePanel}>
          <Aqi {...mapAqi(airData)}/>
        </div>
      </div>
    </>
  )
}

export default App