---
title: Serverless with Google x Twilio
date: '2017-12-04'
spoiler: This is my attempt with playing around serverless capabilities of Google's Cloud Functions. At the time of writing, the available language supported in Google Cloud Functions is NodeJS. In this post I'll describe the steps i did on writing and deploying NodeJS function to GCP.
---

This is my attempt with playing around serverless capabilities of Google's Cloud Functions. At the time of writing, the available language supported in Google Cloud Functions is NodeJS. In this post I'll describe the steps i did on writing and deploying NodeJS function to GCP. 

The brief goal of the experiment was to write a javascript app which accepts http post request. When the app received the request, it will use Twilio API to deliver SMS to a recipient. Also, to experience using [Serverless] (https://serverless.com) for deploying the app to Google. 

Before the actual dirty works, I have signed-up to Google Cloud and have setup a credential as well as enabled the required APIs for this experiment.

Then I installed serverless. In my case, I installed it globally.
 ​
```sh
npm install -g serverless
```

The installed serverless package, which is also a CLI tool, comes with lots of goodies and one of these is to help generate a code template. Below was the command to create the skeleton code targetted for Google.

```sh
mkdir serverless-sms-sender
cd serverless-sms-sender/
serverless create --template google-nodejs
```

After creating the skeleton code, I have to modify some configurations in serverless projects by modifying the generated serverless.yml.

Changed the `provider.project` to my Google Cloud Project ID.

Changed the `provider.credentials` to the path of my credential JSON that was created from my Google Cloud Account.

```yaml
# serverless.yml
service: sms-sender

provider:
  name: google
  runtime: nodejs
  project: <CHANGE TO YOU GOOGLE PROJECT ID>
  credentials: <CHANGE TO THE PATH OF YOUR GOOGLE JSON CREDENTIALS>

plugins:
  - serverless-google-cloudfunctions

package:
  exclude:
    - node_modules/**
    - .gitignore
    - .git/**
    - gcp-keyfile.json

functions:
  sms:
    handler: sms
    events:
      - http: path
```

​I also modified the generated index.js, adding capability to invoke Twilio via its wrapper in sms.js

```js
'use strict';
const Sms = require('./sms');

exports.sms = (request, response) => {
  const sms = new Sms();
  sms.send(request.body.message,request.body.to).then(smsReceipt=>{
    response.status(200).send(JSON.stringify(smsReceipt));
  })
};
```

The Twilio wrapper class to help me do the SMS sending

```js
// sms.js
'use strict';
const client = require('twilio')
const config = require('./twilio.config.json')

class Sms {
  constructor() {
    this._client = client(config.twilioAccounSID, config.twilioAuthToken)
  }
  
  send(message,to) {
    return this._client.messages.create({
      from: config.twilioDeveloperPhone,
      to: to,
      body: message
    }).then(receipt => Promise.resolve({ sent: receipt.sid }))
  }
}

module.exports = Sms;
```
My Twilio credential is in a separated JSON file which was imported and used by the sms.js

```json
{
    "twilioAccounSID":"REPLACE THIS WITH YOUR TWILIO ACCOUNT SID", 
    "twilioAuthToken":"REPLACE THIS WITH YOUR TWILIO TOKEN",
    "twilioDeveloperPhone":"REPLACE THIS WITH YOUR TWILIO DEVELOPER PHONE"
}
```

Then I use back the serverless CLI tool to deploy the app to my Google Cloud instance


```sh
serverless deploy
```

After the deployment was okay, the URL endpoint of the deployed cloud function can be seen in the terminal logs of serverless, just below the Deployed Functions section

```sh
# snippets from logs
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Compiling function "sms"...
Serverless: Uploading artifacts...
Serverless: Artifacts successfully uploaded...
Serverless: Updating deployment...
Serverless: Checking deployment update progress...
......
Serverless: Done...
Service Information
service: sms-sender
project: XXXXXXXXX
stage: dev
region: us-central1

Deployed functions
sms
  https://us-central1-XXXXXXXXX.cloudfunctions.net/sms
```

To test, I invoked the URL endpoint of the deployed function using my own number as the recipient​

```sh
curl -H "Content-Type: application/json" -X POST -d '{"message":"helloworld","to":"+6391234"}' https://us-central1-XXXXXXXXX.cloudfunctions.net/sms
```

And voila, i received the `helloworld` sms.