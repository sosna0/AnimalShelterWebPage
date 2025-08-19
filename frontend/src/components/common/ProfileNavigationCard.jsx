import { Card, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function ProfileNavigationCard() {
  return (
    <Card className="text-center">
      <Card.Header>
        <Nav variant="tabs" className="card-header-tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/user-profile">Your Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/user-adoptions">Manage your adoptions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/user-donations">Show your donations</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      
      <Card.Body>
        <Outlet />
      </Card.Body>
    </Card>
  );
}

export default ProfileNavigationCard;

