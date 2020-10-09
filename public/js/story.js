
document.addEventListener('scroll', () => {
    const leftSidePanel = document.querySelector('.main__left-side-panel');
    
    if (window.pageYOffset > 300) {
        leftSidePanel.style.opacity = 1;
    }
    else {
        leftSidePanel.style.opacity = 0;
    }
});

const url = window.location.href;
const storyId = url.match('\\d+$')[0];


