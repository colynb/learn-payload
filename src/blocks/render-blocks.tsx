import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { HeroWithSearch } from './heros/HeroWithSearch'

const blocksMap = {
  heroWithSearch: HeroWithSearch,
}

type RenderBlocksProps = {
  layout?: Page['layout']
}

export const RenderBlocks = ({ layout }: RenderBlocksProps) => {
  const hasBlocks = layout && Array.isArray(layout) && layout.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {layout.map((block, index) => {
          const BlockComponent = blocksMap[block.blockType]
          return <BlockComponent key={index} {...block} />
        })}
      </Fragment>
    )
  }

  return null
}
