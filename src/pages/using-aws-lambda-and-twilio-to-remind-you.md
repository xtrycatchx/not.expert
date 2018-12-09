---
title: Using AWS Lambda and Twilio to remind you
date: '2017-08-12'
spoiler: Using serverless to help remind myself not to forget paying my housing loan by sending SMS to my phone every 16th of the month. The scheduler is a function deployed in AWS Lambda.
---

Being a forgetful person, I need to constantly remind myself especially on adult stuffs like "paying my monthly Pag-Ibig loan".By the way, PAG-IBIG or HDMF is a Philippine government-owned corporation that provides us Filipinos with housing loans.

**So yes, I need to remind myself via calendar alarms, email calender scheds so I wont forget my due. On top of these reminding-tools,I'll add another way to remind myself - by sending SMS to my phone.**

In this post, we will do a Serverless application that will help us remind on small things via SMS. We will use NodeJS to write our function, Serverless to help us deploy it, Twilio for the SMS and AWS Lambda where our notifier will notify us at scheduled times.

Yes, I agree with you, this is a overkill. But for the sake of fun and learning, lets try this.

Lets start!

---

**Install Serverless**

​Lets us `serverless` to deploy our application to AWS Lambda. If you don't have serverless installed, you may install it using npm

```sh
$ npm install -g serverless
```
---
**Compose the Serviceless Service**
Lets name our service `pagibig-payment-notifier`. Because we will be deploying this function into AWS Lambda, the `provider.name` will be aws with runtime as `nodej6.10`. Specify ap-southeast-1 which is Singapore because has the same timezone with Philippines, UTC+08:00.

```yaml
# service.yaml
service: pagibig-payment-notifier
provider:
   name: aws
   runtime: nodejs6.10
   region: ap-southeast-1
   
functions:
   pagIbigNotifier:
      handler: notifier.sender
      events:
       - schedule: cron(00 09 16 * *)
}
```
---
What we have now is a service that will trigger a scheduled cron e`very 9AM of the 16th day of the month`. When this event occurs, the function handler `sender` of the `notifier.js` will be invoked.

**The Lambda Function**

​The content of the lambda our notifier.js will be:

```js
// notifier.js
'use strict';
const Sms = require('./sms');

module.exports.sender = (event, ctx, cb) => {
    const sms = new Sms();
    // message in English is "Pay your Pag-Ibig mortgage due today"
    sms.send('+6XXXXXXXX','Bayad na sa Pag-Ibig karun!')
       .then(smsReceipt=>{
        console.log(JSON.stringify(smsReceipt));
        cb();
    })
}
```

The required sms.js above is from our previous attempt with Google Cloud Function using Twilio here.

---

**Deploy our notifier**

If you haven't done so, you need to export the en variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` of your AWS Account.

​Once everything is ready, deploy our lambda function

```shell
export AWS_ACCESS_KEY_ID=<your-key-id-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-access-key-here>
serverless deploy
```

This is just very basic and simple approach of stitching services that is available out there and how we can take advantage of these to help us.