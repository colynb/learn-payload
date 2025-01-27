import locations from '@/data/locations'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  console.log(JSON.stringify(locations, null, 2))

  fs.writeFileSync(
    'cities.json',
    JSON.stringify(
      locations.filter((l) => l.type === 'city'),
      null,
      2,
    ),
  )

  return Response.json(data)
}
