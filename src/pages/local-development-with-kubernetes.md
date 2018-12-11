---
title: Local Development with K8s
date: '2018-07-31'
spoiler: My approach in running apps locally in a Kubernetes environment in as easy as possible way, for my local development purposes.
---

This is my approach in running applications locally in a Kubernetes environment in as easy as possible way, for my development purposes. I tried to evade the bloody kubernetes setup as much as I can. Also, I will cover my strategy in allowing Kubernetes to pull my apps without the need of pushing it to public repos like Docker Hub.

---
**Setting up Kubernetes**

The quickest approach i had tried is using minikube to run Kubernetes. Below are the commands I used to download minikube. In my case, I got issues and problems running the latest version of minikube, os what i did was i tried backwards each version until I got satisfied with v0.25.2. I didn't have much time to investigate the cause of my problems with the latest version, so i did stick with this version.

```sh
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.25.2/minikube-darwin-amd64
$ chmod +x minikube
$ sudo mv minikube /usr/local/bin/
```
Next is to start minikube. I am running minikube in a VirtualBox and my VirtualBox version is 5.2.16

```sh
$ minikube start --vm-driver=virtualbox
```

The above command will download the minikube image and will setup the kubernetes cluster.  Once done, you can now magically open the kubernetes dashboard by this command

```sh
$ minikube dashboard
```

Then install the kubectl so later we can use it when deploying our app.

```sh
$ curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.9.4/bin/darwin/amd64/kubectl
$ chmod +x kubectl
$ sudo mv kubectl /usr/local/bin/
```

---

**Write some App**

For simplicity, below is the sample Express app that says Hello when accessed via Http Get.

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('HIT', new Date());
  res.json({ message: 'Hello' })
});

app.listen(3000, () => console.log('listening at port 3000'));
```

And the Dockerfile

```dockerfile
FROM node:8-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install && npm prune --production
CMD ["npm", "start"]
EXPOSE 3000
```

And the `app.yaml` file for later Kubernetes deployment and service.

```yaml
# Deployment
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    run: hello-world-app
  name: hello-world-app
spec:
  replicas: 1
  selector:
    matchLabels:
      run: hello-world-app-exposed
  template:
    metadata:
      labels:
        run: hello-world-app-exposed
    spec:
      containers:
      - image: localhost:5000/hello-world-app:0.0.1
        name: hello-world-app
        ports:
        - containerPort: 3000
          protocol: TCP
---
# Service
apiVersion: v1
kind: Service
metadata:
  labels:
    run: hello-world-app
  name: hello-world-app
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 3000
  selector:
    run: hello-world-app-exposed
  type: NodePort
```
---

**Run the app on Kubernetes**


Before we can run, normally we need to have this docker image pushed to a registry like docker.io that later will be fetch by kubernetes when we do the kubectl create command. For me, i don't want to do that because I don't want to share my docker images publicly for some reasons. Since, this is just development, let's not complicate things by setting up our own registry, but lets just reuse the built in registry within minikube.

To do that, we can use eval when we build our docker images, that way we won't be building in oru host machine but directly building within kubernetes.

```sh
$ eval $(minikube docker-env)
```

So after eval, all commands will be hitting the docker instance within our minikube. 
​
Lets first create a local registry

```sh
$ docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

And then proceed with the build and tag of our app.

```sh
$ docker build . --tag hello-world-app
$ docker tag hello-world-app localhost:5000/hello-world-app:0.0.1
```

And then deploy the app with kubernetes create command

```sh
$ kubectl create -f hello-world-app.yaml
```

Once done, you can get the url using the command
```sh
$ minikube service hello-world-app --url
```
The above command will give the url for the hello-world-app.

---

Thats it. It's not perfect, but at least on Dev side you'll be able to have peace of mine that your containers maybe can now run on production because, locally you have tested it with a very basic and minimal Kubernetes environment.

You can get resources of the above sample codes here: ​https://github.com/xtrycatchx/k8s-local
