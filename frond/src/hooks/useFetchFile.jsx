import React from 'react'
import axios from '../axios'

const useFetchFile = () => {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(null)

    const fetchFile = async (files) => {
        try{
            setLoading(true)
            const res = await axios.post('school/static-file', files)
            if(res.status === 200){
                setLoading(false)
                setSuccess(true)
                console.log(res.data)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        }catch(err){
            setError(err)
        }
    }

    return { fetchFile, loading, error, success }
}

export default useFetchFile
