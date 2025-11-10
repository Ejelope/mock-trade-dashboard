import axios from "axios";

const API_BASE = "http://localhost:8080/api/trade";

// 거래 내역 조회
export async function getTrades() {
  const res = await axios.get(`${API_BASE}/history`);
  return res.data;
}

// 매수/매도 생성
export async function createTrade(trade) {
  const res = await axios.post(`${API_BASE}/create`, trade);
  return res.data;
}
