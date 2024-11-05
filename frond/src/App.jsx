import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import School from './pages/School'
import Layout from './components/Layout'
import Login from './pages/Login'
import { useAuthStore } from './store/authStore'
import useStatic from './hooks/useStatic'
import useInfo from './hooks/useInfo'
function App() {
  const path = useLocation()
  const { getStatic } = useStatic()
  const { fetchInfog } = useInfo()

  React.useEffect(() => {
    getStatic()
    fetchInfog()
  }, [path])


  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/school/:id' element={<School />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
    </>
  )
}

export default App
