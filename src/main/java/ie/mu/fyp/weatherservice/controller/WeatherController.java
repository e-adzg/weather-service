package ie.mu.fyp.weatherservice.controller;

import ie.mu.fyp.weatherservice.service.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class WeatherController {

    private static final Logger logger = LoggerFactory.getLogger(WeatherController.class);
    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/weather")
    public Mono<String> getWeather(@RequestParam String city) {
        logger.info("Handling request in pod: {}", System.getenv("POD_NAME"));
        return weatherService.getWeatherForCity(city);
    }
}