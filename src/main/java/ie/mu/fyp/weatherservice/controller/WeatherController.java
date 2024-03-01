package ie.mu.fyp.weatherservice.controller;

import ie.mu.fyp.weatherservice.service.MetricsService;
import ie.mu.fyp.weatherservice.service.WeatherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class WeatherController {

    private static final Logger logger = LoggerFactory.getLogger(WeatherController.class);
    private final MetricsService metricsService;
    private final WeatherService weatherService;

    @Autowired
    public WeatherController(MetricsService metricsService, WeatherService weatherService) {
        this.metricsService = metricsService;
        this.weatherService = weatherService;
    }

    // Endpoint to get weather
    @GetMapping("/weather")
    public Mono<String> getWeather(@RequestParam String city) {
        // Check pod name that is currently handling this request.
        String podName = System.getenv("POD_NAME");

        // Calls service to increment request count for this pod.
        metricsService.incrementRequestCount(podName);
        logger.info("Handling request for city: {} in pod: {}", city, podName);
        return weatherService.getWeatherForCity(city);
    }
}