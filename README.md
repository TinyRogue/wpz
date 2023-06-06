## Entering the VM step by step
http://149.156.43.57/warsztaty/?slajd=11/

## Technologies
Backend:
Java 17
SpringBoot 3.1.0

## Environment setup
Data storage (we will use it to store PDF files):
docker run --name minio -p 9000:9000 -p 9001:9001 --env MINIO_ROOT_USER="minio" --env MINIO_ROOT_PASSWORD="minio123" bitnami/minio:latest

Open localhost:9001, you should be able to log in using credentials from the command. Bucket called "storage" will be created when you launch backend for 1st time.
