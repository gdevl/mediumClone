document.addEventListener("DOMContentLoaded", (e) => {
    const clapImgs = document.querySelectorAll(".icons_claps");

    clapImgs.forEach((clapImg) => {
        console.log(clapImg);
        clapImg.addEventListener("click", (e) => responseClapping(clapImg));

    });
});

const responseClapping = (element) => {
    console.log("ELEMENT: ", element);
    console.log(element.dataset.value);
    console.log(element.dataset.responseId);
    if (element.dataset.value === "toBeClapped") {
        element.dataset.value = "unclap";
        element.src = "/images/clapped3.png";
        postResponseClap(element.dataset.responseId);
    } else if (element.dataset.value === "unclap") {
        element.dataset.value = "toBeClapped";
        element.src = "/images/clapping1.png";
        deleteResponseClap(element.dataset.responseId);
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

    const responseJson = await res.json();
    // console.log("RESPONSEJSON: ", responseJson);
    const numResponseClaps = responseJson.numClaps;
    // console.log(numResponseClaps);
    const spanCount = document.querySelectorAll(`.icons__claps-count-${responseId}`);
    // console.log(spanCount);
    spanCount[0].innerHTML = numResponseClaps;
}

const deleteResponseClap = async (responseId) => {
    const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");
    const body = { userId, responseId };

    const res = await fetch("/api/responses/:id(\\d+)/clap", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.status === 401) {
        return;
    }
    let responseJson = await res.json();
    let numClaps = res.numClaps;

    let spanCount = document.querySelectorAll(`.icons__claps-count-${responseId}`);
    spanCount[0].innerHTML = numClaps;


}
