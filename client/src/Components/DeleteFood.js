import React from 'react'
import axios from 'axios'
import { AuthContext } from "../Contexts/Auth";

function DeleteFood() {
  const { user, selectedFood, setSelectedFood, fetchFoods, setFetchFoods } = AuthContext()

  const handleDelete = () => {
    let config = { headers: { Authorization: `Bearer ${user.token}` } }
    axios.delete(`/food/delete-food/${selectedFood._id}`, config).then(() => {
      setSelectedFood()
      setFetchFoods(!fetchFoods)
    }).catch(({ response }) => {
      alert(response.data.message)
    })
  }

  return (
    <div className="modal fade" id="delete-food" tabindex="-1" aria-labelledby="delete-food-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="delete-food-label">Delete Food</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Are you sure to delete {selectedFood && selectedFood.name}?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteFood