import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ element }) => {
  const isAuth = useSelector((state) => state.userState.user.userRequest);
  const userName = useSelector((state) => state.userState.userData.name);

  if (!isAuth && userName) {
    return null;
  }

  return userName ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.object,
};
