import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { getUserByUsername, getUserByEmail } from "../api/services/userService";


const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkUsername = async () => {
        if (!username) {
            setUsernameTaken(false);
            return;
        }
        try {
            await getUserByUsername(username);
            setUsernameTaken(true); // user istnieje
        } catch (err) {
            setUsernameTaken(false); // user nie istnieje (404)
        }
    };
    
    const checkEmail = async () => {
        if (!email) {
            setEmailTaken(false);
            return;
        }
        try {
            await getUserByEmail(email);
            setEmailTaken(true); // email zajęty
        } catch (err) {
            setEmailTaken(false); // email wolny
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameTaken || emailTaken) return;

        setIsSubmitting(true);
        try {
            await register({ name, surname, username, email, password });
        navigate('/');
    } catch (error) {
            alert('Cannot create account. Please check your data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // debounce-like behavior
    useEffect(() => {
        const timer = setTimeout(() => checkUsername(), 500);
        return () => clearTimeout(timer);
    }, [username]);

    useEffect(() => {
        const timer = setTimeout(() => checkEmail(), 500);
        return () => clearTimeout(timer);
    }, [email]);

    const isFormInvalid =
        !name || !surname || !username || !email || !password || usernameTaken || emailTaken;

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="position-relative text-center mb-4">
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="btn btn-link position-absolute start-0 top-0 mt-1 ms-1"
                        style={{ textDecoration: 'none' }}
                        aria-label="Back to login"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <h2 className="m-0">Register</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="John"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="surname"
                            className="form-control"
                            placeholder="Doe"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className={`form-control ${usernameTaken ? 'is-invalid' : ''}`}
                            placeholder="johndoe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {usernameTaken && (
                            <div className="invalid-feedback">This username is already taken.</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={`form-control ${emailTaken ? 'is-invalid' : ''}`}
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailTaken && (
                            <div className="invalid-feedback">This email is already registered.</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isFormInvalid || isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
