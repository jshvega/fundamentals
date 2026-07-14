import { z } from "zod"

export const weatherSchema = z.object({
    weather:z.array(z.object({
        description:z.string(),
        icon:z.string()
    })),
    main:z.object({
        temp:z.number(),
        humidity:z.number()
    }),
    wind:z.object({
        speed:z.number()
    }),
    visibility:z.number(),
    dt:z.number(),
    timezone:z.number(),
    name:z.string()
})

export type WeatherResponse = z.infer<typeof weatherSchema>