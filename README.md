# Weather Service
A Java Spring Boot microservice for providing weather forecasts.

## Running the Application

### Running in Docker

To run the application in [Docker](https://www.docker.com/):

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

To run the application in a local Kubernetes cluster using [Kind](https://kind.sigs.k8s.io/):

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

## API Endpoints

### Weather Forecast Endpoint

- **Method:** GET
- **Endpoint:** `/weather`
- **Query Parameters:**
   - `city`: The name of the city for which the weather forecast is requested.
- **Example Request:**
  ```
  GET http://localhost:8080/weather?city=Dublin
  ```
- **Expected Response:**
   - **Content-Type:** `application/json`
   - **Body:**
  ```json
  {
    "coord": {"lon": -6.4389, "lat": 53.3592},
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
    "base": "stations",
    "main": {"temp": 7.11, "feels_like": 4.67, "temp_min": 5.29, "temp_max": 9.35, "pressure": 993, "humidity": 81},
    "visibility": 10000,
    "wind": {"speed": 3.6, "deg": 230},
    "clouds": {"all": 40},
    "dt": 1708775479,
    "sys": {"type": 2, "id": 2036125, "country": "IE", "sunrise": 1708759583, "sunset": 1708797126},
    "timezone": 0,
    "id": 2962785,
    "name": "Lucan",
    "cod": 200
  }
  ```

### Spring Boot Actuator Health Endpoint

- **Method:** GET
- **Endpoint:** `/actuator/health`
- **Example Request:**
  ```
  GET http://localhost:8080/actuator/health
  ```
- **Expected Response:**
   - **Content-Type:** `application/json`
   - **Body:**
  ```json
  {
    "status": "UP",
    "groups": [
        "liveness",
        "readiness"
    ]
  }
  ```

## Versions

### Application and Build

- Java: `17`
- Spring Boot: `3.1.5`
- Spring Dependency Management: `1.1.3`
- Jib: `3.4.0`
- Axios: `1.6.7`
- React: `18.2.0`
- Gradle: `8.4`

### Tools

- Docker: `25.0.3`
- Kind: `0.21.0`
- kubectl (Client Version): `1.28.4`
- kubectl (Kustomize Version): `5.0.4`
- IntelliJ IDEA: `2023.2.2 (Community Edition)`

## Troubleshooting
**Q:** What should I do if changes made to the frontend do not reflect after rebuilding and redeploying the application?

**A:** Force reload the page and reset the browser cache.

## Coding Related Topics

### Committing Changes to Frontend

To commit changes made to the frontend, please follow these commands:

1. Change directory (cd) to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies/packages:
   ```bash
   npm install
   ```

3. Build React using npm:
   ```bash
   npm run build
   ```

4. Run the "copyReactBuild" Gradle task:
   ```bash
   ./gradlew copyReactBuild
   ```
   