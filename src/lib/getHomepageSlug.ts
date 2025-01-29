import { Page } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

const fetch = async (): Promise<string> => {
  const payload = await getPayload({ config: configPromise })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  const page = homepage.page as Page

  return page.slug!
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getHomepageSlug = () => {
  return unstable_cache(async () => fetch(), ['homepage'], {
    tags: ['homepage'],
  })
}
