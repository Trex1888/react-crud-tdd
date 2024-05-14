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

  // Add some delay or wait for the new contact to be rendered
  await waitFor(() => {
    const newName = screen.getByText("Kobe");
    const newAge = screen.getByText("24");
    const newEmail = screen.getByText("kobe@kobe.com");

    expect(newName).toBeInTheDocument();
    expect(newAge).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
  });
});

it("should delete a contact", async () => {
  render(<App />);
  const deleteBtn = screen.getByTestId("deleteBtn1");
  userEvent.click(deleteBtn);

  // Wait for the DOM to update after the deletion
  await waitFor(() => {
    const nameValue = screen.queryByText("Bob");
    expect(nameValue).toBeNull(); // Use toBeNull() instead of toBeInTheDocument()
  });
});
