import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
