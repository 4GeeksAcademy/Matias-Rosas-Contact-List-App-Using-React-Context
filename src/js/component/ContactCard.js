import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [newcontact, setNewcontact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });
    const [error, setError] = useState(""); 


/*Este useEffect se activa cada vez que store.contact cambia. 
Cuando store.contact obtiene un valor nuevo (como el contacto cargado desde la API), 
el useEffect actualiza el estado local newcontact con ese valor. Esto asegura que los datos del contacto actual estén disponibles 
y listos para mostrarse en los campos de entrada (input).
*/
    useEffect(() => {
        if (store.contact) {
            setNewcontact(store.contact); //
            //
        }
    }, [store.contact]);

/* 
Este useEffect se ejecuta cuando el componente se monta y también cada vez que cambia el id (si el componente recibe un nuevo id de contacto).
Llama a la acción actions.getContact(id) para obtener los datos del contacto específico que se va a editar.
*/
    useEffect(() => {
        actions.getContact(id);
    }, [id]);

    const handleSave = () => {
        if (!newcontact.name || !newcontact.email || !newcontact.phone || !newcontact.address) {
            setError("Please fill out all fields."); 
        } else {
            actions.updateContact(newcontact.id ,newcontact);
            navigate("/");
        }
    };


    return (
        <div className="container">
            {store.contact ? (
                <>
                    <h3>Editing {newcontact.name}</h3>
                    <form className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={newcontact.name}
                                onChange={(e) => setNewcontact({ ...newcontact, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={newcontact.email}
                                onChange={(e) => setNewcontact({ ...newcontact, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                value={newcontact.phone}
                                onChange={(e) => setNewcontact({ ...newcontact, phone: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={newcontact.address}
                                onChange={(e) => setNewcontact({ ...newcontact, address: e.target.value })}
                            />
                        </div>
                        {error !== "" ? <p className="text-danger">{error}</p> : ""}
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={() => {
                                console.log("asi es el  objeto newcontact:  ", newcontact)
                                handleSave();
                            }}
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
