import { APIGatewayProxyHandler } from 'aws-lambda'
import { QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { v4 as generateGuid } from 'uuid'
import { getDynamoClient } from '../dynamodb'
import { EntityType, IndexName, TableName, User } from '../types'

export const createUser: APIGatewayProxyHandler = async (event) => {
  const client = getDynamoClient()

  // TODO: add better way to parse/validate body schema
  const bodyData = JSON.parse(event.body as string)
  const { firstName, lastName, emailAddress } = bodyData

  const normalizedEmailAddress = emailAddress.toLowerCase().trim()

  // Check if the user already exists, GSI1PK is the email address
  const { Items = [] } = await client.send(
    new QueryCommand({
      TableName: TableName.MAIN_TABLE,
      IndexName: IndexName.GSI_1,
      ExpressionAttributeValues: {
        ':emailAddress': normalizedEmailAddress,
      },
      KeyConditionExpression: 'GSI1PK = :emailAddress',
      Limit: 1,
    }),
  )

  if (Items.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Email address already taken',
      }),
    }
  }

  const now = new Date()
  const userId = generateGuid()

  const newUser: User = {
    pk: `${EntityType.USER}#${userId}`,
    sk: `${EntityType.USER}#${normalizedEmailAddress}`,
    entityType: EntityType.USER,
    firstName: firstName,
    lastName: lastName,
    emailAddress: normalizedEmailAddress,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    GSI1PK: normalizedEmailAddress,
    GSI1SK: `${EntityType.USER}#${userId}`,
  }

  await client.send(
    new PutCommand({
      TableName: TableName.MAIN_TABLE,
      Item: newUser,
    }),
  )

  return {
    statusCode: 201,
    body: JSON.stringify({
      data: newUser,
    }),
  }
}
