export const handleErrors = async (err, overlay) => {
    if (err.status >= 400 && err.status < 600) {
        const errorRes = await err.json(); //.center-box__log-in-errors-container
        const errorsContainer = document.querySelector(`.center-box__${overlay}-errors-container`);
        let errorsHtml = [
            `
                <li class="errors">
                    Something went wrong. Please try again.
                </li>
            `,
        ];
        const { errors } = errorRes;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map((message) =>
                `
                    <li class="auth-errors-${overlay}">
                        ${message}
                    </li>
                `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    }
    else {
        alert('Something went wrong. Please check your internet connection and try again.');
    };
}

export const handleStoryErrors = async (err) => {
    const errorRes = await err.json();
    console.log("ERROR RES", errorRes);
    const { errors } = errorRes;
    console.log("ERRORRRS", errors);
    const errorsContainer = document.querySelector('.story-errors-list');
    let errorsHtml = [];
    if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map((message) =>
            `
            <li class="story-creation-errors">
                ${message}
            </li>
            `
        )
    };
    errorsContainer.innerHTML = errorsHtml.join("");
    for (let errorIdx in errors) {
        let error = errors[errorIdx]
        if (error.includes("title")) {
            const titleInput = document.querySelector('.storytitle-input');
            titleInput.classList.add("red-errorbox");
        }
        if (error.includes("subtitle")) {
            const titleInput = document.querySelector('.storysubtitle-input');
            titleInput.classList.add("red-errorbox");
        }
        if (error.includes("content")) {
            const titleInput = document.querySelector('.storycontent-input');
            titleInput.classList.add("red-errorbox");
        }
    }
}
