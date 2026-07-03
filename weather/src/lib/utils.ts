export function msToKm(ms:number):number{
    return Math.round(ms * 3.6)
}

export function mToKm(meters:number):number{
    return Math.round(meters / 1000 * 10) / 10
}

export function formatLocalTime(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    let hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    const ampm = hours >= 12 ? 'P.M.' : 'A.M.'

    hours = hours % 12
    hours = hours ? hours : 12

    if (minutes < 10)
        return `${hours}:0${minutes} ${ampm}`
    else{
        return `${hours}:${minutes} ${ampm}`
    }    
}

export function formatWeekday(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    
    return date.toLocaleDateString("en-US", {weekday:"short", timeZone:"UTC"})
}