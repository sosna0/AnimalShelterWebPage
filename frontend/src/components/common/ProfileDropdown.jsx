import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../hooks/use-auth';

const ProfileDropdown = ({dropdownPaths, dropdownDescr}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    // is actual path in dropdown paths
    const isActive = dropdownPaths.some(path => location.pathname.startsWith(path));
    
    const handleLogout = () => {
        logout();
        navigate('/');
        // Lazy solution to show alert after logout
        setTimeout(() => {
            alert('You have been logged out successfully.');
        }, 100);
    };
    
    return (
        <NavDropdown
            title="Your Profile"
            id="navbarDropdown"
            className={isActive ? 'active' : ''}
        >
            {dropdownPaths.map((link, index) => (
                <NavDropdown.Item key={index} as={NavLink} to={link}>
                    {dropdownDescr[index]}
                </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
    );
};

export default ProfileDropdown;