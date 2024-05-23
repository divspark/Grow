import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const FeedbackForm = () => {
  //const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  //const [message, setMessage] = useState("");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t2k43a8", "template_hgi7l3r", form.current, {
        publicKey: "t32ffvFY73OugivhP",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    //setName("");
    //setEmail("");
    //setMessage("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically handle the form submission,
  //   // such as sending the data to a server.
  //   console.log('Feedback submitted:', { name, email, message });
  //   // Clear the form fields
  //   setName('');
  //   setEmail('');
  //   setMessage('');
  // };

  return (
    // <div className="feedback-form-container">
    //   <h2>Feedback Form</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="name">Name:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name='from_name'
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="user_email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="message">Feedback:</label>
    //       <textarea
    //         id="message"
    //         name="message"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         required
    //       ></textarea>
    //     </div>
    //     <button className="form-btn" type="submit">Submit</button>
    //   </form>
    // </div>
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      
      <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label>Name</label>
      <input type="text" name="from_name" className="input-field" />
      </div>
      <div className="form-group">
      <label>Email</label>
      <input type="email" name="user_email" className="input-field" />
      </div>
      <div className="form-group">
      <label>Message</label>
      <textarea name="message" className="textarea-field" />
      </div>
      <button className="form-btn" type="submit">Submit</button>
    </form>
    </div>
  );
};

export default FeedbackForm;
