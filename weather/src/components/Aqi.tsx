import styles from './Aqi.module.css'
import { activeBand } from '../lib/utils'


type Props = {
    aqi:number
    pmtwo:number
    pmten:number
    othree:number
    notwo:number
    co:number
}


export default function AirPollution({aqi, pmtwo, pmten, othree, notwo, co}:Props){

    const BANDS = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]
    const BAND_STYLES = [styles.good, styles.fair, styles.moderate, styles.poor, styles.veryPoor]

    const pollutants = [
        { label: "Air Pollution", value: aqi, key: "aqi", max: 5 },
        { label: "PM2.5", value: pmtwo, key: "pm2_5", max: 75 },
        { label: "PM10", value: pmten, key: "pm10", max: 200 },
        { label: "O3", value: othree, key: "o3", max: 180 },
        { label: "NO2", value: notwo, key: "no2", max: 200 },
        { label: "CO", value: co, key: "co", max: 15400 }
    ]

    return (
        <div className={styles.airWX}>

            <div className={styles.airLabel}>
                <span>Air Quality Index</span>
            </div>

            <h3 className={styles.sidebarTitle}>Air Quality Index</h3>

            <div className={styles.widgetMain}>

                {pollutants.map(p => (

                    <div key={p.key} className={styles.componentCard}>
                        <div className={styles.top}>
                            <p>{p.label}</p>
                            <p>{p.value}</p>
                        </div>
                        <div className={styles.mid}>
                            {/* Slider */}
                            <div className={styles.sliderVals}>
                                <p>0</p>
                                <p>{p.max}</p>
                            </div>
                        </div>
                        <div className={styles.bottom}>

                            {BANDS.map((label, i) => (
                                <div key={label} className={`${styles.band} ${i === activeBand(p.value, p.key) ? BAND_STYLES[i] : ""}`}>
                                    {label}
                                </div>
                            ))}

                        </div>
                    </div>

                ))}
                
            </div>

        </div>
    )

}