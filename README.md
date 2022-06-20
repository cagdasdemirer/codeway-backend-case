# Codeway Software Engineering Case
![tree_based_view.png](https://i.ibb.co/kgSxZyH/tree.png)
## Index
- swagger.js       : Swagger UI setups
- schemas.js : API endpoint schemas for Swagger UI
- logs.js : Controller functions for log related endpoints
- stats.js : Controller function for analytical endpoint
- routes.js : All routes for app
- config.js : BigQuery connection configuration
- create_dataset_table.js : Create Bigquery Dataset and Table in Project
- index.js : Handles app startup
- .env : Critical Environment Variables
![env_variables.png](https://i.ibb.co/H423vgr/env.png)
- Dockerfile : Commands for install an image

##  Summary of Steps
1) Because of security issues, I created an extra service account via GCP IAM and I set up my next connections over this json key file. Then I created my queries by making various experiments.
2) I tried to build a secure Node.js REST API. I was careful to split the project into as many reusable codes as possible.After I wrote my API endpoints, I focused on the error handling part.
3) I documented the requests and responses of API endpoints in detail using Swagger UI.
![swagger.png](https://i.ibb.co/jWq5hyB/swagger.png)
4) I dockerized application.
5) I created a markdown file about the process and project structure.
##  Final Thought
First of all, this project was my first project where I used node.js. Although I find JSON parsing performance insufficient to use in data pipelines, I can say that it is very easy to use for fast solutions and micro service architecture. I believe BigQuery is a "write once, read many" technology that uses immutable files to store. That's why I think my project is lacking in terms of scalability. Even though I created a working application in 3 days that I could spare for Case, I don't think my solution is optimized.If I had more time to spare, I would like to set up Pub / Sub - Cloud SQL - BigQuery architecture with the help of Dataflow and perform BigQuery analysis with Indexed tables much faster.If I connected the Deployment process to Cloud Run on top of this architecture, it would be very nice to develop an open-ended API that can record and analyze millions of events safely and quickly. Although it took more time than I expected to adapt to the js syntax and express archictecture, I think I did a good job in 3 days and learned a lot about GCP. It was a thrilling and instructive experience.
![arc.png](https://i.ibb.co/fXYHHyv/Screenshot-1.png)
*An example of architecture that can be used in the future of the project
 
## License

MIT

**Thanks for reading till the end :D**
