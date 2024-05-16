import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import EditRow from "./components/EditRow";
import ReadRow from "./components/ReadRow";

const data = [
  {
    id: 1,
    name: "Bob",
    age: 55,
    email: "bob@bob.com",
  },
  {
    id: 2,
    name: "Jim",
    age: 44,
    email: "jim@jim.com",
  },
  {
    id: 3,
    name: "Kim",
    age: 22,
    email: "kim@yahoo.com",
  },
];

function App() {
  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);
  const [formData, setFormData] = useState({
    add: {
      name: "",
      age: "",
      email: "",
    },
    edit: {
      name: "",
      age: "",
      email: "",
    },
  });

  const handleFormChange = (e, formType) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formType]: {
        ...prevFormData[formType],
        [name]: value,
      },
    }));
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name: formData.add.name,
      age: formData.add.age,
      email: formData.add.email,
    };

    console.log("New Contact Added");
    setContacts((prevContacts) => [...prevContacts, newContact]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      add: {
        name: "",
        age: "",
        email: "",
      },
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      id: editContactId,
      name: formData.edit.name,
      age: formData.edit.age,
      email: formData.edit.email,
    };

    const updatedContacts = contacts.map((contact) =>
      contact.id === editContactId ? editedContact : contact
    );

    console.log("Edit Saved");
    setContacts(updatedContacts);
    setEditContactId(null);
  };

  const handleEditClick = (e, contact) => {
    e.preventDefault();
    setEditContactId(contact.id);

    const editedFormValues = {
      name: contact.name,
      age: contact.age,
      email: contact.email,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      edit: editedFormValues,
    }));
  };

  const handleDeleteClick = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    console.log("Contact Deleted");
    setContacts(newContacts);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  return (
    <div className="App">
      <h2>Hello Dude</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Email</td>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) =>
              editContactId === contact.id ? (
                <EditRow
                  key={contact.id}
                  contact={contact}
                  formData={formData}
                  setFormData={setFormData}
                  handleFormChange={handleFormChange}
                  handleEditClick={handleEditClick}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ReadRow
                  key={contact.id}
                  contact={contact}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )
            )}
          </tbody>
        </table>
      </form>
      <h2>Add New Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.add.name}
          onChange={(e) => handleFormChange(e, "add")}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.add.age}
          onChange={(e) => handleFormChange(e, "add")}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.add.email}
          onChange={(e) => handleFormChange(e, "add")}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;

// const handleEditFormSubmit = (e, id) => {
//   e.preventDefault();

//   setContacts((prevContacts) =>
//     prevContacts.map((contact) =>
//       contact.id === id
//         ? {
//             ...contact,
//             name: formData.edit.name,
//             age: formData.edit.age,
//             email: formData.edit.email,
//           }
//         : contact
//     )
//   );

//   setEditContactId(null);
//   console.log("Edit Saved");
// };
