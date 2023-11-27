import {defineField} from 'sanity'
import IngredientAmount from '../../components/IngredientAmount'


const ingredientShape = [
  defineField({name: 'value', type: 'number'}),
  defineField({name: 'unit', type: 'string'}),
  defineField({name: 'standard', type: 'string'}),
  defineField({name: 'type', type: 'string'}),
]

export default defineField({
  name: 'ingredientAmount',
  title: 'Ingredient Amount',
  type: 'object',
  components: {
    input: IngredientAmount,
  },
  fields: [
    ...ingredientShape,
    defineField({
      name: 'amounts',
      type: 'array',
      of: [
        defineField({
          name: 'amount',
          type: 'object',
          fields: ingredientShape
        })
      ],
    }),
  ],
}
)