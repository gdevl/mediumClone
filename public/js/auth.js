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
    console.log(res)
    if (!res.ok) throw res;
  }
  catch (err) {
    console.error(err);
  }
})


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const user = { username: formData.username, password: formData.password };
  const res = await fetch(`/api/users/log-in`, {
    method: 'Post',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  });
  
})