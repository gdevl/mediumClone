import { handleErrors } from "./utils.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const button = document.getElementById('follow')
  button.addEventListener('click', postFollow(button.value));
})

const postFollow = async (val) => {
  const followedId = val;
  const followerId = localStorage.getItem('MEDIUM_CLONE_CURRENT_USER_ID')
  const body = { followerId, followedId }
  try {
    const res = await fetch('/api/follow', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          'MEDIUM_CLONE_ACCESS_TOKEN')}`
      }
    });
    if (res.status === 401) {
      return;
    }
  } catch (err) {
    handleErrors(err);
  }
}