import { useAuth } from '../../hooks/use-auth'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if(!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
};


// and later we will use it like this:
/* <Route
  path="/staff-dashboard"
  element={
    <ProtectedRoute allowedRoles={['staff']}>
      <StaffDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/user-profile"
  element={
    <ProtectedRoute allowedRoles={['public']}>
      <UserProfile />
    </ProtectedRoute>
  }
/> */