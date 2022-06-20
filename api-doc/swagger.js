const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Codeway Backend Case API',
      version: '1.0.0',
      description:
      `This is a REST API application made with Express. 
       It collects event logs from mobile devices through a HTTP POST endpoint and store those logs in Google BigQuery.
       It also provides aggregated analytical results retrieved from BigQuery via SQL.`,
      license: {
        name: 'Licensed Under MIT',
        url: 'https://github.com/cagdasdemirer/codeway-backend-case/blob/main/LICENSE',
      },
      contact: {
        name: 'Çağdaş Demirer',
        url: 'https://www.linkedin.com/in/cagdasdemirer/',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./api-doc/schemas.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
};

module.exports = { swaggerDocs };