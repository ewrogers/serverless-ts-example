import { APIGatewayProxyHandler } from 'aws-lambda'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoClient } from '../dynamodb'
import { EntityType, IndexName, TableName } from '../types'

export const listUsers: APIGatewayProxyHandler = async (event) => {
  const client = getDynamoClient()

  const query = event.queryStringParameters ?? {}
  const limit = parseInt(query.limit ?? '10', 10)

  const { Items } = await client.send(
    new QueryCommand({
      TableName: TableName.MAIN_TABLE,
      IndexName: IndexName.GSI_TYPE,
      ExpressionAttributeValues: {
        ':entityType': EntityType.USER,
      },
      KeyConditionExpression: 'entityType = :entityType',
      Limit: limit,
    }),
  )

  return {
    statusCode: 200,
    body: JSON.stringify({
      limit,
      data: Items ?? [],
    }),
  }
}
