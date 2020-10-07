import { handleErrors } from "./utils.js";


const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const newUser = {
    username: formData.get(`username`),
    email: formData.get(`email`),
    password: formData.get(`password`),
    confirmPassword: formData.get(`confirmPassword`),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName')
  }

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!res.ok) throw res;
    
    const { token, user: { id } } = await res.json();
    
    localStorage.setItem('MEDIUM_CLONE_ACCESS_TOKEN', token);
    localStorage.setItem('MEDIUM_CLONE_CURRENT_USER_ID', id);
    
    document
      .querySelector('.sign-up-overlay')
      .classList.add('hidden')
  }
  catch (err) {
    handleErrors(err, 'sign-up');
  }
})


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const user = { username: formData.username, password: formData.password };
  
  try{
    const res = await fetch(`/api/users/log-in`, {
      method: 'Post',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) throw res;
    
    const { token, user: { id } } = await res.json();
    
    localStorage.setItem('MEDIUM_CLONE_ACCESS_TOKEN', token);
    localStorage.setItem('MEDIUM_CLONE_CURRENT_USER_ID', id);
    
    document
      .querySelector('.log-in-overlay')
      .classList.add('hidden')
  }
  catch (err) {
    handleErrors(err, 'log-in');
  }
})