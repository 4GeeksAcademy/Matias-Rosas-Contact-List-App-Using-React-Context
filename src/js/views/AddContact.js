import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
//Si aparece una importancion de un modulo, eliminarla (problemas con el codespace)
export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(""); 
   
    const handleSave = () => {
      if (!name || !email || !phone || !address) {
          setError("Please fill out all fields."); 
      } else {
          actions.createContact(name, email, phone, address);
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setError(""); 
          navigate("/"); 
      }
  };

    return (
        <>
        <div className="container">
          <h1 className="text-center mt-5">Add a new contact</h1>
          <form className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" className="form-control" id="phone" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            {error !== "" ? <p className="text-danger">{error}</p> : ""}
            <button type="button" className="btn btn-primary w-100" onClick={handleSave}>Save</button>
          </form>
          <div className="text-center mt-3">
            <a className="text-muted user-select-auto" onClick={() => {
              navigate("/");
            }}>or get back to contacts</a>
          </div>
        </div>
      </>
    );
};