import {RectangleStackIcon } from '@heroicons/react/24/outline'
import {defineType, defineField, Block} from 'sanity'
import type {Rule} from 'sanity'
import {FiGrid, FiList, FiType} from 'react-icons/fi'
import {getUnitByName} from '../../components/lib/amountSettings'

function toPlainText(blocks = [] as Block[]) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: RectangleStackIcon,
  fields: [
    defineField({name: 'ingredientPicker', type: 'ingredientPicker'}),
    defineField({name: 'amount', type: 'ingredientAmount'}),
    defineField({name: 'premium', type: 'boolean', initialValue: true}),
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 2}),
    defineField({name: 'featuredImage', type: 'image'}),
    defineField({name: 'category', type: 'reference', to: [{type: 'category'}]}),
    defineField({
      name: 'ingredientSets',
      type: 'array',
      of: [
        defineField({
          name: 'set',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({
              name: 'ingredients',
              type: 'array',
              of: [
                defineField({
                  name: 'ingredient',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'ingredient',
                      type: 'reference',
                      to: [{type: 'ingredient'}],
                    }),
                    defineField({name: 'amount', type: 'ingredientAmount'}),
                    defineField({name: 'note', type: 'string'}),
                  ],
                  preview: {
                    select: {
                      title: 'ingredient.title',
                      subtitle: 'note',
                      amount: 'amount.value',
                      unit: 'amount.unit',
                    },
                    // @ts-ignore
                    prepare(select) {
                      // @ts-ignore
                      const {
                        title,
                        subtitle,
                        amount,
                        unit,
                      }: {title: string; subtitle: string; amount: number; unit: string} = select

                      const unitItem = getUnitByName(unit)
                      let titleText

                      if (unitItem?.name === 'quantity') {
                        titleText = [amount, title].join(` `)
                      } else if (unitItem?.plural && amount > 1) {
                        titleText = [amount, unitItem.plural, title].join(` `)
                      } else if (unitItem?.single) {
                        titleText = [amount, unitItem.single, title].join(` `)
                      } else if (!unitItem) {
                        titleText = title
                      }

                      return {
                        title: titleText,
                        subtitle,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'method',
      type: 'array',
      of: [
        defineField({
          name: 'title',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
          ],
          icon: FiType,
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection: any) {
              const {title} = selection
              return {
                title,
                subtitle: 'Title',
                media: FiType,
              }
            },
          },
        }),
        defineField({
          name: 'step',
          type: 'object',
          fields: [
            defineField({
              name: 'step',
              type: 'portableText',
            }),
          ],
          icon: FiList,
          preview: {
            select: {
              step: 'step',
            },
            prepare(selection: any) {
              const {step} = selection
              return {
                title: toPlainText(step),
                subtitle: 'Step',
                media: FiList,
              }
            },
          },
        }),
        defineField({
          name: 'component',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'ingredients', type: 'ingredientPicker'}),
            defineField({name: 'description', type: 'portableText'}),
          ],
          icon: FiGrid,
          preview: {
            select: {
              description: 'description',
            },
            prepare(selection: any) {
              const {description} = selection
              return {
                title: toPlainText(description),
                subtitle: 'Component',
                media: FiGrid,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'featuredImage',
    },
  },
})
