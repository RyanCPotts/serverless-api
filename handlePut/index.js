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
        return response
    }
    const id = e.pathParameters.id;
    if(!e.body){
        response.statusCode = 400;
        response.body = {message:'missing request body'};
        return response;
    }

    const updatedData = JSON.parse(e.body);

    try{
        await peopleModel.update({id}, updatedData);
        response.statusCode = 200;
        response.body = {message:"record updated successfully"}
    }
    catch(e){
        response.statusCode = 500;
        response.body = {message: e.message}
    }

    return response
}