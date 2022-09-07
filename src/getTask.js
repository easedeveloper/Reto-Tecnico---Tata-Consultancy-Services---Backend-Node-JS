const AWS = require("aws-sdk");

const getTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { termino } = event.pathParameters;

  if (termino == 'en') {
    const result = await dynamodb.scan({TableName: "TaskTable", Key: { id }, }).promise();
    const task = result.Items;
    return { status: 200,  body: task }
  } else
  if (termino == 'es') {
    const result = await dynamodb.scan({TableName: "TaskTablees", Key: { id }, }).promise();
    const task = result.Items;
    return { status: 200,  body: task }
  }

};

module.exports = {
  getTask,
};
