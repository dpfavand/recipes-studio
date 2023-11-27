import { UserCircleIcon } from '@heroicons/react/20/solid'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserCircleIcon,
  fields: [
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'image', type: 'image'}),
  ],
})
