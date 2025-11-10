package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/upbit")
@CrossOrigin(origins = "http://localhost:5173")
public class UpbitController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/ticker/{symbol}")
    public ResponseEntity<String> getTicker(@PathVariable String symbol) {
        String url = "https://api.upbit.com/v1/ticker?markets=" + symbol;
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }
}
