import { request } from '../util'

export default async (name) => {
  const body = await request(`/api/lol/euw/v1.4/summoner/by-name/${name}`)
  if (null === body)
    throw new Error('Unknown summoner')

  const summoner = body[name.toLowerCase().replace(/ /g, '')]
  if (!summoner)
    throw new Error('No summoner found')

  return summoner
}
