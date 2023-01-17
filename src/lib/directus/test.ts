// @ts-nocheck
import type { Type } from '@directus/shared/types'
import { api } from './api'
import type { Collection as DirectusCollection, Field as DirectusField } from '@directus/shared/types'

type Field = DirectusField & {
  relation?: {
    type: 'many' | 'one'
    collection: string
  }
}
type Collection = DirectusCollection & { fields: Field[] }
type Collections = { [collection: string]: Collection }

async function getCollections() {
  const collectionsRes = await api.items('directus_collections').readByQuery({ limit: -1 })
  const rawCollections = collectionsRes.data!
  const collections: Collections = {}

  for (const collection of rawCollections.sort((a, b) => a.collection.localeCompare(b.collection))) {
    collections[collection.collection] = { ...collection, fields: [] }
  }

  const fieldsRes = await api.items('directus_fields').readByQuery({ limit: -1 })
  const fields = fieldsRes.data

  for (const field of fields.sort((a, b) => a.field.localeCompare(b.field))) {
    if (!collections[field.collection]) {
      warn(`${field.collection} not found`)
      continue
    }

    collections[field.collection]!.fields.push(field)
  }

  for (const key of Object.keys(collections)) {
    if (collections[key]!.fields.length === 0) delete collections[key]
  }

  const relationsRes = await api.items('directus_relations').readByQuery({ limit: -1 })
  const relations = relationsRes.data

  for (const relation of relations) {
    const oneField = collections[relation.meta!.one_collection!]?.fields.find(
      (field) => field.field === relation.meta!.one_field,
    )
    const manyField = collections[relation.meta!.many_collection]?.fields.find(
      (field) => field.field === relation.meta!.many_field,
    )

    if (oneField) {
      oneField.relation = {
        type: 'many',
        collection: relation.meta!.many_collection,
      }
    }

    if (manyField) {
      manyField.relation = {
        type: 'one',
        collection: relation.meta!.one_collection!,
      }
    }
  }

  return collections
}

export async function generateTsTypes(useIntersectionTypes = false) {
  const collections = await getCollections()
  let ret = ''
  const types: string[] = []

  Object.values(collections).forEach((collection) => {
    const collectionName = collection.collection
    const typeName = pascalCase(collectionName)
    types.push(`${collectionName}: ${typeName}`)
    ret += `export type ${typeName} = {\n`
    collection.fields.forEach((field) => {
      if (field.meta?.interface?.startsWith('presentation-')) return
      ret += `  ${field.field.includes('-') ? `"${field.field}"` : field.field}${
        field.schema?.is_nullable ? '?' : ''
      }: ${getType(field, useIntersectionTypes)};\n`
    })
    ret += '};\n\n'
  })

  ret += 'export type CustomDirectusTypes = {\n' + types.map((x) => `  ${x};`).join('\n') + '\n};'

  ret += '\n'

  return ret
}

function pascalCase(str: string) {
  return str
    .split(' ')
    .flatMap((x) => x.split('_'))
    .flatMap((y) => y.split('-'))
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join('')
}

function getType(field: Field, useIntersectionTypes = false) {
  let type = getPrimitive(field.type)

  if (field.relation) {
    type += ` ${useIntersectionTypes ? '&' : '|'} ${
      field.relation.collection ? pascalCase(field.relation.collection) : 'any'
    }${field.relation.type === 'many' ? '[]' : ''}`
  }

  if (!field.schema?.is_nullable) return type

  if (field.relation && useIntersectionTypes) {
    return `(${type}) | null`
  } else {
    return type + ` | null`
  }
}

function getPrimitive(type: Type) {
  if (['integer', 'bigInteger', 'float', 'decimal'].includes(type)) return 'number'
  else if (['boolean'].includes(type)) return 'boolean'
  else if (['json', 'csv'].includes(type)) return 'unknown'
  else return 'string'
}
