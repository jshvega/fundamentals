import styles from './Addl.module.css'

import CloudIcon from "../assets/addl-cloud.svg";
import PreassureIcon from "../assets/addl-preassure.svg";
import SunriseIcon from "../assets/addl-sunrise.svg";
import SunsetIcon from "../assets/addl-sunset.svg";
import UviIcon from "../assets/addl-uvi.svg";
import WindIcon from "../assets/addl-wind.svg";


type Props = {
    preassure:number
    cloudiness:number
    uv:number
    winddeg:string
    sunset:string
    sunrise:string
}


export default function HourlyWeather({preassure, cloudiness, uv, winddeg, sunset, sunrise}:Props){

    return (
        <div className={styles.addlWx}>

            <div className={styles.addlLabel}>
                <span>Additional Information</span>
            </div>

            <div className={styles.widgetMain}>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <p>Preassure hPa</p>
                        <img src={PreassureIcon} alt="Preassure Icon" />
                    </div>
                    <p className={styles.infoItem}>{preassure}</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <p>Cloudiness</p>
                        <img src={CloudIcon} alt=" Cloud Icon" />
                    </div>
                    <p className={styles.infoItem}>{`${cloudiness}%`}</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <p>UV Index</p>
                        <img src={UviIcon} alt="UV Index Icon" />
                    </div>
                    <p className={styles.infoItem}>{uv}</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <p>Wind Direction</p>
                        <img src={WindIcon} alt="Wind Icon" />
                    </div>
                    <p className={styles.infoItem}>{winddeg}</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <p>Sunrise</p>
                        <img src={SunriseIcon} alt="Sunrise Icon" />
                    </div>
                    <p className={styles.infoItem}>{sunrise}</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <p>Sunset</p>
                        <img src={SunsetIcon} alt="Sunset Icon" />
                    </div>
                    <p className={styles.infoItem}>{sunset}</p>
                </div>

            </div>

        </div>
    )

}