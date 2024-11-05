import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import axios from '../axios'

import { useNavigate } from 'react-router-dom'

const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setIsAuth } = useAuthStore()
    const navigate = useNavigate()

    const loginFetch = async (email, password) => {
        setLoading(true)
        try {
            const response = await axios.post('auth/login', { email, password })
            if(!response){
                throw new Error('Неверный логин или пароль')
            }
            console.log(response.data.message)
            window.localStorage.setItem('token', response.data.message)
            setIsAuth(true)
            navigate('/')
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return { loginFetch, error, loading }
}

export default useLogin
