const dynamoose = require('dynamoose')

const schema = new dynamoose.Schema({"id":String, "name":String, "age":Number});

const peopleModel = dynamoose.model('people', schema)

exports.handler = async(e) => {
    const response = {statusCode: null, body: null};

    if(e.pathParameters){
        console.log('path parameters:',e.pathParameters
        )
    }
    else{
        console.log('no path parameters')
    }

    try{
        let result = await peopleModel.scan().exec();
        response.body = result;
        response.statusCode = 200;
    }
    catch(e){
        response.body = {message:e.message};
        response.statusCode = 500
    }
    return response
}