import {defineField, defineType} from 'sanity'

import IngredientPicker from '../../components/IngredientPicker'

export default defineType({
  name: 'ingredientPicker',
  title: 'Ingredient Picker',
  type: 'array',
  components: {
    input: IngredientPicker,
  },
  of: [
    defineField({
      name: 'key',
      type: 'string',
    }),
  ],
})
