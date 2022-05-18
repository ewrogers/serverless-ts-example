import { APIGatewayProxyHandler } from 'aws-lambda'

export const createUser: APIGatewayProxyHandler = async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless! Your function executed successfully.',
      input: event,
    }),
  }
}
