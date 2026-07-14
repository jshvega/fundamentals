export type Coordinates = {
    lat:number,
    lon:number
}

export type Units = "metric" | "imperial"

export type MapType = 
    "clouds_new" | 
    "precipitation_new" | 
    "temp_new" | 
    "pressure_new" | 
    "wind_new"