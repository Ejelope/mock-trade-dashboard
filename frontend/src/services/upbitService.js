import axios from "axios";

export const getTicker = async (symbol) => {
  const res = await axios.get(`http://localhost:8080/api/upbit/ticker/${symbol}`);
  return res.data[0]; // 업비트 API가 배열로 반환함
};
