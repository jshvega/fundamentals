import styles from './MapLegend.module.css'
import type { MapType } from '../types'

type Props = {
    type:MapType
}

const legendConfig:Record<MapType,{label:string, gradientClass:string, less:string, more:string}> = {
    clouds_new:{
        label: "Clouds",
        gradientClass: styles.gradientClouds,
        less: "Clear",
        more: "Overcast"
    },
    precipitation_new:{
        label: "Precipitation",
        gradientClass: styles.gradientPrecipitation,
        less: "Light",
        more: "Heavy"
    },
    pressure_new:{
        label: "Pressure",
        gradientClass: styles.gradientPressure,
        less: "Low",
        more: "High"
    },
    wind_new:{
        label: "Wind",
        gradientClass: styles.gradientWind,
        less: "Calm",
        more: "Strong"
    },
    temp_new:{
        label: "Temperature",
        gradientClass: styles.gradientTemperature,
        less: "Cold",
        more: "Hot"
    }
}

export default function MapLegend({type}:Props){

    const {label, gradientClass, less, more} = legendConfig[type]

    return (
        <div className={styles.strip}>
            <p>{label}</p>
            <div className={styles.stripSub}>
                <div className={`${styles.gradient} ${gradientClass}`}></div>
                <p>{less} / {more}</p>
            </div>
        </div>
    )
}