import { handleErrors } from "./utils.js";

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById('follow').addEventListener('click', postFollow);
})

const postFollow = async () => {
  const followedId = this.value;
  const followerId = localStorage.getItem('MEDIUM_CLONE_CURRENT_USER_ID')
  const body = { followerId, followedId }
  try {
    const res = await fetch('/api/stories', {
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