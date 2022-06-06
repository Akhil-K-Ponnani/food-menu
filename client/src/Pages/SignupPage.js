import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../Components/Header"
import Signup from "../Components/Signup"

function SignupPage() {
  const navigate = useNavigate()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user)
      navigate("/")
  }, [navigate])

  return (
    <div>
      <Header />
      <Signup />
    </div>
  )
}

export default SignupPage