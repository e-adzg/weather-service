package ie.mu.fyp.weatherservice.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Service
public class WeatherService {

    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);
    private final WebClient webClient;
    private final String apiKey;

    public WeatherService(WebClient.Builder webClientBuilder,
                          @Value("${OPENWEATHER.API.URL}") String weatherApiUrl,
                          @Value("${OPENWEATHER.API.KEY}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = webClientBuilder.baseUrl(weatherApiUrl)
                .defaultHeader("Accept", "application/json")
                .defaultUriVariables(Collections.singletonMap("apiKey", apiKey))
                .build();
    }

    public Mono<String> getWeatherForCity(String city) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", city)
                        .queryParam("appid", apiKey)
                        .queryParam("units", "metric")
                        .build())
                .exchangeToMono(response -> {
                    if (response.statusCode().equals(HttpStatus.OK)) {
                        logger.info("Successfully retrieved weather data for city: {}", city);
                        return response.bodyToMono(String.class);
                    } else {
                        logger.error("Failed to retrieve weather data for city: {}, Status code: {}", city, response.statusCode());
                        return response.createException().flatMap(Mono::error);
                    }
                });
    }
}