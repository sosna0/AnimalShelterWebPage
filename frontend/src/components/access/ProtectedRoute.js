import { useAuth } from '../../hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

export const ProtectedRoute = ({ children, allowedRoles }) => {
  	const { user, loading } = useAuth()

	if (loading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		)
	}

	if (!user) {
		return <Navigate to="/login" replace />
	}

	if (!allowedRoles.includes(user.role)) {
		return <Navigate to="/unauthorized" replace />
	}

	return children
}
