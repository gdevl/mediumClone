// import { showSignUpBox, hideSignUpBox, showLogInBox, hideLogInBox } from './utils';
// import trashBin from '../images/trash_bin.svg';

//***************************** Global Variables ***********************************/

const responseTextArea = document.getElementById("responses-textarea");
const responseHeader = document.getElementById("new-response__header");
const responseFormBtn = document.getElementById("new-response-form__buttons");
const responseBackground = document.getElementById("responses-background");
const responsePanel = document.getElementById("responses-container");
const leftSidePanel = document.querySelector(".main__left-side-panel");
const url = window.location.pathname;
const storyId = url.match(/\d+$/)[0];

//***************************** Functions ******************************************/

const showCompactResponseForm = () => {
  responseTextArea.classList.add("form-content__text-area--sm");
  responseTextArea.classList.remove("form-content__text-area--lg");
  responseHeader.classList.add("hidden");
  responseFormBtn.classList.add("hidden");
};

const showFullResponseForm = () => {
  responseTextArea.classList.remove("form-content__text-area--sm");
  responseTextArea.classList.add("form-content__text-area--lg");
  responseHeader.classList.remove("hidden");
  responseFormBtn.classList.remove("hidden");
};

const showResponsePanel = () => {
  responseBackground.classList.remove("hidden");
  responsePanel.classList.add("slide-left");
};

const hideResponsePanel = () => {
  showCompactResponseForm();
  responseBackground.classList.add("hidden");
  responsePanel.classList.remove("slide-left");
};

const deleteResponse = id => {
  const response = document.getElementById(`response-${id}`);
  response.remove();
}

// const toggleRespondSubmitBtn = () => {
//     if (responseTextArea.value === '') {
//         document.querySelector('.')
//     }
// }

//***************************** DOM Manipulation ***********************************/

if (window.pageYOffset > 300) {
  leftSidePanel.style.opacity = 1;
} else {
  leftSidePanel.style.opacity = 0;
}

document.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    leftSidePanel.style.opacity = 1;
  } else {
    leftSidePanel.style.opacity = 0;
  }
});

document
  .getElementById("side-panel__responses-btn")
  .addEventListener("click", () => {
    showResponsePanel();
  });

document
  .getElementById("bottom-panel__responses-btn")
  .addEventListener("click", () => {
    showResponsePanel();
  });

document
  .querySelector(".form-container__new-response-form")
  .addEventListener("click", () => {
    if (responseTextArea.classList.value === "form-content__text-area--sm") {
      showFullResponseForm();
    }
  });

document
  .querySelector(".buttons__cancel")
  .addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showCompactResponseForm();
  });

document
  .getElementById("responses-background")
  .addEventListener("click", (event) => {
    event.stopPropagation();
    const targetId = event.target.id;

    if (
      targetId === "responses-background" ||
      targetId === "responses-close-btn" ||
      targetId === "responses-close-icon"
    )
      hideResponsePanel();
  });

responseTextArea.addEventListener("input", () => {
  const responseFormSubmitBtn = document.querySelector(".buttons__respond");
  responseTextArea.value === ""
    ? (responseFormSubmitBtn.disabled = true)
    : (responseFormSubmitBtn.disabled = false);
});

document
  .querySelector(".form-container__new-response-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = window.location.pathname;
    const storyId = url.match(/\d+$/)[0];
    const userId = localStorage.getItem("MEDIUM_CLONE_CURRENT_USER_ID");

    const responseContent = {
      content: responseTextArea.value,
      userId: userId,
      storyId: storyId,
    };

    try {
      const res = await fetch(`/api/stories/${storyId}/responses/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseContent),
      });

      if (!res.ok) {
        throw new Error(res);
      } else {
        const response = await res.json();

        responseTextArea.innerHTML = "";
        document.querySelector(".form-container__new-response-form").reset();
        responseFormBtn.setAttribute.disabled = true;
        showCompactResponseForm();
        const noResponses = document.querySelector(
          ".responses-display__no-responses"
        );
        if (noResponses) noResponses.classList.add("hidden");

        const responsesDisplay = document.createElement("div");
        responsesDisplay.classList.add("responses-display__container");

          const responseHeader = document.createElement("div");
          responseHeader.classList.add("container__response-header");
          responsesDisplay.appendChild(responseHeader);

            const responseAuthorInfo = document.createElement("div");
            responseAuthorInfo.classList.add("response-header__author-info")
            responseHeader.appendChild(responseAuthorInfo)
        
              const authorImgContainer = document.createElement("div");
              authorImgContainer.className = 'class="author-info__author';
              responseAuthorInfo.appendChild(authorImgContainer);

                const authorImg = document.createElement("img");
                authorImg.className = "author__image";
                authorImg.src = response.user.avatarUrl;
                authorImgContainer.appendChild(authorImg);

              const authorInfoContainer = document.createElement("div");
              authorInfoContainer.className = "author-info__container";
              responseAuthorInfo.appendChild(authorInfoContainer);

                const authorName = document.createElement("a");
                authorName.className = "container__author-name";
                authorName.href = `/users/${response.user.username}`;
                authorName.innerHTML = `${response.user.firstName} ${response.user.lastName}`;
                authorInfoContainer.appendChild(authorName);

                const date = document.createElement("div");
                date.className = "container__date";
                date.innerHTML = response.date;
                authorInfoContainer.appendChild(date);
              
            const trashBinContainer = document.createElement("div");
            trashBinContainer.className = "response-header__trash-bin-container";
            responseHeader.appendChild(trashBinContainer);
            
              const confirmDelete = document.createElement("div");
              confirmDelete.className = "trash-bin-container__confirm-delete";
              confirmDelete.classList.add("hidden");
              confirmDelete.id = `confirmDelete-${response.newResponse.id}`
              confirmDelete.innerHTML = "Confirm Delete"
              trashBinContainer.appendChild(confirmDelete);
              
            
              const trashBinIcon = document.createElement("img");
              trashBinIcon.src = '../images/trash_bin.svg';
              trashBinIcon.className = "trash-bin-container__trash-bin";
              trashBinIcon.classList.add("new-trash-bin");
              trashBinIcon.id = `trashBin-${response.newResponse.id}`;
              trashBinContainer.appendChild(trashBinIcon);
              

          const content = document.createElement("div");
          content.className = "container__content";
          content.innerHTML = response.newResponse.content;
          responsesDisplay.appendChild(content);

          const iconsContainer = document.createElement("div");
          iconsContainer.className = "container__icons";
          responsesDisplay.appendChild(iconsContainer);

        const clapsImg = document.createElement("img");
        clapsImg.className = "claps__img";
        clapsImg.id = "claps__img";
        clapsImg.dataset.value = response.isClapped;
        clapsImg.dataset.storyId = response.id;

        if (response.imageClapped) {
          clapsImg.src = `/images/clapped3.png`;
        } else {
          clapsImg.src = `/images/clapping1.png`;
        }

        iconsContainer.appendChild(clapsImg);

        const clapCount = document.createElement("div");
        if (response.newResponse.numClaps) {
          clapCount.innerHTML = response.newResponse.numClaps;
        }
        
        iconsContainer.appendChild(clapCount);

        document.getElementById("story-responses").prepend(responsesDisplay);

        const responseCountContainer = document.querySelector(
          ".responses__responses-count"
        );
        let responseCount = responseCountContainer.innerHTML;
        responseCount = parseInt(responseCount);
        responseCount++;
        responseCountContainer.innerHTML = responseCount;
      }
    } catch (err) {
      console.error(err);
    }
  });


document
  .querySelectorAll('.trash-bin-container__trash-bin')
  .forEach(trashBin => {
    trashBin.addEventListener('click', (e) => {
      const id = e.target.id.slice(e.target.id.indexOf('-') + 1);
      const confirmDelete = document.getElementById(`confirmDelete-${id}`);
      confirmDelete.classList.remove("hidden")
    });
  });
  
  
  document
  .querySelectorAll('.trash-bin-container__confirm-delete')
  .forEach(confirmDelete => {
    confirmDelete.addEventListener('click', async e => {
      const id = e.target.id.slice(e.target.id.indexOf('-') + 1);
      console.log('confirm delete: ', id)
      const res = await fetch(`/api/stories/${storyId}/responses/${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        const response = document.getElementById(`response-${id}`);
        response.remove();
        document
          .querySelectorAll('.responses__responses-count')
          .forEach(countDiv => {
            let count = countDiv.innerHTML;
            count = parseInt(count, 10);
            count--;
            countDiv.innerHTML = count;
          });
      }
    });
  });
  
  
  
document.querySelector(".icons__claps");
