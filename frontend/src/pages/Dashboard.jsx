import { useEffect, useState } from "react";
import { getTicker } from "../services/upbitService";
import { getTrades, createTrade } from "../services/tradeService";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("KRW-BTC");
  const [ticker, setTicker] = useState(null);
  const [trades, setTrades] = useState([]);

  const loadTicker = async () => {
    const data = await getTicker(symbol);
    setTicker(data);
  };

  const loadTrades = async () => {
    setTrades(await getTrades());
  };

  const handleTrade = async (side) => {
    await createTrade({
      symbol,
      side,
      price: ticker.trade_price,
      quantity: 0.01
    });
    await loadTrades();
  };

  useEffect(() => {
    loadTicker();
    loadTrades();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>📈 모의투자 대시보드</h2>
      <p>현재 종목: {symbol}</p>
      {ticker && (
        <div>
          <h3>현재가: {ticker.trade_price.toLocaleString()}원</h3>
          <button onClick={() => handleTrade("BUY")}>매수</button>
          <button onClick={() => handleTrade("SELL")} style={{ marginLeft: 8 }}>매도</button>
        </div>
      )}
      <h3 style={{ marginTop: 20 }}>거래 내역</h3>
      <ul>
        {trades.map(t => (
          <li key={t.id}>
            {t.symbol} | {t.side} | {t.price.toLocaleString()}원 | {t.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

