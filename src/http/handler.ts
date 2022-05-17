
export async function hello(event, context, callback) {
  console.log('Hello world')

  await new Promise((resolve) => setTimeout(resolve, 500))

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless! Your function executed successfully.',
      input: event
    })
  }

  callback(null, response)
}
