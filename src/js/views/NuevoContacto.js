import React from 'react'
import { useParams,useNavigate } from "react-router-dom";

const NuevoContacto = () => {
  const navigate = useNavigate()

    return (
        <>
        <div className="container">
      <h1 className="text-center mt-5">Add a new contact</h1>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" placeholder="Full Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" placeholder="Enter phone" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" placeholder="Enter address" />
        </div>
        <button type="submit" className="btn btn-primary w-100">save</button>
      </form>
      <div className="text-center mt-3">
        <a className="text-muted user-select-auto" onClick={()=>{
          navigate("/")
        }}>or get back to contacts</a>
      </div>
    </div>
        </>
    )
}

export default NuevoContacto;