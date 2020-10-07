import { handleErrors } from "./utils.js";


const createStoryForm = document.querySelector('.new-story-form');

createStoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createStoryForm);

    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const content = formData.get('content');
    const imageUrl = formData.get('imageUrl');

    const userId = localStorage.getItem('MEDIUM_CLONE_CURRENT_USER_ID');

    const body = { title, subtitle, content, imageUrl, userId };

    try {
        const res =  await fetch('/stories', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(
                    'MEDIUM_CLONE_ACCESS_TOKEN'
                )}`
            }
        });

        console.log(res);
        if (res.status === 401) {
            window.location.href = '/index';
            return;
        }
        window.location.href = '/'; // story-view page not created yet
    } catch (err) {
        handleErrors(err);
    }

})
