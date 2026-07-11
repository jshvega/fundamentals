import styles from './Dropdowns.module.css'
import type { MapType } from '../types'


type Props = {
  current: MapType
  onChange: (value: MapType) => void
}


export default function TypeDropdown({current, onChange}:Props){

    return (
        <>

        <div className={styles.component}>

            <label htmlFor="type" className={styles.label}>Map Type:</label>

            <select name='type' id='type' value={current} onChange={e => onChange(e.target.value as MapType)} className={styles.dropdown}>

                <option value="clouds_new">Clouds</option>
                <option value="precipitation_new">Precipitation</option>
                <option value="pressure_new">Pressure</option>
                <option value="wind_new">Wind</option>
                <option value="temp_new">Temperature</option>

            </select>

        </div>

        </>
    )
}