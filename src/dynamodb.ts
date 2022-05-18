import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

export interface Item {
  pk: string
  sk?: string
  [key: string]: unknown
}

export function getDynamoClient() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMO_ENDPOINT,
  })
  return DynamoDBDocumentClient.from(client)
}
