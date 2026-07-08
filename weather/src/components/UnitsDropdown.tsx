import styles from './Dropdowns.module.css'


type Props = {
  current: "metric" | "imperial"
  onChange: (value: "metric" | "imperial") => void
}


export default function UnitsDropdown({current, onChange}:Props){

    return (
        <>

        <div className={styles.component}>

            <label htmlFor="units" className={styles.label}>Units:</label>

            <select name='units' id='units' value={current} onChange={e => onChange(e.target.value as "metric" | "imperial")} className={styles.dropdown}>

                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>

            </select>

        </div>

        </>
    )
}