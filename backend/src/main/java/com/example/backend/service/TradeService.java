package com.example.backend.service;
import com.example.backend.entity.Trade;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.exception.InsufficientBalanceException;
import com.example.backend.repository.TradeRepository;
import org.json.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;

    public TradeService(TradeRepository tradeRepository, UserRepository userRepository) {
        this.tradeRepository = tradeRepository;
        this.userRepository = userRepository;
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

    public Trade saveTrade(Trade trade) {
        // 사용자 정보 조회
        User user = userRepository.findById(trade.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        // 매수/매도 처리 로직
        if (trade.getSide().equals("BUY")) {
            double totalPrice = trade.getPrice() * trade.getQuantity();
            if (user.getBalance() < totalPrice) {
                throw new InsufficientBalanceException("잔액이 부족합니다.");
            }
            user.setBalance(user.getBalance() - totalPrice);
        } else if (trade.getSide().equals("SELL")) {
            user.setBalance(user.getBalance() + (trade.getPrice() * trade.getQuantity()));
        }

        // 거래 저장
        Trade savedTrade = tradeRepository.save(trade);

        // 사용자 잔액 업데이트
        userRepository.save(user);

        return savedTrade;
    }
}
