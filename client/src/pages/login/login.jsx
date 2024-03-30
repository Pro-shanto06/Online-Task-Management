import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setSuccess } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import loginIllustration from '../../assets/signup.svg';
import './login.css';
import Header from '../../components/header/header';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(state => state.user.error);
  const successMessage = useSelector(state => state.user.success);

  useEffect(() => {
    // Reset success message when component unmounts
    return () => {
      dispatch(setSuccess(null));
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData, navigate));
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <div className="login-image">
            <img src={loginIllustration} alt="Login Illustration" />
            <p>Login to TaskNest - Where Tasks Are Safely Nested</p>
          </div>
          <div className="login-form">
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit">Login</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
