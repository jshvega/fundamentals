import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { MapContainer, TileLayer } from "react-leaflet"
import type { Coordinates, MapType } from '../types'
const key = import.meta.env.VITE_OWM_KEY

type Props = {
    coordinates:Coordinates
    type:MapType
}

export default function Map({coordinates, type}:Props){
    return (
        <>
        <MapContainer className={styles.mapContainer} center={[coordinates.lat, coordinates.lon]} zoom={10}>

            {/*BASE MAP*/}
            <TileLayer 
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {/*OVERLAYS*/}
            <TileLayer 
                key={type} 
                url={`https://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${key}`}
                attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
            />

        </MapContainer>
        </>
    )
}