import { handleErrors } from "./utils.js";

const userInfoForm = document.querySelector(".new-story-form");

userInfoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(userInfoForm);

  const username = formData.get("username");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const email = formData.get("email");
  const bio = formData.get("bio");
  const avatarUrl = formData.get("avatar-url");

  const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");

  const body = { username, firstName, lastName, email, bio, avatarUrl, userId };

  try {
    const res = await fetch("/api/users/update", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      window.location.href = "/index";
      return;
    }
    window.location.href = "/";
  } catch (err) {
    handleErrors(err);
  }
});
