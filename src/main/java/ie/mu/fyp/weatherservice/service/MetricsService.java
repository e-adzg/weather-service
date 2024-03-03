package ie.mu.fyp.weatherservice.service;

import ie.mu.fyp.weatherservice.dto.HPADto;
import ie.mu.fyp.weatherservice.dto.NodeMetricsDto;
import ie.mu.fyp.weatherservice.dto.PodMetricsDto;

import io.kubernetes.client.extended.kubectl.Kubectl;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Node;
import io.kubernetes.client.custom.NodeMetrics;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1PodList;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.AutoscalingV1Api;
import io.kubernetes.client.openapi.models.V1HorizontalPodAutoscaler;
import io.kubernetes.client.openapi.models.V1HorizontalPodAutoscalerList;
import io.kubernetes.client.util.Config;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MetricsService {

    private static final Logger logger = LoggerFactory.getLogger(MetricsService.class);
    private final ApiClient client;
    private final CoreV1Api coreV1Api;
    private final StringRedisTemplate redisTemplate;

    @Autowired
    public MetricsService(CoreV1Api coreV1Api, StringRedisTemplate redisTemplate) throws IOException {
        this.coreV1Api = coreV1Api;
        this.redisTemplate = redisTemplate;
        this.client = Config.defaultClient();
    }

    public List<NodeMetricsDto> getNodeMetrics() {
        try {
            // Fetch node metrics using Kubernetes Java client.
            List<Pair<V1Node, NodeMetrics>> nodesMetricsPairs = Kubectl.top(V1Node.class, NodeMetrics.class)
                    .apiClient(client)
                    .execute();

            logger.info("Fetched metrics for {} nodes", nodesMetricsPairs.size());

            // Convert fetched metrics into list of NodeMetricsInfo objects.
            return nodesMetricsPairs.stream().map(pair -> {
                V1Node node = pair.getLeft();
                NodeMetrics metrics = pair.getRight();
                String nodeName = node.getMetadata().getName();

                // Extract CPU and memory usage, defaulting to 0.0 if not available.
                double cpuUsage = metrics.getUsage().containsKey("cpu") ? metrics.getUsage().get("cpu").getNumber().doubleValue() : 0.0;
                double memoryUsage = metrics.getUsage().containsKey("memory") ? metrics.getUsage().get("memory").getNumber().doubleValue() : 0.0;

                logger.info("Node: {}, CPU Usage: {}, Memory Usage: {}", nodeName, cpuUsage, memoryUsage);

                return new NodeMetricsDto(nodeName, cpuUsage, memoryUsage);
            }).collect(Collectors.toList());
        } catch (Exception e) {
            NodeMetricsDto errorInfo = new NodeMetricsDto("Metrics Server is starting...", 0.0, 0.0);
            return Collections.singletonList(errorInfo);
        }
    }

    public List<PodMetricsDto> getPodMetrics() {
        List<PodMetricsDto> podMetricsInfos = new ArrayList<>();
        try {
            logger.info("Attempting to fetch pod metrics from the 'default' namespace");

            // Fetch the list of pods in the 'default' namespace.
            V1PodList podList = coreV1Api.listNamespacedPod("default").execute();

            logger.info("Successfully fetched metrics for {} pods", podList.getItems().size());

            // Iterate through each pod in the list.
            for (V1Pod pod : podList.getItems()) {
                String namespace = pod.getMetadata().getNamespace();
                Map<String, String> labels = pod.getMetadata().getLabels();
                String status = pod.getStatus().getPhase();
                String creationTimestamp = pod.getMetadata().getCreationTimestamp().toString();

                podMetricsInfos.add(new PodMetricsDto(pod.getMetadata().getName(), namespace, labels, status, creationTimestamp));
            }
        } catch (Exception e) {
            logger.error("Failed to list pods in the default namespace", e);
            PodMetricsDto errorInfo = new PodMetricsDto("Metrics Server is starting soon or an error has occurred", "default", Collections.emptyMap(), "Error", "");
            return Collections.singletonList(errorInfo);
        }
        return podMetricsInfos;
    }

    public void incrementRequestCount(String podName) {
        // Create Redis key using pod name
        String key = "pod:" + podName;
        try {
            // Obtain ValueOperations object from redisTemplate to perform operations on string values
            ValueOperations<String, String> ops = this.redisTemplate.opsForValue();

            // Increment value associated with key in Redis. If key doesn't exist, it's created and set to 1
            ops.increment(key);

            logger.info("Incremented request count for pod: {}", podName);
        } catch (Exception e) {
            logger.error("Failed to increment request count for pod: {}", podName, e);
        }
    }

    public Map<String, Integer> getAllPodRequestCounts() {
        Map<String, Integer> counts = new HashMap<>();

        // Obtain connection to Redis
        try (RedisConnection redisConnection = redisTemplate.getConnectionFactory().getConnection()) {

            // Use scan command to find all keys starting with "pod:"
            Cursor<byte[]> cursor = redisConnection.keyCommands().scan(ScanOptions.scanOptions().match("pod:*").build());

            // Iterate over the keys found by the scan command
            while (cursor.hasNext()) {
                // Convert key from bytes to String
                String key = new String(cursor.next());

                // Retrieve count associated with key from Redis
                String count = redisTemplate.opsForValue().get(key);

                // If count exists, add it to the map
                if (count != null) {
                    counts.put(key, Integer.parseInt(count));
                }
            }
        } catch (Exception e) {
            logger.error("Failed to retrieve request counts", e);
        }
        return counts;
    }

    public List<HPADto> getHPADetails() {
        List<HPADto> hpaDetails = new ArrayList<>();
        AutoscalingV1Api autoscalingV1Api = new AutoscalingV1Api(client);
        try {
            // Fetch list of all HPAs in all namespaces
            V1HorizontalPodAutoscalerList hpaList = autoscalingV1Api.listHorizontalPodAutoscalerForAllNamespaces().execute();

            for (V1HorizontalPodAutoscaler hpa : hpaList.getItems()) {
                String name = hpa.getMetadata().getName();
                Integer currentReplicas = hpa.getStatus().getCurrentReplicas();
                Integer desiredReplicas = hpa.getStatus().getDesiredReplicas();

                hpaDetails.add(new HPADto(name, currentReplicas, desiredReplicas));
            }
        } catch (ApiException e) {
            logger.error("Failed to fetch HPA details", e);
        }
        return hpaDetails;
    }
}