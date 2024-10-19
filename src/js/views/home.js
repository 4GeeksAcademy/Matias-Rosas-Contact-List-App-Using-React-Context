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
			console.log(data);
			data.agendas.map((item) => {
			  if (item.slug === "MatiRosas31") { 
				console.log("Usuario encontrado");
				//AGREGAR FUNCTION DE TRAER DATOS Y TODO EL RESTO
			  } else {
				console.log("Usuario no encontrado :(");
			  }
			});
		  })
		  .catch((error) => console.log(error));
		};

// Tareas pendientes:
// 1) Hacer una function para agregar contactos usando el componente NuevoContacto
// 2) La function debe ser parecida a la de las tareas todo 
// 3) Debera pushear nuevos objetos al array con la info de los forms
	

	function getContacts () {
		fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts")
		.then((resp) => resp.json())
		.then((data) => {
			console.log("Aqui esta el array con los contactos: ", data.contacts);
			setContacts(data.contacts); 
		})
		.catch((error)=> console.log(error));
	}	

	useEffect(() => {
		getContacts ()
	}, []);
	
	return (
		<>
		<div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Contacts</h3>
        <button className="btn btn-success" onClick={()=> {
			navigate("/nuevo-contacto")
		}}>Add new contact</button>
		<button className="btn btn-danger" onClick={()=> {
			checkUser();
		}}>Checkear si mi Usuario sigue vivo</button>
      </div>
      {contacts.map(contact => (
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
              <button className="btn btn-link"><i className="fas fa-edit"></i></button>
              <button className="btn btn-link"><i className="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  		</>
	);
};
