import { handleErrors } from "./utils.js";


document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("clapButton");
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
        Authorization: `Bearer ${localStorage.getItem(
          "MEDIUM_CLONE_ACCESS_TOKEN"
        )}`,
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

const isClapping = (element) => {
  console.log("element.innerHTML", element.innerHTML);
  if (element.value === 'clap') {
    element.value = 'unclap';
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
        Authorization: `Bearer ${localStorage.getItem(
          "MEDIUM_CLONE_ACCESS_TOKEN"
        )}`,
      },
    });
    if (res.status === 401) {
      return;
    }
  } catch (err) {
    handleErrors(err);
  }
};
