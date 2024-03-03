package ie.mu.fyp.weatherservice.controller;

import ie.mu.fyp.weatherservice.service.MetricsService;
import ie.mu.fyp.weatherservice.dto.NodeMetricsDto;
import ie.mu.fyp.weatherservice.dto.HPADto;
import ie.mu.fyp.weatherservice.dto.PodMetricsDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/metrics")
public class MetricsController {

    private static final Logger logger = LoggerFactory.getLogger(MetricsService.class);
    private final MetricsService metricsService;

    @Autowired
    public MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }

    // Endpoint to get node metrics.
    @GetMapping("/nodes")
    public ResponseEntity<List<NodeMetricsDto>> getNodeMetrics() {
        try {
            // Calls service to get node metrics.
            List<NodeMetricsDto> metrics = metricsService.getNodeMetrics();
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            logger.error("Error fetching node metrics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint to get pod metrics.
    @GetMapping("/pods")
    public ResponseEntity<List<PodMetricsDto>> getPodMetrics() {
        try {
            // Calls service to get pod metrics.
            List<PodMetricsDto> metrics = metricsService.getPodMetrics();
            if (metrics.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            logger.error("Error fetching pod metrics", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint to get request count per pod.
    @GetMapping("/request-count")
    public ResponseEntity<?> getRequestCount() {
        // Calls service to get pod requests.
        Map<String, Integer> counts = metricsService.getAllPodRequestCounts();
        return ResponseEntity.ok(counts);
    }

    // Endpoint to get hpa metrics.
    @GetMapping("/hpa")
    public ResponseEntity<List<HPADto>> getHPADetails() {
        try {
            // Calls service to get hpa metrics.
            List<HPADto> hpaDetails = metricsService.getHPADetails();
            return ResponseEntity.ok(hpaDetails);
        } catch (Exception e) {
            logger.error("Error fetching HPA metrics", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}