import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../Contexts/Auth";
import Profile from "./Profile"
import Logout from "./Logout"

function Header() {
   const { user } = AuthContext()

   return (
      <header>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: "fixed", top: "0", width: "100%", zIndex: "100" }}>
            <div className="container-fluid">
               <Link to="/" className="navbar-brand title" style={{ fontWeight: "500" }}>Food Menu</Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     {!user ? <li className="nav-item">
                        <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                     </li>
                        : <li className="nav-item">
                           <div className="nav-link" aria-current="page" data-bs-toggle="modal" data-bs-target="#user-profile" style={{ cursor: "pointer" }}>Profile</div>
                        </li>}
                     {user && <li className="nav-item">
                        <div className="nav-link" aria-current="page" data-bs-toggle="modal" data-bs-target="#logout-user" style={{ cursor: "pointer" }}>Logout</div>
                     </li>}
                  </ul>
               </div>
            </div>
         </nav>
         <Profile />
         <Logout />
      </header>
   )
}

export default Header