import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../Components/Header"
import Login from "../Components/Login"

function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user)
      navigate("/")
  }, [navigate])

  return (
    <div>
      <Header />
      <Login />
    </div>
  )
}

export default LoginPage