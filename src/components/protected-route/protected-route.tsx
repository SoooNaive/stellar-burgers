import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../types/types';

function ProtectedRoute({
  onlyUnAuth = false,
  component,
}: {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}) {
  const userName = useTypedSelector((state) => state.userState.userData.name);

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
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
