import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../api/axios'
import endpoints from '../api/endpoints'


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get(endpoints.auth.me)
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
    }, [])

    const login = async (credentials) => {
        await axios.post(endpoints.auth.login, credentials)
        const userData = await axios.get(endpoints.auth.me)
        setUser(userData.data)
    }

    const logout = async () => {
        await axios.post(endpoints.auth.logout)
        setUser(null)
    }

    const register = async (userData) => {
        await axios.post(endpoints.auth.register, userData)
        const userResponse = await axios.get(endpoints.auth.me)
        setUser(userResponse.data)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)