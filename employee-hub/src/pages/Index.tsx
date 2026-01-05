import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../src/hooks/useAppDispatch';

const Index = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // Redirect to dashboard if authenticated, otherwise to login
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
};

export default Index;
