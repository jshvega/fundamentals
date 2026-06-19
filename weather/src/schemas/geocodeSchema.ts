import { z } from "zod"

// returns an array of locations
export const geocodeSchema = z.array(z.object({
    name:z.string(),
    lat:z.number(),
    lon:z.number()
}))

export type GeocodeResponse = z.infer<typeof geocodeSchema>