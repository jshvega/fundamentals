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
import WidgetError        from './components/WidgetError.tsx'
import AqiError           from './components/AqiError.tsx'
import FullPageError      from './components/FullPageError.tsx'

// Skeletons
import WidetSkeleton from './components/skeletons/WidetSkeleton.tsx'
import AqiSkeleton from './components/skeletons/AqiSkeleton.tsx'


function App(){

  /* ---  USE SATES --- */
  const [city, setCity] = useState("Mexico City")
  const [units, setUnits] = useState<"metric" | "imperial">("metric")
  const [mapType, setMapType] = useState<MapType>("precipitation_new")


  /* --- USEQUERY --- */
  // Geocode
  const {data:geoData, isPending:geoPending, isError:geoError} = useQuery({ // useQuery: the hook that runs a fetch function and hands back its state
    queryKey: ["geocode", city], //unique label for this query's cached result
    queryFn: () => getGeocode(city) //the function that does the fetching
  })
  const coordinates = geoData?.[0]
  // Current weather
  const {data:weatherData, isPending:weatherPending, isError:weatherError} = useQuery({
    queryKey: ["weather", coordinates?.lat, coordinates?.lon],
    queryFn: () => getWeather(coordinates!),
    enabled: !!coordinates,
  })
  // Daily forecast
  const {data:dailyData, isPending:dailyPending, isError:dailyError} = useQuery({
    queryKey: ["daily", coordinates?.lat, coordinates?.lon],
    queryFn: () => getDaily(coordinates!),
    enabled: !!coordinates,
  })
  // Daily hourly
  const {data:hourlyData, isPending:hourlyPending, isError:hourlyError} = useQuery({
    queryKey: ["hourly", coordinates?.lat, coordinates?.lon],
    queryFn: () => getHourly(coordinates!),
    enabled: !!coordinates,
  })
  // Addl info
  const {data:addlData, isPending:addlPending, isError:addlError} = useQuery({
    queryKey: ["addl", coordinates?.lat, coordinates?.lon],
    queryFn: () => getAddl(coordinates!),
    enabled: !!coordinates,
  })
  // Air pollution
   const {data:airData, isPending:airPending, isError:airError} = useQuery({
    queryKey: ["air_pollution", coordinates?.lat, coordinates?.lon],
    queryFn: () => getAirPollution(coordinates!),
    enabled: !!coordinates,
  })


  /* --- GUARD --- */
  if (geoError) return <FullPageError />


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

            <div className={styles.mapCell}>
              {geoPending ? <WidetSkeleton label='Map'/>
              : geoError || !coordinates ? <WidgetError label="Map"/>
              : <Map coordinates={coordinates} type={mapType}/> }
            </div>

            <div className={styles.currentCell}>
              {weatherPending ? <WidetSkeleton label='Current Weather'/>
              : weatherError || !weatherData ? <WidgetError label="Current Weather"/>
              : <CurrentWeather {...mapCurrentWeather(weatherData, units)}/> }
            </div>

            <div className={styles.dailyCell}>
              {dailyPending ? <WidetSkeleton label='Daily Forecast'/>
              : dailyError || !dailyData ? <WidgetError label="Daily Forecast"/>
              : <DailyWeather {...mapDailyWeather(dailyData, units)}/> }
            </div>

            <div className={styles.hourlyCell}>
              {hourlyPending ? <WidetSkeleton label='Hourly Forecast'/>
              : hourlyError || !hourlyData ? <WidgetError label="Hourly Forecast"/>
              : <HourlyWeather {...mapHourlyWeather(hourlyData, units)}/> }
            </div>

            <div className={styles.addlCell}>
              {addlPending ? <WidetSkeleton label='Additional Information'/>
              : addlError || !addlData ? <WidgetError label="Additional Information"/>
              : <Addl {...mapAddl(addlData)}/> }
            </div>
            
          </div>
        </div>

        <div className={styles.sidePanel}>

          {airPending ? <AqiSkeleton/>
            : airError || !airData ? <AqiError/>
            : <Aqi {...mapAqi(airData)}/> }

        </div>
      </div>
    </>
  )
}

export default App