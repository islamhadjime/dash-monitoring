import axios from '../axios'
import { useState } from 'react'

const useIdSchool = () => {
    const [school, setSchool] = useState(null)
    const [loading, setLoading] = useState(false)

    const getSchool = async (id) => {
        try {
            setLoading(true)
            const res = await axios.get(`/school/${id}`)
            if(!res.data) throw new Error('No data')
            setSchool(res.data.message)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return { getSchool, school, loading }
}

export default useIdSchool