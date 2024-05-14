import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

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

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(newContacts);
  };

  return (
    <div className="App">
      <h2>Hello Dude</h2>
      <form>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Email</td>
            </tr>
          </thead>

          <tbody>
            {contacts.map((data) => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.email}</td>
                <td>
                  <button>Edit</button>
                  <button
                    type="button"
                    data-testid={`deleteBtn${data.id}`}
                    onClick={() => handleDeleteClick(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
