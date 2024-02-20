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

3. Access the application at: [http://localhost:8080/](http://localhost:8080/)

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

5. Access the application at: [http://172.18.0.2:31000/](http://172.18.0.2:31000/)

### Committing Changes to Frontend

To commit changes made to the frontend, please follow these commands:

1. Change directory (cd) to the frontend folder:
   ```bash
   cd frontend
   ```

2. Build React using npm:
   ```bash
   npm run build
   ```
   
3. Run the "copyReactBuild" Gradle task:
   ```bash
   ./gradlew copyReactBuild
   ```

### Troubleshooting
**Q:** What should I do if changes made to the frontend do not reflect after rebuilding and redeploying the application?

**A:** Force reload the page and reset the browser cache.
