const loader = document.getElementById("loader");

export function initializeLoader() {
  window.addEventListener("load", () => {
    loader.classList.add("is-hidden");

    setTimeout(() => {
      loader.remove();
    }, 300);
  });
}
