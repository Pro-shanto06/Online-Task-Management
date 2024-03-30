// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
  const token = useSelector(state => state.user.token); // Access token from Redux state

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if token is not present
  }

  return element; // Render the passed component if token is present (user is authenticated)
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
