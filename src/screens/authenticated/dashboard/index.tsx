import React from 'react'
import { Button } from 'react-bootstrap'
import { getAuth, signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from "../dashboard/sub-components/navbar/index";


const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('Auth_Token')
    if (!token){
      navigate('/')
    }
  }, []);
  
  return (
    
    <div>
      <h1>DASHBOARD</h1>
    </div>
  )
}

export default Dashboard