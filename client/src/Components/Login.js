import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../Contexts/Auth";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = AuthContext()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email !== '' && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      if (password.length >= 8 && password.length <= 15) {
        let config = { headers: { "Content-type": "application/json" } }
        axios.post("/user/login", { email, password }, config).then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data))
          setUser(data)
          navigate("/")
        }).catch(({ response }) => {
          alert(response.data.message)
        })
      }
      else
        alert("Password must be 8-15 Characters.")
    }
    else
      alert("Please Enter a valid Email.")
  }

  return (
    <div className="container" style={{ paddingTop: "75px" }}>
      <h2 className="text-center title mb-1">Login</h2>
      <form>
        <div className="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Link to="/signup">Create new Account?</Link>
        <button type="button" className="btn btn-dark float-end" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default Login