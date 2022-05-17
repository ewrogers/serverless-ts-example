# serverless-ts-example
Example API using Serverless with TypeScript

Based on https://www.serverless.com/framework/docs/getting-started/

## Requirements

- Node.js 16.x+
- Serverless CLI
- AWS Account

## Plugins
These are the plugins that are used with the Serverless framework:

- [serverless-plugin-typescript](https://www.serverless.com/plugins/serverless-plugin-typescript)
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
