# Data Pipeline to move data from AWS SQS to Google BigQuery using NodeJS

The sample code provides steps to move data from AWS SQS into Google BigQuery. 
The data can be processed in between before pushing into Google BigQuery

## Getting Started

### Functional Requirements

* The incoming JSON structure should match with the Google BigQuery table schema.

### Technical Requirements

* NodeJS - NodeJS needs to be installed on the target server.

### Requirements

1. Clone the git repository : https://github.com/jainsourabh2/AWSSQStoGoogleBigQuery.git
2. Install the dependencies : npm install
3. Install the Process Manager PM2 : npm install -g pm2
4. Submit the App tp PM2 : pm2 start sqs-consumer.js -i max
5. Validate the threads : PM2 list