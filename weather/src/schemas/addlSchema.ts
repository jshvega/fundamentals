import { z } from "zod"

export const addlSchema = z.object({
    timezone_offset:z.number(),
    data:z.array(z.object({
        sunrise:z.number(),
        sunset:z.number(),
        pressure:z.number(),
        uvi:z.number(),
        clouds:z.number(),
        wind_deg:z.number()
    }))
})

export type AddlResponse = z.infer<typeof addlSchema>