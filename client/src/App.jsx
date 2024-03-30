import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/home/home';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Board from './pages/board/board';
import BoardDetailsPage from './components/board/BoardDetails/boardDetail'; // Import the BoardDetailsPage component
import ProtectedRoute from './utils/ProtectedRoute'; 

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<ProtectedRoute element={<Board />} />} />
          <Route path="/board/:id" element={<ProtectedRoute element={<BoardDetailsPage />} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
