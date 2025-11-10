package com.example.backend.service;
import com.example.backend.entity.Trade;
import com.example.backend.repository.TradeRepository;
import org.json.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    // 시세 조회
    public double getPrice(String market) {
        try {
            String url = "https://api.upbit.com/v1/ticker?markets=" + market;
            RestTemplate restTemplate = new RestTemplate();
            String res = restTemplate.getForObject(url, String.class);
            JSONArray arr = new JSONArray(res);
            return arr.getJSONObject(0).getDouble("trade_price");
        } catch (Exception e) {
            throw new RuntimeException("시세 조회 실패", e);
        }
    }

    // 거래 내역 전체 조회
    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    // 거래 저장
    public Trade saveTrade(Trade trade) {
        return tradeRepository.save(trade);
    }
}
