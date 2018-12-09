---
title: Cloud Functions executing Openssl
date: '2017-12-02'
spoiler: The possibility of executing native binaries in serverless infra like Google Gloud Functions. In my previous experience, its possible to execute openssl within AWS Lambda.I this post, I'm doing the same approach to Google Cloud Functions.
---

In this experiment, I want to share the possibility of executing native binaries in serverless infra like Google Gloud Functions. In my previous experience, I was able to execute openssl related commands in AWS Lambda. I was using that time NodeJS's built-in child_process. I did the same approach in Google Cloud in this post.

The cloud function i have executes openssl's genrsa via exec method of child_process. 

```js
'use strict';
const fs = require('fs')
const exec = require('child_process').exec;
const destination = '/tmp/experiment.key.pem'

exports.execOpenssl = (request, response) => {
    
  const cmd = `export RANDFILE=/tmp/.rnd && openssl genrsa -out ${destination} 2048`
  const child = exec(cmd, (error, stdout, stderr) => {
    
    if (error) {
      console.error("Signing ERROR", error);
      response.status(400).send(JSON.stringify({message: 'ERROR'}));
    } else {
      const testKey = fs.readFileSync(destination);
      console.log("Signing SUCCESS");
      response.status(200).send(JSON.stringify({message: testKey.toString()}));
    }
    
  }); 
};
```

Executing that code behaves well in `Google Cloud Functions`. 

Both in this experiment and in the previous one with AWS Lambda, I didn't bundle the openssl which means it is there by default in both serverless platform.

Both platforms, `Google Cloud Functions` and `AWS Lambda`, also allows write permissions to the dir `/tmp` .

So what I did in the function above, is just to export an environment variable RANDFILE pointing to `/tmp` and when openssl generates the key we just set the target out parameter to be in `/tmp/experiment.key.pem`.

Hope this helps anyone who's keen to executing third party binaries/executables in Google Cloud Function.