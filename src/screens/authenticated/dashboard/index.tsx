import React from 'react'
import { Button } from 'react-bootstrap'
import { getAuth, signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('Auth_Token')
    if (!token){
      navigate('/')
    }
  }, []);
  
  const handleSignOut = () =>{
    const auth = getAuth()
    signOut(auth)
    sessionStorage.clear()
    console.log('Deleted token')
    console.log('Redirecting to login page')
    navigate('/')
  }

  return (
    <div>
      <h1>DASHBOARD</h1>
    <Button onClick={handleSignOut}>Logout</Button>
    </div>
  )
}

export default Dashboard