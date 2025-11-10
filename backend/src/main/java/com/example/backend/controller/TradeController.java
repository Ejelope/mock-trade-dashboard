package com.example.backend.controller;

import com.example.backend.entity.Trade;
import com.example.backend.service.TradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/trade")
@CrossOrigin(origins = "http://localhost:5173")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    // 거래 전체 조회
    @GetMapping("/history")
    public List<Trade> getAllTrades() {
        return tradeService.getAllTrades();
    }

    // 업비트 시세 조회
    @GetMapping("/price")
    public Object getPrice(@RequestParam String market) {
        return tradeService.getPrice(market);
    }

    // 거래 생성 (매수/매도)
    @PostMapping("/create")
    public Trade createTrade(@RequestBody Trade trade) {
        return tradeService.saveTrade(trade);
    }
}
