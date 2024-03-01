package ie.mu.fyp.weatherservice.dto;

import java.util.Map;

public class PodMetricsDto {
    private String podName;
    private String namespace;
    private Map<String, String> labels;
    private String status;
    private String creationTimestamp;

    public PodMetricsDto(String podName, String namespace, Map<String, String> labels, String status, String creationTimestamp) {
        this.podName = podName;
        this.namespace = namespace;
        this.labels = labels;
        this.status = status;
        this.creationTimestamp = creationTimestamp;
    }

    // Getters and setters
    public String getPodName() {
        return podName;
    }

    public void setPodName(String podName) {
        this.podName = podName;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(Map<String, String> labels) {
        this.labels = labels;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(String creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }
}