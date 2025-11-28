import { useEffect, useState } from "react";
import { getTicker } from "../services/upbitService";
import { getTrades, createTrade } from "../services/tradeService";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("KRW-BTC");
  const [ticker, setTicker] = useState(null);
  const [trades, setTrades] = useState([]);

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

  // 매수/매도 처리
  const handleTrade = async (side) => {
    await createTrade({
      symbol,
      side,
      price: ticker.trade_price,
      quantity: 0.01,
    });
    await loadTrades(); // 거래 후 내역 갱신
  };

  // 첫 렌더링 시 자동 실행
  useEffect(() => {
    loadTicker();
    loadTrades();
  }, []);

  return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
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
