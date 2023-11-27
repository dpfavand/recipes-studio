import {  RectangleGroupIcon } from '@heroicons/react/24/outline'
import {defineField} from 'sanity'

export default {
  name: 'ingredient',
  title: 'Ingredient',
  icon:  RectangleGroupIcon,
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'plural', type: 'string'}),
    defineField({
      name: `cupInGrams`,
      title: `1 Cup in Grams`,
      type: `number`,
      description: `1 Cup is 250mL`,
    }),
    defineField({
      name: 'alternativeNames',
      type: 'array',
      of: [defineField({name: 'title', type: 'string'})],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(select: any) {
      const {title} = select
      return {
        title,
        media: RectangleGroupIcon
      }
    }
  },
}
