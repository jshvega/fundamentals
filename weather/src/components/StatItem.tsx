import type { ComponentType, SVGProps } from "react"
import styles from './StatItem.module.css'

type StatItemProps = {
    icon:ComponentType<SVGProps<SVGSVGElement>>,
    value:string,
    label:string,
}

export default function StatItem ({icon:Icon, value, label}:StatItemProps){

    return (
        <div className={styles.statItem}>
        <Icon className={styles.icon} />
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
        </div>
    )

}