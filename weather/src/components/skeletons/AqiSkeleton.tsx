import styles from './AqiSkeleton.module.css'


export default function AqiSkeleton(){

    return (
        <div className={styles.airWX}>

            <div className={styles.airLabel}>
                <span>Air Quality Index</span>
            </div>

            <h3 className={styles.sidebarTitle}>Air Quality Index</h3>

            <div className={styles.widgetMain}>

                <div className={styles.skeletonBody}></div>
                <div className={styles.skeletonBody}></div>
                <div className={styles.skeletonBody}></div>
                <div className={styles.skeletonBody}></div>
                <div className={styles.skeletonBody}></div>
                <div className={styles.skeletonBody}></div>
                
            </div>

        </div>
    )

}