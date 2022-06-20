require('dotenv').config({ path: require('find-config')('.env') })
const bigquery = require('../configuration/config');

const location = process.env.LOCATION




/**  
*Create a new dataset and return its ID
*@param {string} datasetName
*@returns {Promise<string>}
*/
const createDataset = async (datasetName) => {

	const [dataset] = await bigquery.createDataset(datasetName, location);
	console.log('Dataset ' + dataset.id +' created.');
	return dataset.id;
}

/**
*Create a new table and return its ID
*@param {string} datasetId The ID of the parent dataset
*@param {string} tableName The name of the table that should be created
*@returns {Promise<string>}
*/
const createTable = async (datasetId,tableName) => {
// Define Schema of BigQuery Table
	const schema = [
		{ name:'type', type:'STRING', mode:'REQUIRED'},
		{ name:'session_id', type:'STRING', mode:'REQUIRED'},
		{ name:'event_name', type:'STRING', mode:'REQUIRED'},
		{ name:'event_time', type:'INTEGER', mode:'REQUIRED'},
		{ name:'page', type:'STRING', mode:'REQUIRED'},
		{ name:'country', type:'STRING', mode:'REQUIRED'},
		{ name:'region', type:'STRING', mode:'REQUIRED'},
		{ name:'city', type:'STRING', mode:'REQUIRED'},
		{ name:'user_id', type:'STRING', mode:'REQUIRED'},
	];

	const options = {
		location, schema
	};

	const [table] = await bigquery
		.dataset(datasetId)
		.createTable(tableName, options);

	console.log('Table ' + table.id +' created.');

	return table.id;
}


const main = async () => {
    const datasetId = await createDataset(process.env.DATASET_ID);
    await createTable(datasetId, process.env.TABLE_ID);
}

main();