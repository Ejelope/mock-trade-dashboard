import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      navigate("/"); // 로그인 성공 시 대시보드로 이동
    } catch (err) {
      setError("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
}
