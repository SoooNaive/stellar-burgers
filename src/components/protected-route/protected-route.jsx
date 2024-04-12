import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ onlyUnAuth = false, component }) {
  const userName = useSelector((state) => state.userState.userData.name);

  const location = useLocation();

  if (onlyUnAuth && userName) {
    const { from } = location.state || { from: { pathname: '/' } };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userName) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
