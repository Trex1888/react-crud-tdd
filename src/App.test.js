import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

it("Should render out header text", async () => {
  render(<App />);
  const headerText = await screen.findByText(/hello Dude/i);
  expect(headerText).toBeInTheDocument();
});

it("Should render out our 3 objects", async () => {
  render(<App />);
  const contacts = [
    { name: "Bob", age: 55, email: "bob@bob.com" },
    { name: "Jim", age: 44, email: "jim@jim.com" },
    { name: "Kim", age: 22, email: "kim@yahoo.com" },
  ];

  contacts.forEach((contact) => {
    expect(screen.getByText(contact.name)).toBeInTheDocument();
    expect(screen.getByText(contact.age)).toBeTruthy();
    expect(screen.getByText(contact.email)).toBeInTheDocument();
  });
});

it("should render add a new contact", async () => {
  render(<App />);
  const nameText = screen.getByPlaceholderText("Enter Name");
  fireEvent.change(nameText, {
    target: { value: "Kobe" },
  });
  const ageText = screen.getByPlaceholderText("Enter Age");
  fireEvent.change(ageText, {
    target: { value: "24" },
  });
  const emailText = screen.getByPlaceholderText("Enter Email");
  fireEvent.change(emailText, {
    target: { value: "kobe@kobe.com" },
  });

  const addButton = screen.getByRole("button", {
    name: "Add",
  });
  userEvent.click(addButton);

  // 1.
  // const newName = await screen.findByText("Kobe");
  // const newAge = await screen.findByText("24");
  // const newEmail = await screen.findByText("kobe@kobe.com");
  // expect(newName).toBeInTheDocument();
  // expect(newAge).toBeInTheDocument();
  // expect(newEmail).toBeInTheDocument();

  // 2.
  // await waitFor(() => {
  //   expect(screen.getByText("Kobe")).toBeInTheDocument();
  //   expect(screen.getByText("24")).toBeInTheDocument();
  //   expect(screen.getByText("kobe@kobe.com")).toBeInTheDocument();
  // });

  // 3.
  expect(await screen.findByText("Kobe")).toBeInTheDocument();
  expect(await screen.findByText("24")).toBeInTheDocument();
  expect(await screen.findByText("kobe@kobe.com")).toBeInTheDocument();
});

it("should render add a new contact", async () => {
  render(<App />);
  const nameText = screen.getByPlaceholderText("Enter Name");
  fireEvent.change(nameText, {
    target: { value: "Kobe" },
  });

  const ageText = screen.getByPlaceholderText("Enter Age");
  fireEvent.change(ageText, {
    target: { value: "24" },
  });

  const emailText = screen.getByPlaceholderText("Enter Email");
  fireEvent.change(emailText, {
    target: { value: "kobe@kobe.com" },
  });

  const addButton = screen.getByRole("button", {
    name: "Add",
  });
  userEvent.click(addButton);

  await waitFor(() => {
    const newName = screen.getByText("Kobe");
    const newAge = screen.getByText("24");
    const newEmail = screen.getByText("kobe@kobe.com");

    expect(newName).toBeInTheDocument();
    expect(newAge).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
  });
});

it("should edit a contact", async () => {
  render(<App />);
  const editBtn = screen.getByTestId("editBtn1");
  userEvent.click(editBtn);

  const currentName = await screen.findByDisplayValue("Bob");
  userEvent.clear(currentName);
  userEvent.type(currentName, "Ray");

  const currentAge = await screen.findByDisplayValue("55");
  userEvent.clear(currentAge);
  userEvent.type(currentAge, "22");

  const currentEmail = await screen.findByDisplayValue("bob@bob.com");
  userEvent.clear(currentEmail);
  userEvent.type(currentEmail, "ray@ray.com");

  const saveBtn = await screen.findByTestId("saveBtn1");
  userEvent.click(saveBtn);

  await waitFor(() => {
    expect(currentName.value).toBe("Ray");
    expect(currentAge.value).toBe("22");
    expect(currentEmail.value).toBe("ray@ray.com");
  });
});

it("should delete a contact", async () => {
  render(<App />);
  const deleteBtn = screen.getByTestId("deleteBtn1");
  userEvent.click(deleteBtn);

  await waitFor(() => {
    const nameValue = screen.queryByText("Bob");
    expect(nameValue).toBeNull();
  });
});

it("Should cancel edits if cancel button is clicked", async () => {
  render(<App />);
  const editBtn = screen.getByTestId("editBtn1");
  userEvent.click(editBtn);

  const currentName = await screen.findByDisplayValue("Bob");
  userEvent.clear(currentName);
  userEvent.type(currentName, "Bill");

  const currentAge = await screen.findByDisplayValue("55");
  userEvent.clear(currentAge);
  userEvent.type(currentAge, "33");

  const currentEmail = await screen.findByDisplayValue("bob@bob.com");
  userEvent.clear(currentEmail);
  userEvent.type(currentEmail, "hello@hello.com");

  const cancelBtn = await screen.findByTestId("cancelBtn1");
  userEvent.click(cancelBtn);

  await waitFor(() => {
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("55")).toBeInTheDocument();
    expect(screen.getByText("bob@bob.com")).toBeInTheDocument();
  });
});

// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import App from "./App";
// import userEvent from "@testing-library/user-event";

// const customContacts = [
//   { id: 1, name: "Custom Bob", age: 25, email: "custombob@example.com" },
//   { id: 2, name: "Custom Jim", age: 30, email: "customjim@example.com" },
//   { id: 3, name: "Custom Kim", age: 35, email: "customkim@example.com" },
// ];

// it("Should render out header text", async () => {
//   render(<App />);
//   const headerText = await screen.findByText(/hello Dude/i);
//   expect(headerText).toBeInTheDocument();
// });

// it("Should render custom contacts", async () => {
//   render(<App />);
//   customContacts.forEach((contact) => {
//     expect(screen.getByText(contact.name)).toBeInTheDocument();
//     expect(screen.getByText(contact.age.toString())).toBeInTheDocument();
//     expect(screen.getByText(contact.email)).toBeInTheDocument();
//   });
// });

// it("Should add a new contact", async () => {
//   render(<App />);
//   const nameInput = screen.getByPlaceholderText("Enter Name");
//   fireEvent.change(nameInput, { target: { value: "John" } });

//   const ageInput = screen.getByPlaceholderText("Enter Age");
//   fireEvent.change(ageInput, { target: { value: "40" } });

//   const emailInput = screen.getByPlaceholderText("Enter Email");
//   fireEvent.change(emailInput, { target: { value: "john@example.com" } });

//   const addButton = screen.getByRole("button", { name: "Add" });
//   userEvent.click(addButton);

//   await waitFor(() => {
//     expect(screen.getByText("John")).toBeInTheDocument();
//     expect(screen.getByText("40")).toBeInTheDocument();
//     expect(screen.getByText("john@example.com")).toBeInTheDocument();
//   });
// });

// it("Should edit a contact", async () => {
//   render(<App />);
//   const editBtn = screen.getByTestId("editBtn1");
//   userEvent.click(editBtn);

//   const nameInput = await screen.findByDisplayValue("Custom Bob");
//   fireEvent.change(nameInput, { target: { value: "Edited Bob" } });

//   const ageInput = await screen.findByDisplayValue("25");
//   fireEvent.change(ageInput, { target: { value: "30" } });

//   const emailInput = await screen.findByDisplayValue("custombob@example.com");
//   fireEvent.change(emailInput, { target: { value: "editedbob@example.com" } });

//   const saveButton = await screen.findByTestId("saveBtn1");
//   userEvent.click(saveButton);

//   await waitFor(() => {
//     expect(screen.getByText("Edited Bob")).toBeInTheDocument();
//     expect(screen.getByText("30")).toBeInTheDocument();
//     expect(screen.getByText("editedbob@example.com")).toBeInTheDocument();
//   });
// });

// it("Should delete a contact", async () => {
//   render(<App />);
//   const deleteButton = screen.getByTestId("deleteBtn2");
//   userEvent.click(deleteButton);

//   await waitFor(() => {
//     expect(screen.queryByText("Custom Jim")).not.toBeInTheDocument();
//   });
// });

// it("Should cancel edits if cancel button is clicked", async () => {
//   render(<App />);
//   const editButton = screen.getByTestId("editBtn3");
//   userEvent.click(editButton);

//   const nameInput = await screen.findByDisplayValue("Custom Kim");
//   fireEvent.change(nameInput, { target: { value: "Changed Kim" } });

//   const cancelButton = await screen.findByTestId("cancelBtn3");
//   userEvent.click(cancelButton);

//   await waitFor(() => {
//     expect(screen.getByText("Custom Kim")).toBeInTheDocument();
//   });
// });
