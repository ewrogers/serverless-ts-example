import { APIGatewayProxyHandler } from 'aws-lambda'

export const createUser: APIGatewayProxyHandler = async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Created user in ${process.env.DYNAMO_TABLE}`,
      input: event,
    }),
  }
}
