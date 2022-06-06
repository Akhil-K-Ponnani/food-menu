import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../Contexts/Auth";

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = AuthContext()
  const navigate = useNavigate()

  const handleSignup = () => {
    if (name !== '') {
      if (email !== '' && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        if (password.length >= 8 && password.length <= 15) {
          let config = { headers: { "Content-type": "application/json" } }
          axios.post("/user/signup", { name, email, password }, config).then(({ data }) => {
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
    else
      alert("Please Enter your Name.")
  }

  return (
    <div className="container" style={{ paddingTop: "75px" }}>
      <h2 className="text-center mb-1 title">Signup</h2>
      <form>
        <div className="mb-3">
          <label for="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Link to="/login">Already have Account?</Link>
        <button type="button" className="btn btn-dark float-end" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  )
}

export default Signup