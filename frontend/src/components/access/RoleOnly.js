import { useAuth } from '../../hooks/use-auth'

export const RoleOnly = ({ children, allowedRoles }) => {
	const { user } = useAuth()
	const role = user?.role || 'guest';	// role defaults to 'guest' if user not logged in
		
	return allowedRoles.includes(role) ? children : null
}