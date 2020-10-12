document.addEventListener("DOMContentLoaded", (e) => {
    const clapImgs = document.querySelectorAll(".icons_claps");
    console.log(clapImgs);
    clapImgs.forEach((clapImg) => {
        clapImg.addEventListener("click", (e) => responseClapping(clapImg));

    });
});

const responseClapping = (element) => {
    // console.log("ELEMENT: ", element);
    // console.log(element.dataset.value);
    // console.log(element.dataset.responseId);
    if (element.dataset.value === "toBeClapped") {
        element.dataset.value = "unclap";
        element.src = "/images/clapped3.png";
        postResponseClap(element.dataset.responseId);
    } else if (element.dataset.value === "unclap") {
        element.dataset.value = "toBeClapped";
        element.src = "/images/clapping1.png";
        removeResponseClap(element.dataset.responseId);
    } else {
        alert('Currently not signed in.');
    }
}

const postResponseClap = async (responseId) => {
    const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
    const body = { userId, responseId };

    const res = await fetch(`/api/responses/${responseId}/clap`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status === 401) {
        return;
    };

}
