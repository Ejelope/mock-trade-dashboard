import { useEffect, useState } from "react";
import axios from "axios";
import { getTicker } from "../services/upbitService";
import { getTrades, createTrade } from "../services/tradeService";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("KRW-BTC");
  const [ticker, setTicker] = useState(null);
  const [trades, setTrades] = useState([]);
  const [balance, setBalance] = useState(0); //  잔액 상태 추가

  // 시세 로드
  const loadTicker = async () => {
    const data = await getTicker(symbol);
    setTicker(data);
  };

  // 거래내역 로드
  const loadTrades = async () => {
    const data = await getTrades();
    setTrades(data);
  };

  //  사용자 잔액 로드
  const loadBalance = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/1");
      setBalance(res.data.balance);
    } catch (err) {
      console.error("잔액 조회 실패:", err);
    }
  };

  // 매수/매도 처리
  const handleTrade = async (side) => {
    try {
    await createTrade({
        userId: 1, // 임시 사용자
      symbol,
      side,
      price: ticker.trade_price,
      quantity: 0.01,
    });
    await loadTrades(); // 거래 후 내역 갱신
      await loadBalance();  //  거래 후 잔액 갱신
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "거래 실패");
    }
  };

  // 첫 렌더링 시 자동 실행
  useEffect(() => {
    loadTicker();
    loadTrades();
    loadBalance(); //  잔액도 함께 로드
  }, []);

  return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {/*  현재 잔액 표시 */}
      <div style={{ marginBottom: "16px", fontWeight: "bold", fontSize: "18px" }}>
        💰 현재 잔액: {balance.toLocaleString()} 원
      </div>

        {/* 시세 영역 */}
        <section style={{ borderBottom: "1px solid #ddd", paddingBottom: "16px", marginBottom: "20px" }}>
          <h2 style={{ fontWeight: "bold" }}>📈 현재 시세</h2>
          <p style={{ color: "#555" }}>종목: {symbol}</p>
          {ticker ? (
              <div>
                <div style={{ fontSize: "20px", marginBottom: "12px" }}>
                  {ticker.trade_price.toLocaleString()} 원
                </div>
                <div>
                  <button
                      onClick={() => handleTrade("BUY")}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#3B82F6",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                  >
                    매수
                  </button>
                  <button
                      onClick={() => handleTrade("SELL")}
                      style={{
                        padding: "8px 12px",
                        marginLeft: "10px",
                        backgroundColor: "#EF4444",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                  >
                    매도
                  </button>
                </div>
              </div>
          ) : (
              <p>시세 정보를 불러오는 중...</p>
          )}
        </section>

        {/* 거래 내역 영역 */}
        <section>
          <h3 style={{ fontWeight: "bold" }}>💰 거래 내역</h3>
          {trades.length === 0 ? (
              <p style={{ color: "#999" }}>아직 거래 내역이 없습니다.</p>
          ) : (
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {trades.map((t) => (
                    <li
                        key={t.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          borderBottom: "1px solid #eee",
                        }}
                    >
                      <span>{t.symbol}</span>
                      <span style={{ color: t.side === "BUY" ? "#3B82F6" : "#EF4444" }}>
                  {t.side}
                </span>
                      <span>{t.price.toLocaleString()}원</span>
                      <span>{t.quantity}</span>
                    </li>
                ))}
              </ul>
          )}
        </section>
      </div>
  );
}
