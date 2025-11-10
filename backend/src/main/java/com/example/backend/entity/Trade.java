package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;
    private String side;
    private double price;
    private double quantity;
}
