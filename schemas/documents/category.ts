import { SwatchIcon } from '@heroicons/react/20/solid'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: SwatchIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'plural', type: 'string'}),
  ],
})
