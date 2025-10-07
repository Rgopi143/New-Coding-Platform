import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Events from './pages/Events';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import OAuthCallback from './pages/OAuthCallback';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />

            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
