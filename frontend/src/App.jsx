import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved && saved !== "undefined" ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <Routes>
            {/* 로그인 */}
            <Route path="/login" element={<Login onLogin={setUser} />} />

            {/* 회원가입 */}
            <Route path="/signup" element={<Signup />} />

            {/* 보호된 대시보드 */}
            <Route
                path="/"
                element={
                    <ProtectedRoute user={user}>
                        <div style={{ padding: 20 }}>
                            <h2>안녕하세요, {user?.name}님 👋</h2>
                            <button onClick={handleLogout}>로그아웃</button>
                            <Dashboard />
                        </div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
