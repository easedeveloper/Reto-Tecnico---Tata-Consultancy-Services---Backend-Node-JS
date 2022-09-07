const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const addTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { names, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = event.body;
  const id = v4();

  console.log("created id: ", id);

  const newTask = {
    id,
    names,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    done: false,
  };

  await dynamodb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};

module.exports = {
  addTask: middy(addTask).use(httpJSONBodyParser()),
};
