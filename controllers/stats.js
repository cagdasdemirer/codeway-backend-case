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

const getStats = ash (async (req, res) => {
    try {
        const start = process.hrtime()
        const query = ` 
        SELECT  s.date as date, 
                ROUND(s.mean_duration,2) as average_session_duration, 
                s.user_count as active_user_count, 
                IFNULL(u.user_id, 0) as new_user_count,
        FROM
            (SELECT f.date, 
                    COUNT(DISTINCT(user_id)) as user_count,  
                    AVG(f.duration) as mean_duration
            FROM 
                (SELECT user_id, 
                        session_id, 
                        format_date('%d/%m/%Y',MIN((timestamp_seconds(event_time)))) as date, 
                        (MAX(event_time)-MIN(event_time)) as duration
                FROM \`${process.env.PROJECT_ID}.${process.env.DATASET_ID}.${process.env.TABLE_ID}\`
                GROUP BY user_id,session_id
            ) as f

            GROUP BY f.date) as s

        LEFT JOIN (SELECT   reg_date, 
                            COUNT(DISTINCT(user_id)) as user_id 
                    FROM 
                        (SELECT user_id, 
                                format_date('%d/%m/%Y',MIN(timestamp_seconds(event_time))) as reg_date 
                        FROM \`${process.env.PROJECT_ID}.${process.env.DATASET_ID}.${process.env.TABLE_ID}\`
                        GROUP BY user_id
                        )
                    GROUP BY reg_date
                    ) as u
        ON s.date = u.reg_date
        ORDER BY PARSE_DATE('%d/%m/%Y', date);
        `;
        const options = {
            query: query,
        }
    
        // Run the query as a job
        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        const queryTime =  getDurationInMilliseconds (start)
        const totalUser = rows.map(rows => rows.new_user_count).reduce((partialSum, x) => partialSum + x, 0);
        res.status(200).json({
            job_id : job.id,
            job_status: job['metadata']['status']['state'],
            job_time: `${queryTime} ms`,
            status: 'success',
            total_users: totalUser,
            daily_stats: rows,
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

module.exports = getStats