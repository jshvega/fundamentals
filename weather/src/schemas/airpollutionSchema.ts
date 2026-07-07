import { z } from "zod"

export const airpollutionSchema = z.object({
    list:z.array(z.object({
        main:z.object({
            aqi:z.number()
        }),
        components:z.object({
            co:z.number(),
            no2:z.number(),
            o3:z.number(),
            pm2_5:z.number(),
            pm10:z.number()
        })
    }))
})

export type AirPollutionResponse = z.infer<typeof airpollutionSchema>