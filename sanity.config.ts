import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import schemaTypes from './schemas'
import { defaultDocumentNode, structure } from './structure'

export default createConfig({
  name: 'default',
  title: 'Recipes',

  projectId: '4m16m8l4',
  dataset: 'production',

  plugins: [deskTool({structure, defaultDocumentNode})],

  schema: {
    types: schemaTypes,
  }
})
