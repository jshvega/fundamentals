// import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from './api'




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
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}




export default App