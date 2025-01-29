import type { Block } from 'payload'

export const HeroWithSearch: Block = {
  slug: 'heroWithSearch',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
  ],
  interfaceName: 'HeroWithSearchBlock',
}
