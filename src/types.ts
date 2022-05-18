export enum TableName {
  MAIN_TABLE = 'MainTable',
}

export enum IndexName {
  GSI_TYPE = 'GSIType',
  GSI_1 = 'GSI1',
}

export enum EntityType {
  USER = 'USER',
}

export interface Item {
  pk: string
  sk?: string
  entityType: EntityType
  GSI1PK?: string
  GSI1SK?: string
  [key: string]: unknown
}

export type User = Item & {
  pk: string
  sk: string
  entityType: EntityType
  firstName: string
  lastName: string
  emailAddress: string
  createdAt: string
  updatedAt: string
  GSI1PK: string
  GSI1SK: string
}
