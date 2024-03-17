package ie.mu.fyp.weatherservice.config;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.util.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Marks class as configuration to set up Kubernetes client beans.
@Configuration
public class KubernetesClientConfig {

    // Creates a Kubernetes API client.
    @Bean
    public ApiClient apiClient() {
        try {
            return Config.defaultClient();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to initialize Kubernetes API client", e);
        }
    }

    // Creates CoreV1Api bean to interact with Kubernetes core API.
    @Bean
    public CoreV1Api coreV1Api(ApiClient apiClient) {
        return new CoreV1Api(apiClient);
    }
}