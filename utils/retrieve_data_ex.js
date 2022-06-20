require('dotenv').config({ path: require('find-config')('.env') });
const bigquery = require('../configuration/config');


/**
*Retrieve data from BigQuery
*@param {string} projectId The ID of the GCP project the dataset/table is located
*@param {string} datasetId The ID of the parent dataset
*@param {string} tableId The ID of the table to get data from
*@returns {Promise<void>}
*/

const getData = async (projectId,datasetId,tableId) => {

  const query = `SELECT * from \`${projectId}.${datasetId}.${tableId}\` LIMIT 20`;

  const options = {
    query: query,
  }

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log('Job '+job.id+' started.\n');

  const [rows] = await job.getQueryResults();

  console.log('Resulted Rows:');
  rows.forEach(row => console.log(row));

}

const main = async () => {

    await getData(process.env.PROJECT_ID, process.env.DATASET_ID, process.env.TABLE_ID);
}

main ();