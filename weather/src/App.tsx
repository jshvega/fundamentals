// import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from './api'

import CurrentWeather from "./components/CurrentWeather"
import CloudIcon from "./assets/cloud.svg?react"


function App(){
  const cityName = "Tokyo"

  // useQuery: the hook that runs a fetch function and hands back its state
  const {data, isPending, isError} = useQuery({
    queryKey: ["geocode", cityName], //unique label for this query's cached result
    queryFn: () => getGeocode(cityName) //the function that does the fetching
  })

  // Guards
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>

  // return
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      <CurrentWeather condition="Broken Clouds" conditionIcon={CloudIcon} temp={24} time="10:12 A.M." wind={4} humidity={48} visibility={1.6}/>
    </>
  )
}



export default App