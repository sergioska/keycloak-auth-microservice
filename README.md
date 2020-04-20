# Auth Microservice

Auth Service is a node microservice that use keycloak to authorize an user

## Install and run

```
npm install
npm run build
npm run serve
```

## Install and run with docker

```
docker-compose up
```

## Deploy on Kuberbetes

This project is "Kuberbetes ready". 

```
kubectl apply -f pod.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

P.S.: before deploy pod resource update env part in pod description with keycload service correct name

```
apiVersion: v1
kind: Pod
metadata:
  name: auth-service.pod
spec:
  containers:
    - image: auth-service
      name: auth-service
      imagePullPolicy: Never
      resources: {}
      ports:
        - containerPort: 3100
      env:
        - name: authUrl
          value: 'http://keycloak.default.svc.cluster.local:8080'
```

