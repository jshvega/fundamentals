import styles from './Dropdowns.module.css'

type Props = {
  current: string
  onChange: (value: string) => void
}

export default function LocationDropdown({current, onChange}:Props){

    return (
        <>

        <div className={styles.component}>

            <label htmlFor="city" className={styles.label}>City:</label>

            <select name='city' id='city' value={current} onChange={e => onChange(e.target.value)} className={styles.dropdown}>

                <option value="Buenos Aires">Buenos Aires, Argentina</option>
                <option value="Cairo">Cairo, Egypt</option>
                <option value="Dallas">Dallas, USA</option>
                <option value="Delhi">Delhi, India</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="Dublin">Dublin, Ireland</option>
                <option value="London">London, UK</option>
                <option value="Mexico City">Mexico City, Mexico</option>
                <option value="Nairobi">Nairobi, Kenya</option>
                <option value="Paris">Paris, France</option>
                <option value="Reykjavík">Reykjavík, Iceland</option>
                <option value="Rio de Janeiro">Rio de Janeiro, Brazil</option>
                <option value="Singapore">Singapore</option>
                <option value="Sydney">Sydney, Australia</option>
                <option value="Tokyo">Tokyo, Japan</option>
                <option value="Vancouver">Vancouver, Canada</option>

            </select>

        </div>

        </>
    )
}