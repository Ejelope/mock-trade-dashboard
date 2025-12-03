package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private double balance = 1_000_000.0; // 기본 잔액 (예: 100만원)

    // --- 잔액 관련 메서드 추가 ---

    public void decreaseBalance(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("감소 금액이 올바르지 않습니다.");
        }
        if (this.balance < amount) {
            throw new IllegalArgumentException("잔액이 부족합니다.");
        }
        this.balance -= amount;
    }

    public void increaseBalance(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("증가 금액이 올바르지 않습니다.");
        }
        this.balance += amount;
    }
}
