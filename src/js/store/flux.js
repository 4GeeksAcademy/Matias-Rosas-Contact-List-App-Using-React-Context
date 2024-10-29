const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      contact: null
    },
    actions: {
      userExists: () => {
        fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")
          .then((resp) => resp.json())
          .then((data) => {
            const foundUser = data.agendas.find((item) => item.slug === "MatiRosas31");

            if (foundUser) {
              console.log("Usuario encontrado: ", foundUser);
              getActions().getContacts()
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
                  getActions().getContacts();
                })
                .catch((error) => console.error(error));
            }
          })
          .catch((error) => console.log(error));
      },
      getContacts: () => {
        fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts")
          .then((resp) => resp.json())
          .then((data) => {
            console.log("Aqui esta el array con los contactos: ", data.contacts);
            setStore({ contacts: data.contacts });
            return getStore().contacts;
          })
          .catch((error) => console.log(error));
      },
      createContact: (name, email, phone, address) => {
        if (name === "" || email === "" || phone === "" || address === "") {
          setStore({ contacts: "All fields are required!" });
          return;
        }

        setStore({ contacts: "" });

        let newContactobj = {
          name: name,
          phone: phone,
          email: email,
          address: address
        };

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
          .catch((error) => console.log(error))
      },
      deleteContact: (contactid) => {
        console.log("Este es el contact.id que llega a la function: ", contactid)
        let newupdatedcontacts = getStore().contacts.filter((contact) => contact.id !== contactid)
        setStore({ contacts: newupdatedcontacts })
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
      },

      getContact: (contactID) => {
        fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts`)
          .then(resp => resp.json())
          .then(data => {
            const foundContact = data.contacts.find(contact => contact.id === parseInt(contactID));
            if (foundContact) {
              setStore({ contact: foundContact });
            }
          })
          .catch(error => console.log(error));
      },
      updateContact: (contactID,updatedContact) => {
        fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts/${contactID}`, {
          method: "PUT",
          body: JSON.stringify(updatedContact),
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((resp) => {
            console.log(resp.ok);
            console.log(resp.status);
            return resp.json();
          })
          .then((newupdatedContact) => {
            console.log("Contacto actualizado despues de hacer peticion PUT: ", newupdatedContact);
            // navigate("/");
          })
          .catch((error) => console.log(error));
      }
    }
  };
};

export default getState;