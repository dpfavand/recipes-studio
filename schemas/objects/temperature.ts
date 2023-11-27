// import React from 'react'
import { defineField } from 'sanity'

// const TemperatureRender = ({ children, temperature, measurement }) => (
//   <span style={{ backgroundColor: 'yellow' }}>
//     {temperature || children}
//     {measurement === 'celsius' ? 'ºC' : ''}
//     {measurement === 'fahrenheit' ? 'ºF' : ''}
//   </span>
// )

export default defineField({
    title: 'Temperature',
    name: 'temperature',
    type: 'object',
    description: 'Will convert from ºC to ºF on the front-end',
    fields: [
      defineField({name: 'temperature', type: 'number'}),
      defineField({name: 'measurement', type: 'string',
        options: {list: [
          { title: 'ºC', value: 'celsius' },
          { title: 'ºF', value: 'fahrenheit' },
        ],
        direction: 'horizontal',
        layout: 'radio'}
      }),
    ],
    // blockEditor: {
    //   icon: () => 'ºC/F',
    //   // render: TemperatureRender,
    // },
  })