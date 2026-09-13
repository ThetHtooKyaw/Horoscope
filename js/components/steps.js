// Variables
let currentStep = 1;
const totalSteps = 3;

export function changeStep(direction) {
  let nextStep = currentStep + direction;

  if (nextStep < 1 || nextStep > totalSteps) return;

  const currentElement = document.getElementById(`step-${currentStep}`);
  const nextElement = document.getElementById(`step-${nextStep}`);

  currentElement.classList.remove("animate-fade-up");
  currentElement.classList.add("display-none");

  nextElement.classList.remove("display-none");

  if (direction === 1) {
    nextElement.classList.add("animate-fade-up");
  } else {
    nextElement.classList.add("animate-slide-reveal");
  }

  currentStep = nextStep;
}
