import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './hooks/use-auth';
import Animals from './pages/Animals';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/animals" element={<Animals />} />
            </Routes>
          <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
