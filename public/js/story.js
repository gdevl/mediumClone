

//***************************** Global Variables ***********************************/

const responseTextArea = document.getElementById('responses-textarea');
const responseHeader = document.getElementById('new-response__header');
const responseFormBtn = document.getElementById('new-response-form__buttons');
const responseBackground = document.getElementById('responses-background');
const responsePanel = document.getElementById('responses-container');
const leftSidePanel = document.querySelector('.main__left-side-panel');

//***************************** Functions ******************************************/

const showCompactResponseForm = () => {
    console.log('Compact Click')
    responseTextArea.classList.add('form-content__text-area--sm');
    responseTextArea.classList.remove('form-content__text-area--lg');
    responseHeader.classList.add('hidden');
    responseFormBtn.classList.add('hidden');
}

const showFullResponseForm = () => {
    responseTextArea.classList.remove('form-content__text-area--sm');
    responseTextArea.classList.add('form-content__text-area--lg');
    responseHeader.classList.remove('hidden');
    responseFormBtn.classList.remove('hidden');
}

const showResponsePanel = () => {
    responseBackground.classList.remove('hidden');
    responsePanel.classList.add('slide-left');
}

const hideResponsePanel = () => {
    showCompactResponseForm();
    responseBackground.classList.add('hidden');
    responsePanel.classList.remove('slide-left');
}

const toggleRespondSubmitBtn = () => {
    if (responseTextArea.value === '') {
        document.querySelector('.')
    }
}

//***************************** DOM Manipulation ***********************************/

if (window.pageYOffset > 300) {
    leftSidePanel.style.opacity = 1;
}
else {
    leftSidePanel.style.opacity = 0;
}

document.addEventListener('scroll', () => {

    if (window.pageYOffset > 300) {
        leftSidePanel.style.opacity = 1;
    }
    else {
        leftSidePanel.style.opacity = 0;
    }
});

document
    .querySelector('.responses__icon')
    .addEventListener('click', () => {
        showResponsePanel()
})

document
    .querySelector('.form-container__new-response-form')
    .addEventListener('click', () => {
        if (responseTextArea.classList.value === 'form-content__text-area--sm') {
            showFullResponseForm();
        }
})

document
    .querySelector('.buttons__cancel')
    .addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showCompactResponseForm();
})

document
    .getElementById('responses-background')
    .addEventListener('click', (event) => {
        event.stopPropagation();
        const targetId = event.target.id

        if (targetId === 'responses-background' ||
            targetId === 'responses-close-btn' ||
            targetId === 'responses-close-icon'
            ) hideResponsePanel()
})


responseTextArea.addEventListener('input', () => {
    const responseFormSubmitBtn = document.querySelector('.buttons__respond');
    responseTextArea.value === ''  ?  responseFormSubmitBtn.disabled = true  :  responseFormSubmitBtn.disabled = false;
})


document
    .querySelector('.form-container__new-response-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault();

        const url = window.location.pathname;
        const userId = localStorage.getItem('MEDIUM_CLONE_CURRENT_USER_ID');
        const storyId = url.match(/\d+$/)[0];
        const responseContent = { content: responseTextArea.value, userId: userId, storyId: storyId };

        try {
            const res = await fetch(`/api/stories/${storyId}/responses/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(responseContent)
            });

            if (!res.ok) {
                throw new Error(res)
            }
            else {
                const response = await res.json();

                responseTextArea.innerHTML = '';
                document.querySelector('.form-container__new-response-form').reset();
                responseFormBtn.setAttribute.disabled = true;
                showCompactResponseForm();
                document.querySelector('.responses-display__no-responses').classList.add('hidden');


                const responsesDisplay = document.createElement('div');
                responsesDisplay.classList.add('responses-display__container');

                    const responseInfo = document.createElement('div');
                    responseInfo.classList.add('container__response-info');
                    responsesDisplay.appendChild(responseInfo)

                        const authorImgContainer = document.createElement('div');
                        authorImgContainer.className = 'class="response-info__author';
                        responseInfo.appendChild(authorImgContainer);

                            const authorImg = document.createElement('img');
                            authorImg.className = 'author__image';
                            authorImg.src = response.user.avatarUrl;
                            authorImgContainer.appendChild(authorImg);

                        const responseInfoContainer = document.createElement('div');
                        responseInfoContainer.className = 'response-info__container';
                        responseInfo.appendChild(responseInfoContainer);

                            const authorName = document.createElement('a')
                            authorName.className = 'container__author-name';
                            authorName.href = `/users/${response.user.username}`;
                            authorName.innerHTML = `${response.user.firstName} ${response.user.lastName}`
                            responseInfoContainer.appendChild(authorName);

                            const date = document.createElement('div');
                            date.className = 'container__date';
                            date.innerHTML = response.date;
                            responseInfoContainer.appendChild(date);

                    const content = document.createElement('div');
                    content.className = 'container__content';
                    content.innerHTML = response.newResponse.content;
                    responsesDisplay.appendChild(content);

                    const iconsContainer = document.createElement('div');
                    iconsContainer.className = 'container__icons';
                    responsesDisplay.appendChild(iconsContainer);


            const clapsImg = document.createElement('img');
            clapsImg.className = 'claps__img';
            clapsImg.id = 'claps__img';
            clapsImg.dataset.value = response.isClapped;
            clapsImg.dataset.storyId = response.id;

            if (response.imageClapped) {
                clapsImg.src = `/images/clapped3.png`;
            }
            else {
                clapsImg.src = `/images/clapping1.png`;
            }

            iconsContainer.appendChild(clapsImg);

            const clapCount = document.createElement('div');
            if (response.newResponse.numClaps) {
                clapCount.innerHTML = response.newResponse.numClaps;
            }
            // else {
            //     clapCount.innerHTML = '0';
            // }
            iconsContainer.appendChild(clapCount);


            document.getElementById('story-responses').prepend(responsesDisplay);
}
}
        catch (err) {
            console.error(err)
        }
})

document.querySelector(".icons__claps")
