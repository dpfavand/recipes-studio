import convert from 'convert-units'
import {uuid} from '@sanity/uuid'

import {units} from './amountSettings'
import { AmountUnitPair } from '../IngredientAmount'

function randomKey(): string {
  return uuid().split(`-`)[0]
}

/**
 * Take base amount and return conversions
 * @param {float} value Amount to base conversions from
 * @param {string} unit Unit to base conversions from
 * @param {string} standard Standard to base conversions from
 */
export default function convertedAmounts(value: number, unitName: string): AmountUnitPair[] {
  // Cups are a bit different to all others because we always provide a volume
  if (unitName === 'cup') {
    return [
      {
        _key: randomKey(),
        value,
        unit: 'cup',
      },
      {
        _key: randomKey(),
        value: parseInt((value * 250).toFixed()),
        unit: 'ml',
      },
      {
        _key: randomKey(),
        value: parseInt((value * 8.32674).toFixed()),
        unit: 'fl-oz',
      },
    ]
  }

  // Find out what conversions need to happen
  const doNotConvert = ['Traditional', 'Fuzzy']
  const thisUnit = units.find((u) => u.name === unitName)

  if (thisUnit) {
    // What units should we convert this to?
    // eg: grams to ounces, mL to fl-oz, etc
    const conversionUnits = units.filter(
      (u) =>
        u.type === thisUnit.type &&
        // && u.standard !== thisUnit.standard
        !doNotConvert.includes(u.standard)
    )

    return conversionUnits.map((match) => ({
      _key: randomKey(),
      // value: 10,
      value: 
      // convert(10).from('g').to('oz'),
        match.name === unitName
          ? value
          : parseFloat(
              convert(value)
                .from(unitName)
                .to(match.name)
                .toFixed(2)
            ),
      unit: match.name,
    }))
  }

  return []
}
