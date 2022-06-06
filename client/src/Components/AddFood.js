import React, { useState } from 'react'
import axios from 'axios'
import { AuthContext } from "../Contexts/Auth";

function AddFood() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const { user, fetchFoods, setFetchFoods } = AuthContext()

  const handleSubmit = () => {
    if (name !== '') {
      if (category !== '') {
        if (price !== '') {
          let config = { headers: { Authorization: `Bearer ${user.token}` } }
          axios.post("/food/add-food", { name, category, price }, config).then(({ data }) => {
            setFetchFoods(!fetchFoods)
            setName('')
            setCategory('')
            setPrice('')
          }).catch(({ response }) => {
            alert(response.data.message)
          })
        }
        else
          alert("Please Enter Food Price.")
      }
      else
        alert("Please Enter Food Category.")
    }
    else
      alert("Please Enter Food Name.")
  }

  return (
    <div className="modal fade" id="add-food" tabindex="-1" aria-labelledby="add-food-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="add-food-label">Add Food</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label for="name" className="col-form-label">Name:</label>
                <input type="text" name="name"value={name} className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label for="category" className="col-form-label">Category:</label>
                <input type="text" name="category" value={category} className="form-control" id="category" onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="mb-3">
                <label for="price" className="col-form-label">Price:</label>
                <input type="number" name="price" value={price} className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-dark float-end" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood