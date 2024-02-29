package ie.mu.fyp.weatherservice.dto;

public class NodeMetricsDto {
    private String nodeName;
    private double cpuUsage;
    private double memoryUsage;

    public NodeMetricsDto(String nodeName, double cpuUsage, double memoryUsage) {
        this.nodeName = nodeName;
        this.cpuUsage = cpuUsage;
        this.memoryUsage = memoryUsage;
    }

    // Getters and setters
    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public double getCpuUsage() {
        return cpuUsage;
    }

    public void setCpuUsage(double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }

    public double getMemoryUsage() {
        return memoryUsage;
    }

    public void setMemoryUsage(double memoryUsage) {
        this.memoryUsage = memoryUsage;
    }
}