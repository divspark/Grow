import { useRef} from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export const ContactUs = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_t2k43a8', 'template_hgi7l3r', form.current, {
        publicKey: 't32ffvFY73OugivhP',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

    //   setName("");
    // setEmail("");
    // setMessage("");
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="contact-form">
      <label>Name</label>
      <input type="text" name="from_name" className="input-field" />
      <label>Email</label>
      <input type="email" name="user_email" className="input-field" />
      <label>Message</label>
      <textarea name="message" className="textarea-field" />
      <input type="submit" value="Send" className="submit-button" />
    </form>
  );
};