const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const addTareas = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { nombre, altura, masa, color_de_pelo, color_de_piel, color_de_ojos, cumpleanos, genero } = event.body;
  const id = v4();

  console.log("created id: ", id);

  const newTareas = {
    id,
    nombre,
    altura,
    masa,
    color_de_pelo,
    color_de_piel,
    color_de_ojos,
    cumpleanos,
    genero,
    done: false,
  };

  await dynamodb
    .put({
      TableName: "TaskTablees",
      Item: newTareas,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTareas),
  };
};

module.exports = {
  addTask: middy(addTareas).use(httpJSONBodyParser()),
};
