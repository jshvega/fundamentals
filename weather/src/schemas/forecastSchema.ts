import { z } from "zod"

export const stepSchema = z.object({
    dt:z.number(),
    dt_txt:z.string(), // Just in case it's needed
    main:z.object({
        temp:z.number(),
        temp_min:z.number(),
        temp_max:z.number(),
        pressure:z.number() // Additional Info Widget
    }),
    weather:z.array(z.object({
        icon:z.string()
    })),
    clouds:z.object({
        all:z.number() // Additional Info Widget
    }),
    wind:z.object({
        deg:z.number() // Additional Info Widget
    }),
})

export const forecastSchema = z.object({
    list:z.array(stepSchema),
    city:z.object({
        timezone:z.number(),
        sunrise:z.number(), // Additional Info Widget
        sunset:z.number() // Additional Info Widget
    })
})

export type StepResponse = z.infer<typeof stepSchema>
export type ForecastResponse = z.infer<typeof forecastSchema>






/*

JSON RESPONSE EXAMPLE

{
    "cod":"200",
    "message":0,
    "cnt":40,
    "list":[
        {
            "dt":1782874800,
            "main":{
                "temp":27.2,"feels_like":29.11,"temp_min":27.2,"temp_max":27.53,"pressure":1012,"sea_level":1012,"grnd_level":1009,"humidity":69,"temp_kf":-0.33,"dew_point":21.02
            },
            "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
            "clouds":{"all":100},
            "wind":{"speed":3.62,"deg":162,"gust":2.74},
            "visibility":10000,
            "pop":0,
            "sys":{"pod":"d"},
            "dt_txt":"2026-07-01 03:00:00"
        }
        ...
    ],
    "city":{"id":1857654,"name":"Marunouchi","coord":{"lat":35.6769,"lon":139.7639},"country":"JP","population":0,"timezone":32400,"sunrise":1782847703,"sunset":1782900042}
}

*/