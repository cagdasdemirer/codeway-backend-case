/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retrieve a list of logs.
 *     description: Retrieve a list of logs from BigQuery. Can be used to reviewing or testing an API.
 *     responses:
 *       200:
 *         description: A list of logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job_id:
 *                   type: string
 *                   example: 2f2ec56c-d9e4-4b85-aa4a-1ccc55b3f200
 *                 job_status:
 *                   type: string
 *                   example: Done
 *                 job_time:
 *                   type: string
 *                   example: 500 ms
 *                 status:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: event
 *                       session_id:
 *                         type: string
 *                         example: 9FDA74C2-AB57-4840-87D0-64324772B5A2
 *                       event_name:
 *                         type: string
 *                         example: click
 *                       event_time:
 *                         type: integer
 *                         example: 1589623711
 *                       page:
 *                         type: string
 *                         example: main
 *                       country:
 *                         type: string
 *                         example: TR
 *                       region:
 *                         type: string
 *                         example: Marmara
 *                       city:
 *                         type: string
 *                         example: Istanbul
 *                       user_id:
 *                         type: string
 *                         example: Uu1qJzlfrxYxOS5z1kfAbmSA5pF2
 *       400:
 *         description: Call failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Message
 */

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Stream a list of logs.
 *     description: Stream a list of logs to BigQuery. Can be used to stream batch data or testing an API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 type:
 *                   type: string
 *                   example: event
 *                 session_id:
 *                   type: string
 *                   example: 9FDA74C2-AB57-4840-87D0-64324772B5A2
 *                 event_name:
 *                   type: string
 *                   example: click
 *                 event_time:
 *                   type: integer
 *                   example: 1589623711
 *                 page:
 *                   type: string
 *                   example: main
 *                 country:
 *                   type: string
 *                   example: TR
 *                 region:
 *                   type: string
 *                   example: Marmara
 *                 city:
 *                   type: string
 *                   example: Istanbul
 *                 user_id:
 *                   type: string
 *                   example: Uu1qJzlfrxYxOS5z1kfAbmSA5pF2
 *     responses:
 *       200:
 *         description: A list of streamed logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stream_time:
 *                   type: string
 *                   example: 550.20 ms
 *                 inserted_data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: event
 *                       session_id:
 *                         type: string
 *                         example: 9FDA74C2-AB57-4840-87D0-64324772B5A2
 *                       event_name:
 *                         type: string
 *                         example: click
 *                       event_time:
 *                         type: integer
 *                         example: 1589623711
 *                       page:
 *                         type: string
 *                         example: main
 *                       country:
 *                         type: string
 *                         example: TR
 *                       region:
 *                         type: string
 *                         example: Marmara
 *                       city:
 *                         type: string
 *                         example: Istanbul
 *                       user_id:
 *                         type: string
 *                         example: Uu1qJzlfrxYxOS5z1kfAbmSA5pF2
 *       400:
 *         description: Call failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Message
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Retrieve a statistic about logs.
 *     description: The API provideS a basic analytics GET endpoint for serving aggregated results retrieved from BigQuery via SQL.
 *     responses:
 *       200:
 *         description: A basic analytics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job_id:
 *                   type: string
 *                   example: 2f2ec56c-d9e4-4b85-aa4a-1ccc55b3f200
 *                 job_status:
 *                   type: string
 *                   example: Done
 *                 job_time:
 *                   type: string
 *                   example: 1000 ms
 *                 status:
 *                   type: string
 *                   example: Success
 *                 total_user:
 *                   type: integer
 *                   example: 1000
 *                 daily_stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: 16/05/20
 *                       average_session:
 *                         type: string
 *                         example: 20.5
 *                       active_user_count:
 *                         type: integer
 *                         example: 50
 *                       new_user_count:
 *                         type: integer
 *                         example: 5
 *       400:
 *         description: Call failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Message
 */

/**
 * @swagger
 * /api/logs/{user}:
 *   get:
 *     summary: Retrieve a list of filtered logs by user id.
 *     description: Retrieve a list of logs have same use id from BigQuery. Can be used to reviewing or testing an API.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *           example: Uu1qJzlfrxYxOS5z1kfAbmSA5pF2
 *     responses:
 *       200:
 *         description: A list of logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job_id:
 *                   type: string
 *                   example: 2f2ec56c-d9e4-4b85-aa4a-1ccc55b3f200
 *                 job_status:
 *                   type: string
 *                   example: Done
 *                 job_time:
 *                   type: string
 *                   example: 500 ms
 *                 status:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: event
 *                       session_id:
 *                         type: string
 *                         example: 9FDA74C2-AB57-4840-87D0-64324772B5A2
 *                       event_name:
 *                         type: string
 *                         example: click
 *                       event_time:
 *                         type: integer
 *                         example: 1589623711
 *                       page:
 *                         type: string
 *                         example: main
 *                       country:
 *                         type: string
 *                         example: TR
 *                       region:
 *                         type: string
 *                         example: Marmara
 *                       city:
 *                         type: string
 *                         example: Istanbul
 *                       user_id:
 *                         type: string
 *                         example: Uu1qJzlfrxYxOS5z1kfAbmSA5pF2
 *       400:
 *         description: Call failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Message
 */

/**
 * @swagger
 * /api/logs/{session}:
 *   get:
 *     summary: Retrieve a list of filtered logs by session id.
 *     description: Retrieve a list of logs have same session id from BigQuery. Can be used to reviewing or testing an API.
 *     parameters:
 *       - in: path
 *         name: session_id
 *         required: true
 *         description: ID of the session.
 *         schema:
 *           type: string
 *           example: 9FDA74C2-AB57-4840-87D0-64324772B5A2
 *     responses:
 *       200:
 *         description: A list of logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job_id:
 *                   type: string
 *                   example: 2f2ec56c-d9e4-4b85-aa4a-1ccc55b3f200
 *                 job_status:
 *                   type: string
 *                   example: Done
 *                 job_time:
 *                   type: string
 *                   example: 500 ms
 *                 status:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: event
 *                       session_id:
 *                         type: string
 *                         example: 9FDA74C2-AB57-4840-87D0-64324772B5A2
 *                       event_name:
 *                         type: string
 *                         example: click
 *                       event_time:
 *                         type: integer
 *                         example: 1589623711
 *                       page:
 *                         type: string
 *                         example: main
 *                       country:
 *                         type: string
 *                         example: TR
 *                       region:
 *                         type: string
 *                         example: Marmara
 *                       city:
 *                         type: string
 *                         example: Istanbul
 *                       user_id:
 *                         type: string
 *                         example: Uu1qJzlfrxYxOS5z1kfAbmSA5pF2
 *       400:
 *         description: Call failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Message
 */