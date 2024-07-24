const dynamoose = require('dynamoose');
const uuid = require('uuid').v4;

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

    try {
        // Parse the request body
        let body = JSON.parse(e.body);
        
        // Add a unique ID if it's not provided
        if (!body.id) {
            body.id = uuid();
        }

        // Create a new item in DynamoDB
        const results = await peopleModel.create(body);

        // Set the response
        response.statusCode = 200;
        response.body = JSON.stringify(results);
    } catch (err) {
        // Handle any errors
        response.statusCode = 500;
        response.body = JSON.stringify({ message: err.message });
    }

    return response;
};
