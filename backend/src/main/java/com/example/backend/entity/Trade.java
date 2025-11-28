package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;          // 거래 자체의 고유 ID

    private Long userId;      // 거래한 사용자 ID
    private String symbol;
    private String side;
    private double price;
    private double quantity;
}
