import { z } from "zod"

export const dailyStepSchema = z.object({
    dt:z.number(),
    temp:z.object({
        day:z.number(),
        min:z.number(),
        max:z.number(),
    })
})

export const dailySchema = z.object({
    timezone_offset:z.number(),
    data:z.array(dailyStepSchema)
})

export type DailyStepResponse = z.infer<typeof dailyStepSchema>
export type DailyResponse = z.infer<typeof dailySchema>