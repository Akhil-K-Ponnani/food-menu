import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from "../Contexts/Auth";
import AddFood from "./AddFood"
import EditFood from "./EditFood"
import DeleteFood from "./DeleteFood"

function Foods() {
   const [foods, setFoods] = useState([])
   const { user, setSelectedFood, fetchFoods } = AuthContext()

   useEffect(() => {
      axios.get("/food").then(({ data }) => {
         setFoods(data)
      })
   }, [fetchFoods])

   return (
      <div className="container-fluid" style={{ paddingTop: "75px" }}>
         {user && user.type === "admin" && <button type="button" className="btn btn-dark mb-3" data-bs-toggle="modal" data-bs-target="#add-food">Add Food</button>}
         {foods.length > 0 ? <div className="table-responsive" >
            <table className="table table-hover table-bordered">
               <thead className="table-dark">
                  <tr>
                     <th scope="col" style={{ textAlign: "center" }}>#</th>
                     <th scope="col" style={{ textAlign: "center" }}>Name</th>
                     <th scope="col" style={{ textAlign: "center" }}>Category</th>
                     <th scope="col" style={{ textAlign: "center" }}>Price</th>
                     {user && user.type === "admin" && <th scope="col">Actions</th>}
                  </tr>
               </thead>
               <tbody>
                  {foods.map((food, index) =>
                     <tr key={index}>
                        <th scope="row" style={{ textAlign: "center" }}>{index + 1}</th>
                        <td style={{ textAlign: "center" }}>{food.name}</td>
                        <td style={{ textAlign: "center" }}>{food.category}</td>
                        <td style={{ textAlign: "center" }}>₹{food.price}</td>
                        {user && user.type === "admin" && <td style={{ textAlign: "center" }}>
                           <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#edit-food" onClick={() => setSelectedFood(food)}><i className="fal fa-pen" /></button>&nbsp;&nbsp;
                           <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#delete-food" onClick={() => setSelectedFood(food)}><i className="fal fa-trash" /></button>
                        </td>}
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
            : <h5 className="text-center">Food is Empty</h5>}
         <AddFood />
         <EditFood />
         <DeleteFood />
      </div>
   )
}

export default Foods