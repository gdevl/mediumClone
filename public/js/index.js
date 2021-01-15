document.addEventListener("DOMContentLoaded", () => {
  const signUpBtn = document.querySelector(".nav-bar__sign-up-btn");
  if (signUpBtn) {
    signUpBtn.addEventListener("click", showSignUpBox);
  }

  const logInBtn = document.querySelector(".nav-bar__log-in-btn");
  if (logInBtn) {
    logInBtn.addEventListener("click", showLogInBox);
  }

  const closeSignUpBtn = document.querySelector(".close__sign-up");
  if (closeSignUpBtn) {
    closeSignUpBtn.addEventListener("click", hideSignUpBox);
  }

  const closeLogInBtn = document.querySelector(".close__log-in");
  if (closeLogInBtn) {
    closeLogInBtn.addEventListener("click", hideLogInBox);
  }

  const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
  const userBtn = document.querySelector(".nav-bar__user-avatar__initials");
  if (userId) {
    userBtn.addEventListener("click", () => {
      window.location.href = `/users/${userId}`;
    });
  }

  const userEditBtn = document.querySelector(".findUserPage");
  if (userId) {
    userEditBtn.addEventListener("click", () => {
      window.location.href = `/users/${userId}/user-info`;
    })
  }
});

export const showSignUpBox = () => {
  document.querySelector(".center-box__sign-up-errors-container").innerHTML =
    "";
  document.querySelector(".sign-up-overlay").classList.remove("hidden");
};

export const hideSignUpBox = () => {
  document.querySelector(".sign-up-overlay").classList.add("hidden");
};

export const showLogInBox = () => {
  document.querySelector(".center-box__log-in-errors-container").innerHTML = "";
  document.querySelector(".log-in-overlay").classList.remove("hidden");
};

export const hideLogInBox = () => {
  document.querySelector(".log-in-overlay").classList.add("hidden");
};
