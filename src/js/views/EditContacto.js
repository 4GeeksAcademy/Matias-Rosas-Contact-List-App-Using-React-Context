import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const EditContacto = () => {
    const { contactID } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        getContact(contactID);
    }, [contactID]);//Para que siempre este actualizado

    function getContact(contactid) {
        fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts`)
            .then(resp => resp.json())
            .then(data => {
                const foundContact = data.contacts.find(contact => contact.id === parseInt(contactid));
                if (foundContact) {
                    setContact(foundContact);
                }
            })
            .catch(error => console.log(error));
    }

    function updateContact() {
      let updatedContactobj = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
      };

      fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts/${contactID}`, {
        method: "PUT",
        body: JSON.stringify(updatedContactobj),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((resp) => {
        console.log(resp.ok); 
        console.log(resp.status); 
        return resp.json();  
      })
      .then((updatedContact) => {
        console.log("Contacto actualizado: ", updatedContact);
        navigate("/"); 
      })
      .catch((error) => console.log(error));
    }

    return (
        <div className="container">
            {contact ? (
                <>
                    <h3>Editing {contact.name}</h3>
                    <form className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={contact.name}
                                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={contact.email}
                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={contact.address}
                                onChange={(e) => setContact({ ...contact, address: e.target.value })}
                            />
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={updateContact}
                        >
                          Save
                        </button>
                    </form>
                </>
            ) : (
                <div>Loading contact details...</div>
            )}
            <div className="text-center mt-3">
                <a className="text-muted" onClick={() => navigate("/")}>Back to contacts</a>
            </div>
        </div>
    );
};

export default EditContacto;
