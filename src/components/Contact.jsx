import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_m731vqo', 
      'template_3qz4k7h', 
      form.current, 
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

  const inputClass = "w-full bg-onyx border border-jet text-white p-4 rounded-xl outline-none focus:border-orange-yellow-crayola transition-all placeholder:text-light-gray-70 text-sm";

  return (
    <article className="animate-fadeIn p-4">
      <header className="relative pb-2 mb-8">
        <h2 className="text-3xl font-bold text-white capitalize">Contact</h2>
        <div className="absolute bottom-0 left-0 w-10 h-1 bg-orange-yellow-crayola rounded-full"></div>
      </header>

      {/* Map Section - Optional but adds professional look */}
      <section className="mb-8 rounded-2xl overflow-hidden border border-jet grayscale contrast-125 opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119245.5401932313!2d77.674987!3d20.932029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4a6db6933d7%3A0x6a08605380572620!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000"
          width="100%" height="300" loading="lazy" title="Google Map"
        ></iframe>
      </section>

      <section className="contact-form">
        <h3 className="text-xl font-bold text-white mb-6">Contact Form</h3>

        <form className="space-y-5" ref={form} onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input 
              type="text" 
              name="from_name" 
              className={inputClass}
              placeholder="Full name" 
              required 
            />
            <input 
              type="email" 
              name="reply_to" 
              className={inputClass}
              placeholder="Email address" 
              required 
            />
          </div>

          <textarea 
            name="message" 
            className={`${inputClass} min-h-[150px] resize-none`}
            placeholder="Your Message" 
            required
          ></textarea>

          <div className="flex justify-end items-center gap-4">
            {status && (
              <p className="text-sm font-medium text-orange-yellow-crayola animate-pulse">
                {status}
              </p>
            )}
            
            <button 
              className="flex items-center gap-2 bg-gradient-jet text-orange-yellow-crayola font-bold py-3 px-8 rounded-xl border border-jet shadow-lg hover:opacity-80 transition-all group"
              type="submit"
            >
              <ion-icon name="paper-plane-outline" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></ion-icon>
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default Contact;