//***************************** Global Variables ***********************************/

const responseTextArea = document.getElementById('responses-textarea');
const responseHeader = document.getElementById('new-response__header');
const responseFormBtn = document.getElementById('new-response-form__buttons');
const responseBackground = document.getElementById('responses-background');
const responsePanel = document.getElementById('responses-container');

//***************************** Functions ******************************************/

const showCompactResponseForm = () => {
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

document.addEventListener('scroll', () => {
    const leftSidePanel = document.querySelector('.main__left-side-panel');
    
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
                const div = document.createElement('div');
                div.classList.add('responses-display__container');
                
                const response = await res.json();
                console.log('RESPONSE: ', response)
                
                const userRes = await fetch(`/users/${userId}`);
                const user = await userRes.json();
                console.log("user", user)
                
                response.User = user;
                
                
                
                console.log(response.date)
                
                div.innerHTML = 
                
                    `<div class="container__response-info">
                        <div class="response-info__author">
                            <img class="author__image" src=${response.User.avatarUrl}/>
                        </div>
                        <div class="response-info__container">
                            <div class="container__author-name">
                                ${response.User.firstName} ${response.User.lastName}
                            </div>
                            <div class="container__date"> ${response.date}
                        </div>
                    <div class="container__content">
                        ${response.content}
                    </div>
                    <div class="container__icons">
                        <img class="icon__claps" src="/images/clapping1.png"/>
                        <div class="icons__clap-count>${response.numClaps}</div>
                    </div>
                    </div>`;
                
                
                document.getElementById('story-responses').prepend(div)
            }
        }
        catch (err) {
            console.error(err)
        }
})



