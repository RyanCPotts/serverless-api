# AWS Lambda Function Testing

This guide provides instructions for setting up, deploying, and testing an AWS Lambda function that interacts with a DynamoDB table using `dynamoose`.

## 1. Set Up the Lambda Function

### Create the Lambda Function

1. Navigate to the [AWS Lambda Console](https://console.aws.amazon.com/lambda).
2. Click on **Create function**.
3. Choose **Author from scratch**.
4. Provide a name for the function.
5. Select a runtime (e.g., Node.js 14.x or later).
6. Choose or create an execution role with appropriate DynamoDB permissions.
7. Click **Create function**.

### Add the Lambda Function Code

Paste the following code into the Lambda function's code editor:

```javascript
const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "age": Number
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async (e) => {
    const response = {
        statusCode: null,
        body: null
    };

    if (!e.pathParameters || !e.pathParameters.id) {
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "missing id" });
        return response;
    }

    const id = e.pathParameters.id;

    try {
        // Perform the delete operation
        await peopleModel.delete({ id });

        response.statusCode = 200;
        response.body = JSON.stringify({ message: "record deleted" });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({ message: error.message });
    }

    return response;
};

## 1. Configure IAM Role

Ensure the Lambda function’s IAM role has the `dynamodb:DeleteItem` permission for the DynamoDB table.

1. Go to [IAM > Roles](https://console.aws.amazon.com/iam/home#/roles).
2. Select the role associated with your Lambda function.
3. Attach the policy with DynamoDB permissions if not already done.

## 2. Create and Configure a Test Event

### Navigate to the Test Tab

1. In the AWS Lambda Console, go to your Lambda function.
2. Select the **Test** tab.

### Configure a Test Event

1. Click **Create new test event**.
2. Provide an event name, e.g., `testDelete`.
3. Use the following JSON structure:

    ```json
    {
      "pathParameters": {
        "id": "1"  // Replace with the ID of the record you want to delete
      }
    }
    ```

4. Click **Save changes**.

### Run the Test

1. Click **Test** to execute the Lambda function with the provided event.

## 3. Invoke Lambda Function via AWS CLI (Optional)

### Install AWS CLI

If not already installed, follow instructions at [AWS CLI Installation](https://aws.amazon.com/cli/).

### Invoke the Lambda Function

Run the following command:

```bash
aws lambda invoke --function-name yourLambdaFunctionName --payload '{"pathParameters": {"id": "1"}}' response.json
