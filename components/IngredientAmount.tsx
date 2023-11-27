import React from 'react'
import {Stack, Text, Label, Select, Flex, TextInput} from '@sanity/ui'
import {ObjectInputProps} from 'sanity'
import {set, unset} from 'sanity/form'

import {getUnitByName, Standard, units} from './lib/amountSettings'
import convertedAmounts from './lib/convertedAmounts'

export type AmountUnitPair = {
  value: number
  unit: string
  _key?: string
}

type Value = AmountUnitPair & {
  amounts: AmountUnitPair[]
}

export default function IngredientAmount(props: ObjectInputProps<Value>) {
  const {readOnly, onChange, value: fieldValue} = props

  const distinctUnitStandards = React.useMemo(
    () => Array.from(new Set(units.map((unit) => unit.standard))),
    []
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue =
      event.target.name === 'value' ? parseFloat(event.target.value) : event.target.value
    const path = [event.target.name]

    // Change root level value
    onChange(newValue ? set(newValue, path) : unset(path))

    // Unset amounts if there's no value
    if (event.target.name === 'value' && !newValue) {
      return onChange(unset(['amounts']))
    }

    const currentAmount = event.target.name === 'value' ? newValue : fieldValue?.value
    const currentUnit = event.target.name === 'value' ? fieldValue?.unit : event.target.value

    if (currentUnit) {
      const newAmounts = convertedAmounts(Number(currentAmount), currentUnit)

      onChange(newAmounts.length ? set(newAmounts, ['amounts']) : unset(['amounts']))
    }
  }

  console.log(fieldValue)

  return (
    <Stack space={4}>
      <Flex gap={3}>
        <TextInput
          name="value"
          type="number"
          disabled={readOnly}
          value={fieldValue?.value}
          onChange={handleChange}
        />
        <Select name="unit" disabled={readOnly} onChange={handleChange} value={fieldValue?.unit}>
          {distinctUnitStandards.map((standard: Standard) => (
            <optgroup key={`option-${standard}`} label={standard}>
              {units
                .filter((unit) => unit.standard === standard)
                .map((unit) => (
                  <option key={unit.name} value={unit.name}>
                    {unit?.plural && fieldValue && fieldValue?.value > 1 ? unit.plural : unit.single}
                  </option>
                ))}
            </optgroup>
          ))}
        </Select>
      </Flex>
      {fieldValue?.amounts && fieldValue?.amounts?.length > 0 && (
        <Stack space={2}>
          <Label size={1}>Converted from {fieldValue.unit}</Label>
          <Flex gap={3}>
            {fieldValue.amounts.map((item) => {
              const itemUnit = getUnitByName(item.unit)

              return (
                <Text key={item.unit}>
                  {item.value} {item.value > 1 && itemUnit?.plural ? itemUnit.plural : itemUnit?.single}
                </Text>
              )
            })}
          </Flex>
        </Stack>
      )}
    </Stack>
  )
}
