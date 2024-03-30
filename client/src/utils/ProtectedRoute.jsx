import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
  const token = useSelector(state => state.user.token); 
  if (!token) {
    return <Navigate to="/login" replace />; 
  }
  return element; 
};
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
