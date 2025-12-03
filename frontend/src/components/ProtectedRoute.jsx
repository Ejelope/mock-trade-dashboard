import { Navigate } from "react-router-dom";

/**
 * 로그인된 사용자만 접근 가능한 라우트 보호용 컴포넌트
 * user가 없으면 /login으로 리다이렉트
 */
export default function ProtectedRoute({ user, children }) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
