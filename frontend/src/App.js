import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './hooks/use-auth';
import Animals from './pages/Animals';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/animals" element={<Animals />} />
            </Routes>
          </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
