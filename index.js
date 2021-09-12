const primaryColorOptions = ["blue", "red", "green", "orange", "black"];

function updateUrlSearchParams(param, value) {
  const url = new URL(window.location.href);

  url.searchParams.set(param, value);

  window.history.replaceState(null, null, url);
}

function updateActiveProductPreviews(selectedIndex) {
  const gradients = document.querySelectorAll(".gradient");

  const currentBackground = document.querySelectorAll(".gradient--background");
  currentBackground.length > 0 &&
    currentBackground[0].classList.remove("gradient--background");

  const nextBackground = document.querySelectorAll(".gradient--active");
  if (nextBackground.length > 0) {
    nextBackground[0].classList.remove("gradient--active");
    nextBackground[0].classList.add("gradient--background");
  }

  gradients[selectedIndex].classList.add("gradient--active");

  document.querySelectorAll(".product").forEach((element, index) => {
    element.classList.remove("product--active");

    if (index === selectedIndex) {
      element.classList.add("product--active");
      document.documentElement.style.setProperty(
        "--primary",
        `var(--${primaryColorOptions[index]}-primary)`
      );
    }
  });
}

function setPropOption(property, matchingIndex) {
  const elements = document.querySelectorAll(`.${property}-option`);

  elements.forEach((element, index) => {
    element.classList.remove("option--active");

    if (index === matchingIndex) {
      element.classList.add("option--active");
      property === "color" && updateActiveProductPreviews(index);
    }
  });
}

function getOptionsFromUrl() {
  const url = new URL(window.location.href).search;

  const color = url.match(/color=(\w+)(?:\&|$)/)?.[1];
  const size = url.match(/size=(\w+)(?:\&|$)/)?.[1];

  if (color) {
    const colorElements = document.querySelectorAll(`.color-option`);
    const matchingColorIndex = [...colorElements].indexOf(
      document.querySelectorAll(`.option-${color}`)?.[0]
    );

    setPropOption("color", matchingColorIndex);
  }

  if (size) {
    const sizeElements = document.querySelectorAll(`.size-option`);
    const matchingSizeIndex = [...sizeElements].indexOf(
      document.querySelectorAll(`.option-${size}`)?.[0]
    );

    setPropOption("size", matchingSizeIndex);
  }
}

document.querySelectorAll(".color-option").forEach(function (i, index) {
  i.addEventListener("click", function (e) {
    const value = e.target.classList[1].slice(7);
    setPropOption("color", index);
    updateUrlSearchParams("color", value);
  });
});

document.querySelectorAll(".size-option").forEach(function (i, index) {
  i.addEventListener("click", function (e) {
    const value = e.target.textContent;
    setPropOption("size", index);

    updateUrlSearchParams("size", value);
  });
});

getOptionsFromUrl();
