import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const [contacts, setContacts] = useState([]);
	const navigate = useNavigate();

	function checkUser() {
		fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")
		  .then((resp) => resp.json())
		  .then((data) => {
			const foundUser = data.agendas.find((item) => item.slug === "MatiRosas31");
	
			if (foundUser) {
				console.log("Usuario encontrado: ", foundUser);
				getContacts () 
			} else {
				console.log("Usuario no encontrado: Creando usuario...");
				let newUser = {
					slug: "MatiRosas31"
				};
				fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31", {
					method: "POST",
					body: JSON.stringify(newUser),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((resp) => {
					console.log(resp.ok); 
					console.log(resp.status); 
					return resp.json();  
				})
				.then((user) => {
					console.log("Usuario creado: ", user);
					getContacts () 
				})
				.catch((error) => console.error(error));
			}
		  })
		  .catch((error) => console.log(error));
	}



	function getContacts () {
		fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts")
		.then((resp) => resp.json())
		.then((data) => {
			console.log("Aqui esta el array con los contactos: ", data.contacts);
			setContacts(data.contacts); 
		})
		.catch((error)=> console.log(error));
	}	

	function removeContact (contactid) {
		console.log("Este es el contact.id que llega a la function: ", contactid)
		let newupdatedcontacts = contacts.filter((contact)=> contact.id !== contactid)
		setContacts(newupdatedcontacts)
		fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts/${contactid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then((resp) => {
			console.log("Esta es la respuesta luego de la peticion de eliminar el contacto: ", resp.status)
		})
		.catch((error) => console.error(error));
	}
	useEffect(() => {
		checkUser();
	}, []);
	
	return (
		<>
		<div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Contacts</h3>
        <button className="btn btn-success" onClick={()=> {
			navigate("/nuevo-contacto")
		}}>Add new contact</button>
      </div>
	  {contacts.length === 0 ? <div className="d-flex justify-content-center"><span className="text-secondary">No tienes contactos, haz click en <span className="fw-bolder">Add new contact</span> para agregar uno</span></div> :
	  contacts.map(contact => (
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
              <button className="btn btn-link" onClick={() => navigate(`/EditContacto/${contact.id}`)}><i className="fas fa-edit"></i></button>
              <button className="btn btn-link" onClick={() => {removeContact(contact.id)}}><i className="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  		</>
	);
};
