import { handleErrors } from "./utils.js";

document.addEventListener("DOMContentLoaded", (e) => {
    const clapImgs = document.querySelectorAll(".icons__claps");

    clapImgs.forEach((clapImg) => {
        clapImg.addEventListener("click", (e) => responseClapping(clapImg));

    });
});

export function responseClapping(element) {
    let responseId = Number(element.dataset.responseId);
    if (element.dataset.value === "toBeClapped") {
        element.dataset.value = "unclap";
        element.src = "/images/clapped3.png";
        postResponseClap(responseId);
    } else if (element.dataset.value === "unclap") {
        element.dataset.value = "toBeClapped";
        element.src = "/images/clapping1.png";
        deleteResponseClap(responseId);
    } else {
        alert('Currently not signed in.');
    }
}

const postResponseClap = async (responseId) => {
    const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");

    const body = { userId, responseId };

    try {
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

        const responseJson = await res.json();;
        const numResponseClaps = responseJson.numClaps;

        const spanCount = document.querySelectorAll(`.icons__claps-count-${responseId}`);
        spanCount[0].innerHTML = numResponseClaps;

    } catch (err) {
        handleErrors(err);
    }
}

const deleteResponseClap = async (responseId) => {
    const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
    const body = { userId, responseId };

    try {
        const res = await fetch(`/api/responses/${responseId}/clap`, {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 401) {
            return;
        }
        const responseJson = await res.json();
        let numClaps = responseJson.numClaps;

        let spanCount = document.querySelectorAll(`.icons__claps-count-${responseId}`);

        spanCount[0].innerHTML = numClaps;

    } catch (err) {
        handleErrors(err);
    }


}
