async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#Email').value.trim();
    const password = document.querySelector('#Password').value.trim();
  
    if (email && password) {
      const response = await fetch('/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.signin-form').addEventListener('submit', loginFormHandler);

  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#singup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);