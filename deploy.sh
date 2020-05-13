cat | kubectl apply -f - <<EOD
apiVersion: v1
kind: Namespace
metadata:
  name: $CI_PROJECT_NAME

---

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: $CI_COMMIT_REF_SLUG
  name: $CI_COMMIT_REF_SLUG
  namespace: $CI_PROJECT_NAME
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: $CI_COMMIT_REF_SLUG
        redeploy: "$(date +%s)"
    spec:
      containers:
      - image: cevttest.azurecr.io/$CI_PROJECT_NAME:$CI_COMMIT_REF_SLUG
        imagePullPolicy: Always
        name: $CI_PROJECT_NAME
  selector:
    matchLabels:
      app: $CI_COMMIT_REF_SLUG

---

apiVersion: v1
kind: Service
metadata:
  labels:
    app: $CI_COMMIT_REF_SLUG
  name: $CI_COMMIT_REF_SLUG
  namespace: $CI_PROJECT_NAME
spec:
  ports:
  - port: $1
    protocol: TCP
    targetPort: $1
  selector:
    app: $CI_COMMIT_REF_SLUG
  type: ClusterIP

---

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: traefik
  name: $CI_COMMIT_REF_SLUG
  namespace: $CI_PROJECT_NAME
spec:
  rules:
  - host: $CI_PROJECT_NAME-$CI_COMMIT_REF_SLUG.digitalgarage.cevt.se
    http:
      paths:
      - backend:
          serviceName: $CI_COMMIT_REF_SLUG
          servicePort: $1
        path: /

EOD
