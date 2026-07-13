import styles from './CurrentWeather.module.css'

import StatItem from "./StatItem"
import WindIcon from "../assets/wind.svg?react"
import EyeIcon from "../assets/eye.svg?react"
import DropIcon from "../assets/drop.svg?react"



type CurrentWeatherProps = {
    condition:string,
    conditionIcon:React.ReactNode
    temp:string
    time:string
    wind:string
    humidity:number
    visibility:string
}

export default function CurrentWeather({condition, conditionIcon, temp, time, wind, humidity, visibility}:CurrentWeatherProps){

    return (
        <div className={styles.currentWx}>

            <div className={styles.currentWxLabel}>
                <span>Current Weather</span>
            </div>

            <div className={styles.widgetMain}>

                <div className={styles.conditionDiv}>
                    <span className={styles.condition}>{condition}</span>
                    <div className={styles.conditionIcon}>{conditionIcon}</div>
                </div>

                <p className={styles.temp}>{`${temp}°`}</p>

                <div className={styles.timeDiv}>
                    <span className={styles.localTime}>As of:</span>
                    <span className={styles.time}>{time}</span>
                </div>

                <div className={styles.statItemStrip}>
                    <StatItem icon={WindIcon} value={`${wind}`} label="Wind" />
                    <StatItem icon={DropIcon} value={`${humidity}%`} label="Humidity" />
                    <StatItem icon={EyeIcon} value={`${visibility}`} label="Visibility" />
                </div>

            </div>

        </div>
    )

}