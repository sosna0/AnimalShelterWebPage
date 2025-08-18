import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../api/axios'
import endpoints from '../api/endpoints'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(endpoints.auth.me)
                setUser(res.data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (credentials) => {
        setLoading(true)
        await axios.post(endpoints.auth.login, credentials)
        const userData = await axios.get(endpoints.auth.me)
        setUser(userData.data)
        setLoading(false)
    }

    const logout = async () => {
        setLoading(true)
        await axios.post(endpoints.auth.logout)
        setUser(null)
        setLoading(false)
    }

    const register = async (userData) => {
        setLoading(true)
        await axios.post(endpoints.auth.register, userData)
        const userResponse = await axios.get(endpoints.auth.me)
        setUser(userResponse.data)
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
