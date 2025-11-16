import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route
        path="/login"
        element={<Login onLogin={setUser} />}
      />

      {/* 회원가입 페이지 */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* 대시보드 (로그인 필수) */}
      <Route
        path="/"
        element={
          user ? (
            <div style={{ padding: 20 }}>
              <h2>안녕하세요, {user.name}님 👋</h2>
              <button onClick={handleLogout}>로그아웃</button>
              <Dashboard />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
