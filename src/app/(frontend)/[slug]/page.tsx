import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getHomepageSlug } from '@/lib/getHomepageSlug'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/render-blocks'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const homepageSlug = await getHomepageSlug()()
  const { slug = homepageSlug } = await paramsPromise

  const page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return notFound()
  }

  return (
    <div>
      <RenderBlocks layout={page.layout} />
    </div>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
