import { APIGatewayProxyHandler } from 'aws-lambda'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoClient, Item } from '../dynamodb'

export const createUser: APIGatewayProxyHandler = async (event) => {
  const client = getDynamoClient()

  const bodyData = JSON.parse(event.body as string)
  const { firstName, lastName, emailAddress } = bodyData

  const now = new Date()
  const normalizedEmailAddress = emailAddress.toLowerCase().trim()

  const newUser: Item = {
    pk: `user#${normalizedEmailAddress}`,
    sk: now.toISOString(),
    FirstName: firstName,
    LastName: lastName,
    EmailAddress: normalizedEmailAddress,
    CreatedAt: now.toISOString(),
    UpdatedAt: now.toISOString(),
  }

  const command = new PutCommand({
    TableName: process.env.DYNAMO_TABLE,
    Item: newUser,
  })

  await client.send(command)

  return {
    statusCode: 201,
    body: JSON.stringify({
      data: newUser,
    }),
  }
}
