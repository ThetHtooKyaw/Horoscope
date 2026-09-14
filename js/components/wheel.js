import { zodiacList, zodiacWheelItem } from "../../model/zodiac_model.js";

// Variables
let wheelRotation = 0;
let lastRotation = 0;

const zodiacWheel = document.querySelector(".zodiac-wheel");
const degreesPerSign = 360 / 12;
const fullSpins = 360 * 3;

export function spinWheel() {
  return animateWheelToRotation({ rotation: fullSpins });
}

export function spinBetweenSigns({ month }) {
  const boundaryIndex = (3 - month + 12) % 12;
  const boundaryAngle = boundaryIndex * degreesPerSign;
  const alignmentAngle = 360 - boundaryAngle;

  return animateWheelToRotation({ rotation: fullSpins + alignmentAngle });
}

export function spinToSign({ month, day }) {
  const zodiacSign = getZodiacSign({ month, day });

  if (!zodiacSign) {
    return Promise.resolve();
  }

  const signIndex = zodiacWheelItem.indexOf(zodiacSign.name);
  const signCenterAngle = signIndex * degreesPerSign + 15;
  const targetRotation = (360 - signCenterAngle) % 360;
  const remainingRotation = getRotationDifference(targetRotation);

  return animateWheelToRotation({ rotation: fullSpins + remainingRotation });
}

export function reverseWheel() {
  if (lastRotation === 0) {
    return Promise.resolve();
  }

  const reverseRotation = -lastRotation;

  wheelRotation += reverseRotation;
  zodiacWheel.style.transform = `rotate(${wheelRotation}deg)`;

  return new Promise((resolve) => {
    zodiacWheel.addEventListener("transitionend", resolve, { once: true });
  });
}

function animateWheelToRotation({ rotation }) {
  wheelRotation += rotation;
  lastRotation = wheelRotation;

  zodiacWheel.style.transform = `rotate(${wheelRotation}deg)`;

  return new Promise((resolve) => {
    zodiacWheel.addEventListener("transitionend", resolve, { once: true });
  });
}

function getZodiacSign({ month, day }) {
  return zodiacList.find((sign) => {
    const selectedDate = month * 100 + day;
    const startDate = sign.startMonth * 100 + sign.startDate;
    const endDate = sign.endMonth * 100 + sign.endDate;

    if (startDate > endDate) {
      return selectedDate >= startDate || selectedDate <= endDate;
    }

    return selectedDate >= startDate && selectedDate <= endDate;
  });
}

function getCurrentAngle() {
  return ((wheelRotation % 360) + 360) % 360;
}

function getRotationDifference(targetAngle) {
  const currentAngle = getCurrentAngle();

  return (targetAngle - currentAngle + 360) % 360;
}
