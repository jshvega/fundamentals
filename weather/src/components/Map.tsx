import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import MapLegend from './MapLegend'
import type { Coordinates, MapType } from '../types'
import { useEffect } from 'react'
const key = import.meta.env.VITE_OWM_KEY

type MapProps = {
    coordinates:Coordinates
    type:MapType
}

function RecenterMap({lat, lon}:Coordinates){

    const map = useMap()

    useEffect(() => {
        map.setView([lat, lon], 7)
    }, [lat, lon, map])

    return null
}

export default function Map({coordinates, type}:MapProps){
    return (
        <div className={styles.mapWX}>

            <div className={styles.mapLabel}>
                <span>Map</span>
            </div>

            <div className={styles.widgetMain}>

                <MapContainer className={styles.mapContainer} center={[coordinates.lat, coordinates.lon]} zoom={7}>

                    {/*BASE MAP*/}
                    <TileLayer 
                        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {/* <TileLayer 
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    /> */}

                    {/*OVERLAYS*/}
                    <TileLayer
                        key={type} 
                        url={`https://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${key}`}
                        attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
                    />

                    <RecenterMap 
                        lat={coordinates.lat}
                        lon={coordinates.lon}
                    />

                </MapContainer>

                <MapLegend type={type}/>

            </div>

        </div>
    )
}