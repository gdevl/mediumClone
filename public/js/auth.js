import { handleErrors } from "./utils.js";

/*********************************************************/
//* Function to reduce repetitive code
const fetchPostUserAndStoreToken = async (user) => {
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
}

/*********************************************************/
//* Form Submissions

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
  fetchPostUserAndStoreToken(newUser)
})


const loginForm = document.querySelector('.center__log-in-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const user = { username: formData.username, password: formData.password };
  fetchPostUserAndStoreToken(user);
})

/*********************************************************/
//* Demo Login Functionality

const fetchAndClose = (overlay) => {
  fetchPostUserAndStoreToken({ username: 'demilogan', password: 'Password1!' });
  document.querySelector(`.${overlay}-overlay`).classList.add('hidden');
}

document
  .querySelector('.sign-up-form__demo-login')
  .addEventListener('click', () => {
    fetchAndClose('sign-up')
  });

document
  .querySelector('.log-in-form__demo-login')
  .addEventListener('click', () => {
    fetchAndClose('log-in')
  });