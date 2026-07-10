import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { MapContainer, TileLayer } from "react-leaflet"
import type { Coordinates } from '../types'

type Props = {
    coordinates:Coordinates
}

export default function Map({coordinates}:Props){
    return (
        <>
        <MapContainer className={styles.mapContainer} center={[coordinates.lat, coordinates.lon]} zoom={10}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        </MapContainer>
        </>
    )
}