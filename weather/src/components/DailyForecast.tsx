import styles from './DailyForecast.module.css'


type Strip = {
    day:string
    temp:string
    max:string
    min:string
}

export type DailyWeatherProps = {
    day:string
    temp:string
    max:string
    min:string
    strips:Strip[]
}


export default function DailyWeather({day, temp, max, min, strips}:DailyWeatherProps){

    return (
        <div className={styles.dailyWx}>

            <div className={styles.currentDLabel}>
                <span>Daily Forecast</span>
            </div>

            <div className={styles.widgetMain}>

                <div className={styles.stripMain}>
                    <p className={styles.colorAccent}>{day}</p>
                    <p className={styles.colorAccent}>{`${temp}`}</p>
                    <p className={styles.colorDark}>{`H: ${max}`}</p>
                    <p className={styles.colorDark}>{`L: ${min}`}</p>
                </div>

                {strips.map(strip => (
                    <div className={styles.stripSecondary}>
                        <p className={styles.colorDark}>{strip.day}</p>
                        <p className={styles.colorDark}>{`${strip.temp}`}</p>
                        <p className={styles.colorSilver}>{`H: ${strip.max}`}</p>
                        <p className={styles.colorSilver}>{`L: ${strip.min}`}</p>
                    </div>
                ))}

            </div>

        </div>
    )

}