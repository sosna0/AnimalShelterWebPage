import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    }

    return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Sign In</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Enter Your Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Your Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>

            <div className="mt-3">
                <div>Don't have an account?</div>
                <div>
                    Click <Link to="/register">here</Link> to register
                </div>
            </div>
        </div>
    </div>
);

      

};

export default Login;