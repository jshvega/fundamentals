import { z } from "zod"

export const hourlyStepSchema = z.object({
    dt:z.number(),
    temp:z.number(),
    weather:z.array(z.object({
        icon:z.string()
    }))
})

export const hourlySchema = z.object({
    timezone_offset:z.number(),
    data:z.array(hourlyStepSchema)
})

export type HourlyStepResponse = z.infer<typeof hourlyStepSchema>
export type HourlyResponse = z.infer<typeof hourlySchema>