---
title: Streaming UI Components thru Websockets
date: '2021-04-10'
spoiler: A short weekend experiment on using websocket to stream html and javascript components to client side.Not perfect, and theres lots of issues specially on the part when it surgically appends inline scripts to the DOM the moment the client receives js functions thru websocket. Just for exploration and maybe could inspire you/me to do something similar
---

This is just an experiment and theres lots of issues specially on the part when it surgically appends inline scripts to the DOM the moment the client receives js functions thru websocket.

## The Websocket API
From MDN "The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply." https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

The goal of this experiment is to try to dynamically render HTML components without the need to do a full http roundtrip to server. We just want to check an alternative to Server-side rendering (SSR), that way we dont need to do a full render of a page from server to client.

With websockets, since the session is already open and established between the client and server, we will use this pipe to send small chunks of info to the UI. 

## The Client
We need a placeholder for the JS functions and DOM elements that we want to push thru sockets. Its a simple HTML that have a script to establish a connection to our Websocket server and a listener to receive messages from server. The contents of `index.html` is something like this
```xml
<!DOCTYPE html>
<body>
  <script>
    const ws = new WebSocket('ws://localhost:3030');
      ws.onopen = () => { console.log('Now connected'); };
      ws.onmessage = (event) => {
        // ... see below content
      };
  </script>
</body>
</html>
```

Depending on what property of the message the client receives, we will have a small function to create a `script` element if its a JS function or a `div` if its an HTML component.
```javascript
ws.onmessage = (event) => {
  const { fun, ui } = JSON.parse(event.data)
  if(fun) {
    const newFun = document.createElement("script");
    newFun.text = fun
    document.body.appendChild(newFun);
  }
  
  if(ui) {
    const uicomponent = document.createElement("div");
    uicomponent.innerHTML = ui
    document.body.appendChild(uicomponent); 
  }
};
```

## The Server
We can use Express to send the index.html to a requesting client.
```javascript
const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);
```

And we can piggy back on this Express server for the Websocket server.
```javascript
const WebSocket = require('ws');
// .. the express code above
const wsServer = new WebSocket.Server({ port: 3030 });
wsServer.on('connection', (wsClient) => {
  console.log('connected');

  // see snippets below

  wsClient.on('close', (wsClient) => {
    console.log('closed');
  });
});
```
So when a websocket client is connected, we will send down 2 things: a JS Function and an HTML Component
```Javascript
const component = {
    fun: `const x = () =>alert("this is button")`,
    ui: `<button onclick="x()">from server</button>`
  };
  wsClient.send(JSON.stringify(component));
```
Of course you need to check first if pipe is open via `client.readyState`, but to simplify we will ignore it.

## Full code
The node project
```sh
mkdir ui-on-websockets
cd ui-on-websockets
npm install express ws --save
touch app.js
touch index.html
```
The `index.html` source
```xml
<!DOCTYPE html>
<body>
  <script>
    const ws = new WebSocket('ws://localhost:3030');
    ws.onopen = () => { console.log('Now connected'); };
    ws.onmessage = (event) => {
      const { fun, ui } = JSON.parse(event.data)
      if(fun) {
        const newScript = document.createElement("script");
        newScript.text = fun
        document.body.appendChild(newScript);
      }
    
      if(ui) {
        const uicomponent = document.createElement("div");
        uicomponent.innerHTML = ui
        document.body.appendChild(uicomponent); 
      }   
    };
  </script>
</body>
</html>
```
The `app.js` code
```javascript
const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);

const wsServer = new WebSocket.Server({ port: 3030 });
wsServer.on('connection', (wsClient) => {
  console.log('connected');

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const component = {
        fun: `const x = () =>alert("this is button")`,
        ui: `<button onclick="x()">from server</button>`
      };
      wsClient.send(JSON.stringify(component));
    }
  });

  wsClient.on('close', (client) => {
    console.log('closed');
  });
});

```
The package.json 
```json
{
  "name": "ui-on-websockets",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "ws": "^7.4.4"
  }
}
```
