/*INTERNAL HELPERS*/
function pad(n:number):string{
    return String(n).padStart(2, "0")
}
function to12h(hours:number):number{
    const h = hours % 12
    return h ? h : 12
}


/* FORMAT */
export function formatTime12h(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    
    const ampm = hours >= 12 ? 'P.M.' : 'A.M.'

    return `${to12h(hours)}:${pad(minutes)} ${ampm}` 
}
export function formatHour12h(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    const hours = date.getUTCHours()

    const ampm = hours >= 12 ? 'P.M.' : 'A.M.'

    return `${to12h(hours)} ${ampm}`  
}
export function formatTime24h(dt:number, timezone:number):string{
    const date = new Date((dt+timezone)*1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    return `${pad(hours)}:${pad(minutes)}`   
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


/* AQI CARDS UTILS */
const pollutantThresholds:Record<string, number[]> = {
    aqi: [1, 2, 3, 4, 5],
    pm2_5: [10, 25, 50, 75, Infinity],
    pm10: [20, 50, 100, 200, Infinity],
    o3: [60, 100, 140, 180, Infinity],
    no2: [40, 70, 150, 200, Infinity],
    co: [4400, 9400, 12400, 15400, Infinity],
} 
export function activeBand(value:number, pollutant:string) {
    return pollutantThresholds[pollutant].findIndex(limit => value <= limit)
}
export function sliderPercent(value:number, max:number) {
    const percent = value / max * 100
    return Math.min(percent, 100)
}


/* UNIT CONVERSIONS */
function msToKmh(ms:number):number{
    return Math.round(ms * 3.6)
}
function msToMph(ms:number):number{
    return Math.round(ms * 2.23693629)
}
function mToKm(meters:number):number{
    return Math.round((meters / 1000) * 10) / 10
}
function mToMiles(meters:number):number{
    return Math.round((meters / 1609.344) * 10) / 10
}
function cToF(celsius: number): number {
    return Math.round((celsius * 9 / 5) + 32)
}
/* PICKER FUNCTIONS */
export function formatWind(ms:number, units:"metric"|"imperial"):string{
    return units === "metric" ? 
        `${msToKmh(ms)} km/h` 
        : `${msToMph(ms)} mph`
}
export function formatVisibility(meters:number, units:"metric"|"imperial"):string{
    return units === "metric" ? 
        `${mToKm(meters)} km` 
        : `${mToMiles(meters)} miles`
}
export function formatTemp(celsius:number, units:"metric"|"imperial"):string{
    return units === "imperial" ? 
        `${Math.round(cToF(celsius))} °F` 
        : `${Math.round(celsius)} °C`
}
export function formatTempBare(celsius:number, units:"metric"|"imperial"):string{
    return units === "imperial" ? 
        `${Math.round(cToF(celsius))}`
        : `${Math.round(celsius)}`
}