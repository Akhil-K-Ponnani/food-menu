import React, { useState } from 'react'
import axios from 'axios'
import { AuthContext } from "../Contexts/Auth";

function Profile() {
        const [name, setName] = useState('')
        const [editMode, setEditMode] = useState(false)
        const { user, setUser } = AuthContext()

        const handleSubmit = () => {
                if (name !== '') {
                        let config = { headers: { Authorization: `Bearer ${user.token}` } }
                        axios.put("/user/edit-user", { name }, config).then(({ data }) => {
                                localStorage.setItem("user", JSON.stringify(data))
                                setUser(data)
                                setEditMode(false)
                        }).catch(({ response }) => {
                                alert(response.data.message)
                        })
                }
                else
                        alert("Please Enter your Name.")
        }

        const changeMode = () => {
                setName(user.name)
                setEditMode(true)
        }

        return (
                <div className="modal fade" id="user-profile" tabindex="-1" aria-labelledby="user-profile-label" aria-hidden="true">
                        <div className="modal-dialog">
                                <div className="modal-content">
                                        <div className="modal-header">
                                                <h5 className="modal-title" id="user-profile-label">Profile</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                                <form>
                                                        <div className="mb-3">
                                                                <label for="name" className="col-form-label">Name:</label>
                                                                <input type="text" name="name" value={!editMode ? user && user.name : name} className="form-control" id="name" onChange={(e) => setName(e.target.value)} disabled={!editMode && 'disabled'} style={{background:"#fff"}} />
                                                        </div>
                                                        <div className="mb-3">
                                                                <label for="email" className="col-form-label">Email:</label>
                                                                <input type="email" name="email" value={user && user.email} className="form-control" id="email" disabled style={{background:"#fff"}} />
                                                        </div>
                                                </form>
                                        </div>
                                        <div className="modal-footer">
                                                {!editMode ? <button type="button" className="btn btn-dark float-end" onClick={changeMode}>Edit</button>
                                                        : <button type="button" className="btn btn-dark float-end" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>}
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default Profile