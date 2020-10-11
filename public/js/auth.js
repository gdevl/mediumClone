import { handleErrors } from "./utils.js";

/*********************************************************/
//* Function to reduce repetitive code
const fetchPostUserAndStoreToken = async (user, overlay) => {
  try {
    const res = await fetch(`/api/users/${overlay}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw res;

    // code to store token in localStorage;

    const { id } = await res.json();
    localStorage.setItem("MEDIUM_CLONE_CURRENT_USER_ID", id);

    document.querySelector(`.${overlay}-overlay`).classList.add("hidden");
    window.location = "/";
  } catch (err) {
    // only demo log in works
    console.log(err);
    handleErrors(err, overlay);
  }
};

/*********************************************************/
//* Form Submissions

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const newUser = {
    username: formData.get(`username`),
    email: formData.get(`email`),
    password: formData.get(`password`),
    confirmPassword: formData.get(`confirmPassword`),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  };
  fetchPostUserAndStoreToken(newUser, "sign-up");
});

const loginForm = document.querySelector(".center__log-in-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  fetchPostUserAndStoreToken(user, "log-in");
});

/*********************************************************/
//* Demo Login Functionality

const fetchAndClose = (overlay) => {
  const demoUser = { username: "demologin", password: "Password1!" };
  fetchPostUserAndStoreToken(demoUser, "log-in");
  document.querySelector(`.${overlay}-overlay`).classList.add("hidden");
};

document
  .querySelector(".sign-up-form__demo-login")
  .addEventListener("click", () => {
    fetchAndClose("sign-up");
  });

document
  .querySelector(".log-in-form__demo-login")
  .addEventListener("click", () => {
    fetchAndClose("log-in");
  });

/*********************************************************/
//* Logout Functionality

const logOutBtn = document.querySelector(".nav-bar__log-out-btn");

if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    logUserOut();
  });
}

const logUserOut = async () => {
  try {
    const res = await fetch("/api/users/log-out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 401) {
      return;
    }
    window.location.reload();
  } catch (err) {
    handleErrors(err);
  }
};
