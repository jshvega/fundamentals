import styles from './WidetSkeleton.module.css'

type Props = {label:string}

export default function WidetSkeleton({label}:Props){

    return (
        <div className={styles.widget}>

            <div className={styles.label}>
                <span>{label}</span>
            </div>

            <div className={styles.widgetMain}>

                <div className={styles.skeletonBody}></div>

            </div>

        </div>
    )

}