document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nav-bar__sign-up-btn').addEventListener('click', showSignUpBox)
    document.querySelector('.nav-bar__log-in-btn').addEventListener('click', showLogInBox)
    
    document.querySelector('.close__sign-up').addEventListener('click', hideSignUpBox)
    document.querySelector('.close__log-in').addEventListener('click', hideLogInBox)
    
        
    
})


const showSignUpBox = () => {
    document.querySelector('.center-box__sign-up-errors-container').innerHTML = '';
    document.querySelector('.sign-up-overlay').classList.remove('hidden');
}

const hideSignUpBox = () => {
    document.querySelector('.sign-up-overlay').classList.add('hidden');
}

const showLogInBox = () => {
    document.querySelector('.center-box__log-in-errors-container').innerHTML = '';
    document.querySelector('.log-in-overlay').classList.remove('hidden')
}

const hideLogInBox = () => {
    console.log('hide log in')
    document.querySelector('.log-in-overlay').classList.add('hidden')
}