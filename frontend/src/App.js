import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Animals from './pages/Animals';
import AnimalDetails from './pages/AnimalDetails';
import AnimalNew from './pages/AnimalNew';
import AnimalEdit from './pages/AnimalEdit';
import Register from './pages/Register';
import { ProtectedRoute } from './components/access/ProtectedRoute';
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
              <Route path="/animals/:id" element={<AnimalDetails />} />
              <Route 
                path="/animals/new" 
                element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <AnimalNew />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/animals/edit/:id" 
                element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <AnimalEdit />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
