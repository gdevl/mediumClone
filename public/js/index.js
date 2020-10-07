document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector('.nav-bar__sign-up-btn')  //TODO Get real class name
        .addEventListener('click', showSignUpBox)
    
    document
        .querySelector('.close-sign-up')
        .addEventListener('click', hideSignUpBox)
    
    document
        .querySelector('.nav-bar__log-in-btn')
        .addEventListener('click', showLogInBox)
        
    document
        .querySelector('.close-log-in')
        .addEventListener('click', hideLogInBox)
    
})


const showSignUpBox = () => {
    document
        .querySelectorAll('.center-box__sign-up-errors-container')
        .map(container => container.innerHTML = '');
    document
        .querySelector('.sign-up-overlay')
        .classList.remove('hidden')
}

const hideSignUpBox = () => {
    document
        .querySelector('.sign-up-overlay')
        .classList.add('hidden')
}

const showLogInBox = () => {
    document
        .querySelector('.log-in-overlay')
        .classList.remove('hidden')
}

const hideLogInBox = () => {
    console.log('hide log in')
    document
        .querySelector('.log-in-overlay')
        .classList.add('hidden')
}