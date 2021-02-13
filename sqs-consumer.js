const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const https = require('https');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
// Load the credential
AWS.config.loadFromPath('./config.json');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/258563249917/firstcry',
  batchSize : 10,
  handleMessageBatch: async (rows) => {
     //console.log(rows); 
    let bq_ds = [];
    for(let i=0;i<rows.length;i++){
        let json_parsed_row = JSON.parse(rows[i].Body);
        bq_ds.push(json_parsed_row);
    }
    console.log(bq_ds);
    // Insert data into a table
    try{
    await bigquery
    .dataset('irisdataset')
    .table('sqs_demo_json_parse_final')
    .insert(bq_ds);
    }catch(error){
        console.log(error);
    }
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true
      })
    }
  })
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();