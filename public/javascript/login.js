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

  