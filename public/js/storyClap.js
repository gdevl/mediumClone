import { handleErrors } from "./utils.js";


document.addEventListener("DOMContentLoaded", () => {
  const clapImg = document.querySelectorAll(".claps__img");

  clapImg.forEach((img) => {
    img.addEventListener("click", () => isClapping(clapImg));
  })
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

    let responseJson = await res.json();
    let numClaps = responseJson.numClaps;
    let spanCount = document.querySelectorAll('.claps__claps-count');
    spanCount.forEach((ele) => {
      ele.innerHTML = numClaps;
    })
  } catch (err) {
    handleErrors(err);
  }
};

const isClapping = (elements) => {
  if (elements[0].dataset.value === 'toBeClapped') {
    elements.forEach((img) => {
      img.dataset.value = 'unclap';
      img.src = "/images/clapped3.png";
    })
    postClap(elements[0].dataset.storyId);
  } else if (elements[0].dataset.value === 'unclap'){
        elements.forEach((img) => {
          img.dataset.value = "toBeClapped";
          img.src = "/images/clapping1.png";
        })
    destroyClap(elements[0].dataset.storyId);
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
    let responseJson = await res.json();
    let numClaps = responseJson.numClaps;
    let spanCount = document.querySelectorAll('.claps__claps-count');
    spanCount.forEach((ele) => {
      ele.innerHTML = numClaps;
    })
  } catch (err) {
    handleErrors(err);
  }
};
