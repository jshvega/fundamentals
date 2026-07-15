import styles from './Dropdowns.module.css'
import type { Theme } from '../types'


type Props = {
  current: Theme
  onChange: (value: Theme) => void
}


export default function ThemeDropdown({current, onChange}:Props){

    return (
        <>

        <div className={styles.component}>

            <label htmlFor="type" className={styles.label}>Theme:</label>

            <select name='type' id='type' value={current} onChange={e => onChange(e.target.value as Theme)} className={styles.dropdown}>

                <option value="light">Light</option>
                <option value="dark">Dark</option>

            </select>

        </div>

        </>
    )
}