window.addEventListener("DOMContentLoaded", () => {
  console.log("The DOM is loaded");
  document
    .getElementById("signupSubmitButton")
    .addEventListener("submit", getSignupFormData);
});

const getSignupFormData = () => {
  const signupForm = document.getElementById("signupForm");
  const formData = new FormData(signupForm);
  console.log(`formdata: ${formData}`);
};
