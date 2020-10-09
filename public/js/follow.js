import { handleErrors } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("follow");
  button.addEventListener("click", () => isFollowing(button));
});

const postFollow = async (val) => {
  const followedId = val;
  const followerId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
  const body = { followerId, followedId };
  try {
    const res = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", await res.json());
    if (res.status === 401) {
      return;
    }
  } catch (err) {
    handleErrors(err);
  }
};

const isFollowing = (element) => {
  console.log("element.innerHTML", element.innerHTML);
  if (element.innerHTML === "Follow") {
    element.innerHTML = "Following";
    postFollow(element.value);
  } else {
    element.innerHTML = "Follow";
    destroyFollow(element.value);
  }
};

const destroyFollow = async (val) => {
  const followedId = val;
  const followerId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
  const body = { followerId, followedId };
  try {
    const res = await fetch("/api/follow", {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 401) {
      return;
    }
  } catch (err) {
    handleErrors(err);
  }
};
