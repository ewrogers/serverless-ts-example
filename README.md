# serverless-ts-example
Example API using Serverless with TypeScript

## Requirements

- Node.js 16.x+
- Serverless CLI
- AWS Account

### Optional
- Docker (DynamoDB Local + Admin)

## Scripts
There are several `npm` scripts you can run:

- `dynamodb` - Starts the local DynamoDB instance + admin UI
- `dynamodb:clear` - Clears the DynamoDB data from persistent volume
- `dev` - Starts the serverless offline API gateway
- `invoke <fn>` - Invokes a Lambda function (remotely)
- `invoke:local <fn>` - Invokes a Lambda function (locally)
- `deploy` - Deploys all the Lambda handlers
- `undeploy` - Removes all deployed resources
- `lint` - Lints the code for style errors and warnings
- `lint:fix` - Lints the code and automatically fixes all errors
- `pretty` - Prettifies all code files
- `test` - Runs unit tests
- `test:coverage` - Runs unit tests and shows code coverage
- `test:watch` - Runs unit tests and watches for file changes

## Local Development
Using the `npm run dev` script will start the `serverless-offline` API gateway and display the available routes.

TypeScript files will be re-compiled on change automatically, and updating the `serverless.yml` file will cause the server to restart via `nodemon`.

You can use your REST client of choice (Postman, Insomnia, Paw, etc.) to test the endpoints.
## Plugins
These are the plugins that are used with the Serverless framework:

- [serverless-plugin-typescript](https://www.serverless.com/plugins/serverless-plugin-typescript)
- [serverless-dotenv-plugin](https://www.serverless.com/plugins/serverless-dotenv-plugin)
- [serverless-offline](https://www.serverless.com/plugins/serverless-offline)

## AWS Credentials
In the interest of keeping this example as simple and straightforward as possible, AWS Access Keys are used.
In a real production application you should be using proper IAM roles and role policies to deploy.

### Create New User

1. Login to AWS Console
2. Navigate to **Identity & Access Management** (IAM)
3. Select **Users** -> **Add User**
4. Name the user `serverless-admin` and enable **Programmatic access**
5. Attach the existing **AdministratorAccess** policy
6. Review and create the user
7. Copy the **Access Key ID** and **Secret Key** values

### Configure Serverless
With the user created, you can set the default AWS credentials that will be used for serverless deployments:

```shell
$ serverless config credentials \
    --provider aws \
    --key <access-key-id> \
    --secret <access-secret-key>
```

You should get a message showing the default profile for serverless has been configured successfully.

## DynamoDB Local
A local DynamoDB instance can be run via `npm run dynamodb`, which will run the following services via Docker:

- DynamoDB Local - `http://localhost:8000`
- DynamoDB Admin UI - `http://localhost:8001`

Data is persisted in the `dynamodb_data` Docker volume.
