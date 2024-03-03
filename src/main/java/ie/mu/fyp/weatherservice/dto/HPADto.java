package ie.mu.fyp.weatherservice.dto;

public class HPADto {
    private String name;
    private Integer currentReplicas;
    private Integer desiredReplicas;

    public HPADto(String name, Integer currentReplicas, Integer desiredReplicas) {
        this.name = name;
        this.currentReplicas = currentReplicas;
        this.desiredReplicas = desiredReplicas;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCurrentReplicas() {
        return currentReplicas;
    }

    public void setCurrentReplicas(Integer currentReplicas) {
        this.currentReplicas = currentReplicas;
    }

    public Integer getDesiredReplicas() {
        return desiredReplicas;
    }

    public void setDesiredReplicas(Integer desiredReplicas) {
        this.desiredReplicas = desiredReplicas;
    }
}