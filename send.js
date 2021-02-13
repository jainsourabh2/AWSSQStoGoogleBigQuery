// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

// Create SQS service client
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// Replace with your accountid and the queue name you setup
const accountId = '258563249917';
const queueName = 'firstcry';

// Setup the sendMessage parameter object
for (i=0;i<2000;i++){
const params = {
  MessageBody: JSON.stringify({
    order_id: 1234,
    date: (new Date()).toISOString()
  }),
  QueueUrl: `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`
};

//console .log (params.MessageBody);

sqs.sendMessage(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Successfully added message", data);
  }
});
}
