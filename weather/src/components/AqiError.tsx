import styles from './AqiError.module.css'


export default function AqiError(){

    return (
        <div className={styles.airWX}>

            <div className={styles.airLabel}>
                <span>Air Quality Index</span>
            </div>

            <h3 className={styles.sidebarTitle}>Air Quality Index</h3>

            <div className={styles.widgetMain}>

                <p>Couldn't load this</p>
                
            </div>

        </div>
    )

}