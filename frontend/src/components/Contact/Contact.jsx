import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/contact', form)
      .then(response => {
        console.log(response.data);
        setForm({ name: "", email: "", message: "" });
        setSuccessMessage("Your query has been sent successfully!");
        setTimeout(() => setSuccessMessage(""), 5000); // Clear the message after 5 seconds
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ContactUs;
