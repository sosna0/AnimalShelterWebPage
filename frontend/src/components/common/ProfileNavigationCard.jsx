import { Card, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { RoleOnly } from "../access/RoleOnly";


function ProfileNavigationCard() {
    return (
        <Card className="text-center">
            <Card.Header>
                <Nav variant="tabs" className="card-header-tabs">
                    
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/user-profile">Your Profile</Nav.Link>
                    </Nav.Item>

                    <RoleOnly allowedRoles={['public']}>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/user-adoptions">Manage your adoptions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/user-donations">Show your donations</Nav.Link>
                        </Nav.Item>
                    </RoleOnly>

                    <RoleOnly allowedRoles={['staff']}>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/manage-adoptions">Manage adoptions</Nav.Link>
                        </Nav.Item>
                    </RoleOnly>
                
                </Nav>
            </Card.Header>
            
            <Card.Body>
                <Outlet />
            </Card.Body>
        </Card>
    );
}

export default ProfileNavigationCard;

