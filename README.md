## What is this?

Kilometrikisa-proxy is a simple proxy service for accessing data in Kilometrikisa.fi site. 

There service includes four endpoints:
 - /login which fetches basic details of user
 - /user 
 - /team
 - /updateLog

## Deployment

Add the necessary AWS credentials to your environment and run.

```
serverless deploy
```

The command will create a lambda function and needed endpoints to API gateway.

To remove the service, simply run 

```
serverless deploy
```

## Testing

You can invoke the lambda function directly using sample data.

```
serverless invoke local -f kilometrikisa-handler -l --path examples/login1.json
serverless invoke local -f kilometrikisa-handler -l --path examples/user.json
serverless invoke local -f kilometrikisa-handler -l --path examples/team.json
```

The cloud deployed version can be tested leaving out the locale keyword.

```
serverless invoke -f kilometrikisa-handler -l --path examples/login1.json
serverless invoke -f kilometrikisa-handler -l --path examples/user.json
serverless invoke -f kilometrikisa-handler -l --path examples/team.json
```

Or by using curl
```
curl 'https://api-address.execute-api.eu-west-1.amazonaws.com/prod/login?username=username_here&password=pw_here'
curl 'https://api-address.execute-api.eu-west-1.amazonaws.com/prod/user?username=username_here&password=pw_here'
curl 'https://api-address.execute-api.eu-west-1.amazonaws.com/prod/team?username=username_here&password=pw_here'
```
