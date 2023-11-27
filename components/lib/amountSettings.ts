export const options = [
  {
    title: 'Conversion',
    options: ['Automatic', 'Manual'],
  },
]

export type Standard = 'Traditional' | 'Metric' | 'Imperial' | 'Fuzzy'

export type Unit = {
  name: string
  single: string
  standard: Standard
  type?: 'Volume' | 'Weight'
  plural?: string
}

export type Units = Unit[]

export const units: Units = [
  {
    name: 'cup',
    single: 'Cup',
    plural: 'Cups',
    type: 'Volume',
    standard: 'Traditional',
  },
  {name: 'tsp', single: 'Tsp', type: 'Volume', standard: 'Traditional'},
  {name: 'Tbs', single: 'Tbsp', type: 'Volume', standard: 'Traditional'},
  {
    name: 'g',
    single: 'Gram',
    plural: 'Grams',
    type: 'Weight',
    standard: 'Metric',
  },
  {name: 'ml', single: 'mL', type: 'Volume', standard: 'Metric'},
  {name: 'oz', single: 'Oz', type: 'Weight', standard: 'Imperial'},
  {name: 'fl-oz', single: 'Fl Oz', type: 'Volume', standard: 'Imperial'},
  {name: 'quantity', single: 'Quantity', standard: 'Fuzzy'},
  {name: 'pinch', single: 'Pinch', plural: 'Pinches', standard: 'Fuzzy'},
  {
    name: 'sprinkle',
    single: 'Sprinkle',
    plural: 'Sprinkles',
    standard: 'Fuzzy',
  },
]

export function getUnitByName(name: string) {
  return units.find((u) => u.name === name)
}