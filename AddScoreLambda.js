'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '201',
        body: err ? err.message : {"message":"score added"},
        headers: {
            'Content-Type': 'application/json',
        },
    });

    var body = {
        "TableName": "Golf",
        "Item": {
            "memberid": JSON.parse(event.body).memberid,
            "score" : JSON.parse(event.body).score
        }
    }
    dynamo.putItem(body, done);

};
