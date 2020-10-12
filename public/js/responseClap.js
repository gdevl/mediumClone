document.addEventListener("DOMContentLoaded", (e) => {
    const clapImgs = document.querySelectorAll(".icons_claps");
    console.log(clapImgs);
    clapImgs.forEach((clapImg) => {
        clapImg.addEventListener("click", (e) => responseClapping(clapImg));

    });
});

const responseClapping = (element) => {
    console.log("ELEMENT: ", element);
    console.log(element.dataset.value);
    console.log(element.dataset.responseId);
}
