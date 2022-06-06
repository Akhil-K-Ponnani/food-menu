import React from 'react'
import { AuthContext } from "../Contexts/Auth";

function Logout() {
  const { setUser } = AuthContext()

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser()
  }

  return (
    <div className="modal fade" id="logout-user" tabindex="-1" aria-labelledby="logout-user-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="logout-user-label">Logout</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Are you sure to logout from Food Menu?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logout