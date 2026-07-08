import styles from './HourlyForecast.module.css'


type Item = {
    time:string
    icon:React.ReactNode
    temp:string
}

type Props = {
    items:Item[]
}


export default function HourlyWeather({items}:Props){

    return (
        <div className={styles.hourlyWx}>

            <div className={styles.hourlyLabel}>
                <span>{`Hourly Forecast (12 hours)`}</span>
            </div>

            <div className={styles.widgetMain}>

                {items.map(item => (
                    <div className={styles.itemCard}>
                        <p className={styles.type}>{item.time}</p>
                        <div className={styles.icon}>{item.icon}</div>
                        <p className={styles.type}>{`${item.temp}`}</p>
                    </div>
                ))}

            </div>

        </div>
    )

}