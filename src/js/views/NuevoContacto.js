import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";

const NuevoContacto = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] =useState("");
  const [phone, setPhone] =useState("");
  const [address, setAddress] =useState("");

  function addNewContact (name,email,phone, address) {
    if (name !== "" && email !== "" && phone !== "" && address !== "") {
    let newContactobj = {
      name: name,
      phone: phone,
      email: email,
      address: address
    }
    fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts", {
      method: "POST",
      body: JSON.stringify(newContactobj),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((resp) => {
      console.log(resp.ok); 
      console.log(resp.status); 
      return resp.json();  
    })
    .then((contact) => {
      console.log("Nuevo contacto creado: ", contact);
    })
    .catch((error) => console.log(error));  
    }
  }

    return (
        <>
        <div className="container">
      <h1 className="text-center mt-5">Add a new contact</h1>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" placeholder="Full Name" value={name}  onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <button type="button" className="btn btn-primary w-100" onClick={()=> {addNewContact(name, email, phone, address), setName(""), setEmail(""), setPhone(""), setAddress("")}}>save</button>
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