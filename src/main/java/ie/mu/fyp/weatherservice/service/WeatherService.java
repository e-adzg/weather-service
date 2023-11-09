package ie.mu.fyp.weatherservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Service
public class WeatherService {

    private final WebClient webClient;

    public WeatherService(WebClient.Builder webClientBuilder,
                          @Value("${OPENWEATHER.API.URL}") String weatherApiUrl,
                          @Value("${OPENWEATHER.API.KEY}") String apiKey) {
        this.webClient = webClientBuilder.baseUrl(weatherApiUrl)
                .defaultHeader("Accept", "application/json")
                .defaultUriVariables(Collections.singletonMap("apiKey", apiKey))
                .build();
    }

    public Mono<String> getWeatherForCity(String city) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", city)
                        .queryParam("appid", "{apiKey}")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}