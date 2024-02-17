# Weather Service
A Java Spring Boot microservice for providing weather forecasts.

## Running the Application

### Running in Docker

To run the application in Docker:

1. Pull the Docker image:
   ```bash
   docker pull erikasmu/weather-service:latest
   ```

2. Run the Docker container:
   ```bash
   docker run -p 8080:8080 erikasmu/weather-service:latest
   ```

3. Access the application at: [http://localhost:8080/weather?city=Dublin](http://localhost:8080/weather?city=Dublin)

### Running the Image with Kind

To run the application in a local Kubernetes cluster using Kind:

1. Pull the Docker image:
   ```bash
   docker pull erikasmu/weather-service:latest
   ```

2. Create a Kind cluster:
   ```bash
   kind create cluster
   ```

3. Load the Docker image into Kind:
   ```bash
   kind load docker-image erikasmu/weather-service:latest
   ```

4. Apply the Kubernetes deployment:
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/e-adzg/weather-service/main/k8s/deployment.yaml
   ```

5. Access the application at: [http://172.18.0.2:31000/weather?city=Dublin](http://172.18.0.2:31000/weather?city=Dublin)