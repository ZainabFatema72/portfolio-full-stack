import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    // In charon IDs ko apne EmailJS dashboard se badlein
    emailjs.sendForm(
      //service id
      'service_m731vqo', 
      //template id
      'template_3qz4k7h', 
      form.current, 
      //public key
      'Ijw0V3tLEoK25eA-B'
    )
    .then((result) => {
        console.log(result.text);
        setStatus("Message Sent Successfully! ✅");
        e.target.reset(); 
    }, (error) => {
        console.log(error.text);
        setStatus("Failed to send. Please try again. ❌");
    });
  };

  return (
    <article className="contact active">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form className="form" ref={form} onSubmit={sendEmail}>
          <div className="input-wrapper">
            <input 
              type="text" 
              name="from_name" // Template mein {{from_name}} use karein
              className="form-input" 
              placeholder="Full name" 
              required 
            />
            <input 
              type="email" 
              name="reply_to" // Template mein {{reply_to}} use karein
              className="form-input" 
              placeholder="Email address" 
              required 
            />
          </div>

          <textarea 
            name="message" // Template mein {{message}} use karein
            className="form-input" 
            placeholder="Your Message" 
            required
          ></textarea>

          <button className="form-btn" type="submit">
            <ion-icon name="paper-plane-outline"></ion-icon>
            <span>Send Message</span>
          </button>
        </form>
        
        {status && <p style={{marginTop: '15px', color: 'var(--orange-yellow-crayola)'}}>{status}</p>}
      </section>
    </article>
  );
};

export default Contact;