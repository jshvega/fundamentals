import styles from './WidgetError.module.css'

type Props = {label:string}

export default function WidgetError({label}:Props){

    return (
        <div className={styles.widgetError}>

            <div className={styles.widgetErrorLabel}>
                <span>{label}</span>
            </div>

            <div className={styles.widgetMain}>

                <p>Couldn't load this</p>

            </div>

        </div>
    )

}