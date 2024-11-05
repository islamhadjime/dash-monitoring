import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Aside from '../Aside'
import Header from '../Header'
import { useAuthStore } from '../../store/authStore'

const index = () => {
  const { isAuth } = useAuthStore()
  React.useEffect(() => {
    const aside = document.querySelector('aside')
    const main = document.querySelector('main')
    if(!aside){
      main.style.width = '100%'
    }else{
      main.style.width = `calc(100% - ${aside.offsetWidth}px)`
    }
  }, [isAuth]);


  return (
    <>
      {isAuth && <Aside />}
      <Main>
        <Header />
        <div className='content'>
          <Outlet />
        </div>
      </Main>
    </>
  )
}
const Main = styled.main`
  width: calc(100% - 300px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

export default index
