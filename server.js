const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'ItemsTablee';

exports.handler = async (event) => {
  const method = event.httpMethod;

  if (method === 'POST') {
    const body = JSON.parse(event.body);
    const item = {
      id: Date.now().toString(),
      name: body.name
    };

    await dynamo.put({
      TableName: TABLE_NAME,
      Item: item
    }).promise();

    return {
      statusCode: 201,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: 'Item added' })
    };
  }

  if (method === 'GET') {
    const data = await dynamo.scan({ TableName: TABLE_NAME }).promise();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data.Items)
    };
  }

  return {
    statusCode: 405,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Method Not Allowed" })
  };
};
