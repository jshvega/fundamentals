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

export function formatLocalTime2(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    let hours = date.getUTCHours()

    const ampm = hours >= 12 ? 'P.M.' : 'A.M.'

    hours = hours % 12
    hours = hours ? hours : 12

    return `${hours} ${ampm}`  
}

export function formatLocalTime3(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    if (minutes < 10)
        return `${hours}:0${minutes}`
    else{
        return `${hours}:${minutes}`
    }    
}

export function formatDegs(degs:number):string{
    
    const dir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(degs/45) % 8
    return dir[index]

}

export function formatWeekday(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    
    return date.toLocaleDateString("en-US", {weekday:"short", timeZone:"UTC"})
}