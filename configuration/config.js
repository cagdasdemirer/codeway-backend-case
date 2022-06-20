require('dotenv').config({ path: require('find-config')('.env') })

const { BigQuery } = require('@google-cloud/bigquery');

const  keyFileName = require('find-config')(process.env.SA_KEY)

const bigquery = new BigQuery({

	keyFilename: keyFileName, // Service Account's Key Fİle
	projectId: process.env.PROJECT_ID // GCP Project ID

});


module.exports =  bigquery ;
