import React, { useEffect, useState } from 'react'
import {Checkbox, Stack, Grid, Text, Label, Box, Flex} from '@sanity/ui'
import {ObjectInputProps, useClient} from 'sanity'
import {set, setIfMissing, unset, useFormValue} from 'sanity'

export type AmountUnitPair = {
  value: number
  unit: string
  _key?: string
}

type Ingredient = {
  _key: string
  _type: 'ingredient'
  amount: AmountUnitPair
  amounts: AmountUnitPair[]
  ingredient: {
    _type: 'reference'
    _ref: string
  }
}

type IngredientSet = {
  _key: string
  _type: 'set'
  title: string
  ingredients: Ingredient[]
}

export default function IngredientPicker(props: ObjectInputProps<string[]>) {
  const {readOnly, onChange, value} = props
  const {ingredientSets}: {ingredientSets: IngredientSet[]} = useFormValue([]) as any
  const [ingredientLabels, setIngredientLabels] = useState({})

  const client = useClient({apiVersion: '2023-11-27'})

  useEffect(() => {
    const ingredientIds = ingredientSets.flatMap(list => list.ingredients.map(item => item.ingredient._ref))

    async function doFetch() {
      const ingredientList = await client.fetch('*[_id in $ingredientIds]{_id, title}', {ingredientIds})
      const ingredientMap = ingredientList.reduce((obj, item) => ({...obj, [item['_id']]: item.title}), {})
      setIngredientLabels(ingredientMap)
    }

    doFetch()
  },
  [client, ingredientSets])
  

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value: ingredientKey} = event.target

      const currentValue = value?.length ? [...value] : []
      const newValue = currentValue.includes(ingredientKey)
        ? currentValue.filter((key) => key !== ingredientKey)
        : [...currentValue, ingredientKey]
      const patch = newValue.length ? [setIfMissing([]), set(newValue)] : unset()


      onChange(patch)
    },
    [value, onChange]
  )

  if (!ingredientSets?.length) {
    return <Text>This recipe does not yet have Ingredients</Text>
  }

  return (
    <Grid gap={4} columns={ingredientSets.length}>
      {ingredientSets.map((ingredientSet) => (
        <Stack key={ingredientSet._key} space={3}>
          <Label>{ingredientSet.title}</Label>
          {ingredientSet.ingredients.length > 0 ? (
            <Stack space={3}>
              {ingredientSet.ingredients.map((ingredient) => (
                <Flex key={ingredient._key} gap={2}>
                  <Checkbox
                    disabled={readOnly || !ingredient?.ingredient?._ref}
                    onChange={handleChange}
                    value={ingredient._key}
                    checked={value?.includes(ingredient._key)}
                  />
                  <Box flex={1}>
                    <Text>{ingredientLabels[ingredient.ingredient._ref]}</Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          ) : null}
        </Stack>
      ))}
    </Grid>
  )
}
