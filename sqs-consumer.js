//Loading the dependencies
const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const https = require('https');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
// Load the credential
AWS.config.loadFromPath('./config.json');

//Declare App Constants
const awsSQSQueue = 'https://sqs.us-east-1.amazonaws.com/258563249917/firstcry';
const bigQueryDataSet = 'irisdataset';
const bigQueryTableName = 'sqs_demo_json_parse_final';

const app = Consumer.create({
  queueUrl: awsSQSQueue,
  batchSize : 10,
  handleMessageBatch: async (rows) => {
    //Declare local array to store the rows.
    let bq_ds = [];

    //Loop through the incoming batch to prepare the
    //bigquery data array to be inserted
    for(let i=0;i<rows.length;i++){
        let json_parsed_row = JSON.parse(rows[i].Body);
        bq_ds.push(json_parsed_row);
    }

    // Stream the data prepared into BigQuery
    try{

      await bigquery
      .dataset(bigQueryDataSet)
      .table(bigQueryTableName)
      .insert(bq_ds);

    }catch(error){
        //Push Data into file if BQ Insert Fails.
        //TBD : The Code needs to be written here.
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