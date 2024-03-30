import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, setSuccess } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import './signup.css';
import signupIllustration from '../../assets/signup.svg';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
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
    dispatch(signupUser(formData, navigate));
  };

  return (
    <div>
      <Header />
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-image">
            <img src={signupIllustration} alt="Signup Illustration" />
            <p>Sign Up for TaskNest - Where Tasks Are Safely Nested</p>
          </div>
          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <h2>Create your account</h2>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
              />
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
              <button type="submit">Sign up</button>
              <p className="login-link">
                Already Part of the Nest? Log in to TaskNest here.
              </p>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
