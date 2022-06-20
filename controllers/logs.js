const ash = require('express-async-handler'); // Async Error Handling, more robust way then try-catch-next
require('dotenv').config({ path: require('find-config')('.env') });
const bigquery = require('../configuration/config');

// Job time calculation
function getDurationInMilliseconds(start) {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return ((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toFixed(2).toLocaleString();
}

const getData = ash (async (req, res) => {
    try {
    const start = process.hrtime()
    const query = `SELECT * from \`${process.env.PROJECT_ID}.${process.env.DATASET_ID}.${process.env.TABLE_ID}\``;
    const options = {
        query: query,
    }

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    const queryTime =  getDurationInMilliseconds (start)

    res.status(200).json({
        job : job.id,
        job_status: job['metadata']['status']['state'],
        job_time: `${queryTime} ms`,
        status: 'success',
        data: rows,
    });

    res.end();
    } catch (error){
        const message = error['errors'][0]['message'].split(' ').slice(0, 3).join(' ');
        res.status(400).json({
            status: 'failed',
            error: message,
        });
        res.end();
        console.log(`Failed: ${message}`);
    }
})

const sendData = ash (async (req, res) => {
    try {
    const start = process.hrtime()
    const rows = [req.body]
    
    //Because of 1000 INSERT queries per table per day limit, we use stream instead of query job (also faster)
    await bigquery
    .dataset(process.env.DATASET_ID)
    .table(process.env.TABLE_ID)
    .insert(rows);

    const queryTime =  getDurationInMilliseconds (start)

    res.status(200).json({
        stream_time: `${queryTime} ms`,
        status: 'success',
        inserted_data: rows,
    });
    res.end();

    console.log(`Number of rows inserted: ${rows.length}`);
    }
    catch (error) {
    const message = error['errors'][0]['errors'][0]['message']
    res.status(400).json({
        status: 'failed',
        error: message,
    });
    res.end();
    console.log(`Failed: ${message}`); 
    }
})

const getDataById = ash (async (req, res) => {
    try {
    const id = req.params.sessionID
    const start = process.hrtime()
    const query = `
                    SELECT * 
                    FROM \`${process.env.PROJECT_ID}.${process.env.DATASET_ID}.${process.env.TABLE_ID}\`
                    WHERE session_id = '${id}'
                    ORDER BY event_time DESC;
                    `;
    const options = {
        query: query,
    }

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    const queryTime =  getDurationInMilliseconds (start)

    res.status(200).json({
        job : job.id,
        job_status: job['metadata']['status']['state'],
        job_time: `${queryTime} ms`,
        status: 'success',
        data: rows,
    });

    res.end();
    } catch (error){
        const message = error['errors'][0]['message'].split(' ').slice(0, 2).join(' ');;
        res.status(400).json({
            status: 'failed',
            error: message,
        });
        res.end();
        console.log(`Failed: ${message}`);
    }
})

const getDataByUser = ash (async (req, res) => {
    try {
    const id = req.params.userID
    const start = process.hrtime()
    const query = `
                    SELECT * 
                    FROM \`${process.env.PROJECT_ID}.${process.env.DATASET_ID}.${process.env.TABLE_ID}\`
                    WHERE user_id = '${id}'
                    ORDER BY event_time DESC
                    LIMIT 100;
                    `;
    const options = {
        query: query,
    }

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    const queryTime =  getDurationInMilliseconds (start)

    res.status(200).json({
        job : job.id,
        job_status: job['metadata']['status']['state'],
        job_time: `${queryTime} ms`,
        status: 'success',
        data: rows,
    });

    res.end();
    } catch (error){
        const message = error['errors'][0]['message'].split(' ').slice(0, 3).join(' ');;
        res.status(400).json({
            status: 'failed',
            error: message,
        });
        res.end();
        console.log(`Failed: ${message}`);
    }
})

module.exports = {
    getData,
    sendData,
    getDataById,
    getDataByUser
}