// Variables
let wheelRotation = 0;

export function initializeWheel({ confirmButton }) {
  const zodiacWheel = document.querySelector(".zodiac-wheel");

  if (!zodiacWheel) {
    return;
  }

  confirmButton.addEventListener("click", () => {
    confirmButton.disabled = true;
    wheelRotation += 360 * 3;
    zodiacWheel.style.transform = `rotate(${wheelRotation}deg)`;
  });

  zodiacWheel.addEventListener("transitionend", (event) => {
    if (event.propertyName === "transform") {
      confirmButton.disabled = false;
    }
  });
}
