import { useAuth } from '../../hooks/use-auth'
import { Spinner, Container } from 'react-bootstrap'

export const RoleOnly = ({ children, allowedRoles }) => {
	const { user, loading } = useAuth()
	const role = user?.role || 'guest'

	if (loading) {
		return (
			<Container className="text-center my-5">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</Container>
		)
	}

	return allowedRoles.includes(role) ? children : null
}
