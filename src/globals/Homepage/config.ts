import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      hasMany: false,
      maxDepth: 1,
    },
    {
      name: 'alertBox',
      type: 'ui',
      admin: {
        components: {
          Field: 'src/components/admin/ui/alert-box.tsx',
        },
      },
    },
  ],
}
