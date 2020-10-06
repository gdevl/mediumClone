document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector('.nav-bar__sign-up-btn')  //TODO Get real class name
        .addEventListener('click', () => {
            console.log('Sign Up Clicked');
            showSignUpBox()
        })
    
    document
        .querySelector('.close-overlay')
        .addEventListener('click', hideSignUpBox)
    
    console.log('DOM Loaded...')
    
})


const showSignUpBox = () => {
    document
        .querySelector('.sign-up-overlay')
        .classList.remove('hidden')
}

const hideSignUpBox = () => {
    document
        .querySelector('.sign-up-overlay')
        .classList.add('hidden')
}