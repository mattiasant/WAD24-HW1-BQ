<template>
    <div class="contact-page">
      <div class="contact-card">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us!</p>
        <div class="contact-details">
          <p><strong>Email:</strong> <a href="mailto:support@contact.com">support@contact.com</a></p>
          <p><strong>Phone: 123-456-7890</strong></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactPage",
  };
  </script>
  
  <style scoped>
  .contact-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    background-color: #f7f7f9; 
    font-family: "Arial", sans-serif;
  }
  
  .contact-card {
    background: #ddd1f0; 
    padding: 2em;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    text-align: center;
  }
  
  .contact-card h1 {
    margin-bottom: 1em;
    color: #402f49;
    font-size: 2rem;
  }
  
  .contact-card p {
    margin: 0.5em 0;
    color: #272129; 
  }
  
  .contact-details p {
    margin: 1em 0;
  }
  
  .contact-card a {
    color: #6a1b9a;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .contact-card a:hover {
    color: #4a0072; 
  }
  </style>
  
  