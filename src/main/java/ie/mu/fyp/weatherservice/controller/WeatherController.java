package ie.mu.fyp.weatherservice.controller;

import ie.mu.fyp.weatherservice.service.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/weather")
    public Mono<String> getWeather(@RequestParam String city) {
        return weatherService.getWeatherForCity(city);
    }
}