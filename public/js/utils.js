export const handleErrors = async (err, overlay) => {
    if (err.status >= 400 && err.status < 600) {
        const errorRes = await err.json(); //.center-box__log-in-errors-container
        console.log(errorRes);
        const errorsContainer = document.querySelector(`.center-box__${overlay}-errors-container`);
        console.log(errorsContainer);
        let errorsHtml = [
            `
                <div class="errors">
                    Something went wrong. Please try again.
                </div>
            `,
        ];
        const { errors } = errorRes;
        console.log(errors);
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map((message) =>
                `
                    <div class="errors">
                        ${message}
                    </div>
                `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    }
    else {
        alert('Something went wrong. Please check your internet connection and try again.');
    };
}
