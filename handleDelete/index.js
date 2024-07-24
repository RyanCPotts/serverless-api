const dynamoose = require('dynamoose');


const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "age": Number
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async(e)=>{
    const response = {
        statusCode: null,
        body: null
    };
    if(!e.pathParameters || !e.pathParameters.id){
        response.statusCode = 400;
        response.body = {message:"missing id"}
    }
    const id = e.pathParameters.id;

    try{
        let results = await peopleModel.delete({id});
        response.statusCode = 200;
        response.body = JSON.stringify(results)
    }
    catch(e){
        response.statusCode = 500;
        response.body = JSON.stringify(e.message)
    }
    return response
}