import { handleErrors } from "./utils.js";

const followBtn = document.getElementById("follow");

document.addEventListener("DOMContentLoaded", () => {
  if (followBtn) {
    followBtn.addEventListener("click", () => isFollowing(followBtn));
  }
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
    if (res.status === 401) {
      return;
    }
  } catch (err) {
    handleErrors(err);
  }
};

const isFollowing = (element) => {
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
