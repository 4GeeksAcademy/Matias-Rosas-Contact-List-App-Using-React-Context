import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.userExists();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Contacts</h3>
          <button className="btn btn-success" onClick={() => {
            navigate("/add")
          }}>Add new contact</button>
        </div>
        {store.contacts.length === 0 ? <div className="d-flex justify-content-center"><span className="text-secondary">No tienes contactos, haz click en <span className="fw-bolder">Add new contact</span> para agregar uno</span></div> :
          store.contacts.map(contact => (
            <div key={contact.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <img src={contact.image_url || 'https://via.placeholder.com/150'} alt={contact.name} className="img-fluid rounded-circle p-3" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="card-text">
                      <i className="fas fa-map-marker-alt"></i> {contact.address} <br />
                      <i className="fas fa-phone"></i> {contact.phone} <br />
                      <i className="fas fa-envelope"></i> {contact.email}
                    </p>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <button className="btn btn-link" onClick={() => navigate(`/edit/${contact.id}`)}><i className="fas fa-edit"></i></button>
                  <button className="btn btn-link" onClick={() => { actions.deleteContact(contact.id) }}><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

