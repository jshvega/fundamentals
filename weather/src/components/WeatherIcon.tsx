import type { ComponentType, SVGProps } from "react"

import BrokenClouds from "../assets/broken-clouds.svg?react"
import Clear from "../assets/clear.svg?react"
import Cloud from "../assets/cloud.svg?react"
import FewClouds from "../assets/few-clouds.svg?react"
import Mist from "../assets/mist.svg?react"
import Rain from "../assets/rain.svg?react"
import ShowerRain from "../assets/shower-rain.svg?react"
import Snow from "../assets/snow.svg?react"
import Thunderstorm from "../assets/thunderstorm.svg?react"

type Props = {
    iconCode:string
}

export default function WeatherIcon ({iconCode}:Props){

    const svgByIconCode:Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
        "01": Clear,
        "02": FewClouds,
        "03": Cloud,
        "04": BrokenClouds,
        "09": ShowerRain,
        "10": Rain,
        "11": Thunderstorm,
        "13": Snow,
        "50": Mist
    }

    const Ico = svgByIconCode[iconCode.slice(0, -1)] ?? Cloud;

    return (
        <Ico/>
    )

}