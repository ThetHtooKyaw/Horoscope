import { initializeLoader } from "./components/loader.js";
import { spinWheel, spinBetweenSigns, spinToSign } from "./components/wheel.js";
import { createSliderItems } from "./components/slider.js";
import { changeStep } from "./components/steps.js";

initializeLoader();

// Date Configuration
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();
const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDaysInMonth({ year, month }) {
  return new Date(year, month, 0).getDate();
}

// Element References
const yearSlider = document.getElementById("year-slider");
const monthSlider = document.getElementById("month-slider");
const daySlider = document.getElementById("day-slider");

const confirmYearButton = document.getElementById("confirm-year");
const confirmMonthButton = document.getElementById("confirm-month");
const confirmDayButton = document.getElementById("confirm-day");

const yearSliderController = createSliderItems({
  slider: yearSlider,
  min: currentYear - 40,
  max: currentYear + 3,
  currentItem: currentYear,
});

const monthSliderController = createSliderItems({
  slider: monthSlider,
  min: 1,
  max: 12,
  currentItem: currentMonth,
  formatItem: (item) => monthShortNames[item - 1],
});

let daySliderController = null;

confirmYearButton.addEventListener("click", async () => {
  const selectedYear = yearSliderController.getValue();

  confirmYearButton.disabled = true;
  yearSliderController.animateActiveItem();
  await spinWheel();
  yearSliderController.unlockScroll();

  changeStep(1);
  requestAnimationFrame(() => {
    monthSliderController.center();
  });

  console.log("Selected year:", selectedYear);
});

confirmMonthButton.addEventListener("click", async () => {
  const selectedMonth = monthSliderController.getValue();
  const selectedYear = yearSliderController.getValue();

  confirmMonthButton.disabled = true;
  monthSliderController.animateActiveItem();
  await spinBetweenSigns({ month: selectedMonth });
  monthSliderController.unlockScroll();

  const daysInSelectedMonth = getDaysInMonth({
    year: selectedYear,
    month: selectedMonth,
  });

  const startingDay = Math.min(currentDay, daysInSelectedMonth);

  daySliderController = createSliderItems({
    slider: daySlider,
    min: 1,
    max: daysInSelectedMonth,
    currentItem: startingDay,
  });

  changeStep(1);
  requestAnimationFrame(() => {
    daySliderController.center();
  });

  console.log("Selected month:", selectedMonth);
  console.log("Days in selected month:", daysInSelectedMonth);
});

confirmDayButton.addEventListener("click", async () => {
  const selectedMonth = monthSliderController.getValue();
  const selectedDay = daySliderController.getValue();

  confirmDayButton.disabled = true;
  daySliderController.animateActiveItem();
  await spinToSign({ month: selectedMonth, day: selectedDay });
  daySliderController.unlockScroll();

  changeStep(1);

  console.log("Selected day:", selectedDay);
});
