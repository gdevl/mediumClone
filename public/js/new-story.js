import { handleStoryErrors } from "./utils.js";

const createStoryForm = document.querySelector(".new-story-form");

createStoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(createStoryForm);

  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const content = formData.get("content");
  const imageUrl = formData.get("imageUrl");

  const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");

  const body = { title, subtitle, content, imageUrl, userId };


  const res = await fetch("/api/stories", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem(
      //   "MEDIUM_CLONE_ACCESS_TOKEN"
      // )}`,
    },
  });

  if (res.status === 401) {
    window.location.href = "/index";
    return;
  }
  if (res.status === 400) {
    handleStoryErrors(res);
  }
  const newStory = await res.json()
  console.log(newStory)
  window.location.href = `/story/${newStory.story.id}`;
});
