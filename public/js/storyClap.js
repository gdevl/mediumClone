import { handleErrors } from "./utils.js";


document.addEventListener("DOMContentLoaded", () => {
  const clapImg = document.getElementById("claps__img");
  clapImg.addEventListener("click", () => isClapping(clapImg));
});

const postClap = async (storyId) => {
  const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
  const body = { userId, storyId };
  try {
    const res = await fetch(`/api/stories/${storyId}/clap`, {
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

const isClapping = (element) => {
  console.log("loggggging: ", element.dataset.value);
  if (element.dataset.value === 'toBeClapped') {
    element.dataset.value = 'unclap';
    postClap(element.dataset.storyId);
  } else if (element.dataset.value === 'unclap'){
    element.dataset.value = "toBeClapped";
    destroyClap(element.dataset.storyId);
  } else {
    alert('Currently not signed in.')
  }
};

const destroyClap = async (storyId) => {
  const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
  const body = { userId, storyId };
  try {
    const res = await fetch(`/api/stories/${storyId}/clap`, {
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
