import { z } from "zod"

export const geocodeSchema = z.array(z.object({
    name:z.string(),
    lat:z.number(),
    lon:z.number()
}))

export type GeocodeResponse = z.infer<typeof geocodeSchema>