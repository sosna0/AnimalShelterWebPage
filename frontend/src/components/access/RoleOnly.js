import { useAuth } from '../../hooks/use-auth'

export const RoleOnly = ({ children, allowedRoles }) => {
    const { user } = useAuth()
    return allowedRoles.includes(user?.role) ? children : null
};  

// Usage example:
{/* <RoleOnly allowedRoles={['staff']}>
  <button>Edit</button>
</RoleOnly>

<RoleOnly allowedRoles={['public', 'staff']}>
  <p>This is visible for all users</p>
</RoleOnly> */}
