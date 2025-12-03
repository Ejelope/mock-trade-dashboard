import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      setMessage("회원가입이 완료되었습니다.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMessage("이미 존재하는 이메일입니다.");
    }
  };


  return (
    <div style={{ padding: 40 }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="이름" onChange={handleChange} required />
        <input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} required />
        <button type="submit">가입</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
}
