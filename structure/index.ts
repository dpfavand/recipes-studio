import { RectangleGroupIcon, RectangleStackIcon, SwatchIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'

import {SanityDocument} from '@sanity/client'

const activityUrl = (doc: SanityDocument) => {
    const url = new URL(`http://localhost:3000`)
    
    if (!doc?.slug?.current) {
        return url.toString()
    }

    url.pathname = `/recipes/${doc.slug.current}/activity`
    url.searchParams.set('recipeId', doc._id.replace(`drafts.`, ``))

    return url.toString()
}

export const structure: StructureResolver = (S, {currentUser}) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('recipe').title('Recipes').icon(RectangleStackIcon),
      S.documentTypeListItem('ingredient').title('Ingredients').icon(RectangleGroupIcon),
      S.documentTypeListItem('category').title('Categories').icon(SwatchIcon),
      S.documentTypeListItem('author').title('Authors').icon(UserGroupIcon),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (['recipe'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: SanityDocument) => activityUrl(doc),
          reload: {
            button: true,
          },
        })
        .title('Activity'),
    ])
  }

  return S.document().views([S.view.form()])
}
