import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Animals from './pages/Animals';
import Register from './pages/Register';
import { AuthProvider } from './hooks/use-auth';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/animals" element={<Animals />} />
            </Routes>
          </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
