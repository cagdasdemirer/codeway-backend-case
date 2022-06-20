require('dotenv').config({ path: require('find-config')('.env') })
const bigquery = require('../configuration/config');



/**
* Insert a certain set of rows into the passed table
* @param {string} datasetId The ID of the parent dataset
* @param {string} tableId The ID of the table to insert data in
* @returns {Promise<void>}
*/
const insertRows = async (datasetId,tableId) => {
  const rows = [
          {
             type: 'event',
             session_id : '9FDA74C2-AB57-4840-87D0-64324772B5A2',
             event_name : 'click',
             event_time : 1589623711,
             page : 'main',
             country : 'TR',
             region : 'Marmara',
             city : 'Istanbul',
             user_id : 'Uu1qJzlfrxYxOS5z1kfAbmSA5pF2'
          },
          {
             type: 'event',
             session_id : '9FDA74C2-AB57-5555-87D0-64324772B5A2',
             event_name : 'click',
             event_time : 1589623731,
             page : 'main',
             country : 'TR',
             region : 'Ege',
             city : 'Aydin',
             user_id : 'Zn45588REURH96lkjh877sdad98m'
          },
          {
             type: 'event',
             session_id : '9FDA74C2-AB57-6666-87D0-64324772B5A2',
             event_name : 'click',
             event_time : 1589623751,
             page : 'main',
             country : 'TR',
             region : 'Ege',
             city : 'Izmir',
             user_id : 'AdtyADSsa6d5sa1454sdaas233kl'
          },
  ];

  try {
  // Insert data intoatable
    await bigquery

    .dataset(datasetId)
    .table(tableId)
    .insert(rows);

    console.log('Inserted ' + rows.length + ' rows');
  } catch (e) {
  // Pretty print error as JSON
  console.error(JSON.stringify(e,null,2));
  }

}

const main = async () => {

    await insertRows(process.env.DATASET_ID, process.env.TABLE_ID);
}

main();