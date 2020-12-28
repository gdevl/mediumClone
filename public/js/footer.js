const brian = document.getElementById("fbl_brian_button");
const brianBox = document.getElementById("fbl_brian_box");

if (brian && brianBox) {
  brian.addEventListener("click", (e) => {
    e.preventDefault();
    if (brianBox.classList.contains("hidden")) {
      showBrian();
    } else {
      hideBrian();
    }
  });
}

export const showBrian = () => {
  document.getElementById("fbl_brian_box").classList.remove("hidden");
};

export const hideBrian = () => {
  document.getElementById("fbl_brian_box").classList.add("hidden");
};

const david = document.getElementById("fbl_david_button");
const davidBox = document.getElementById("fbl_david_box");

if (david && davidBox) {
  david.addEventListener("click", (e) => {
    e.preventDefault();
    if (davidBox.classList.contains("hidden")) {
      showDavid();
    } else {
      hideDavid();
    }
  });
}

export const showDavid = () => {
  document.getElementById("fbl_david_box").classList.remove("hidden");
};

export const hideDavid = () => {
  document.getElementById("fbl_david_box").classList.add("hidden");
};

const gabriel = document.getElementById("fbl_gabriel_button");
const gabrielBox = document.getElementById("fbl_gabriel_box");

if (gabriel && gabrielBox) {
  gabriel.addEventListener("click", (e) => {
    e.preventDefault();
    if (gabrielBox.classList.contains("hidden")) {
      showGabriel();
    } else {
      hideGabriel();
    }
  });
}

export const showGabriel = () => {
  document.getElementById("fbl_gabriel_box").classList.remove("hidden");
};

export const hideGabriel = () => {
  document.getElementById("fbl_gabriel_box").classList.add("hidden");
};

const mark = document.getElementById("fbl_mark_button");
const markBox = document.getElementById("fbl_mark_box");

if (mark && markBox) {
  mark.addEventListener("click", (e) => {
    e.preventDefault();
    if (markBox.classList.contains("hidden")) {
      showMark();
    } else {
      hideMark();
    }
  });
}

export const showMark = () => {
  document.getElementById("fbl_mark_box").classList.remove("hidden");
};

export const hideMark = () => {
  document.getElementById("fbl_mark_box").classList.add("hidden");
};
