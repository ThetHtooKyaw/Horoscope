import { initializeLoader } from "./components/loader.js";
import { createSliderItems, getActiveItemValue } from "./components/slider.js";
import { initializeWheel } from "./components/wheel.js";

initializeLoader();

// Element References
const yearSlider = document.getElementById("year-slider");
const confirmYearButton = document.getElementById("confirm-year");

// Year Variables
const currentYear = new Date().getFullYear();
const minYear = currentYear - 40;
const maxYear = currentYear + 3;
let selectedYear = null;

createSliderItems({
  slider: yearSlider,
  min: minYear,
  max: maxYear,
  currentItem: currentYear,
}); // Create Slider Items

initializeWheel({ confirmButton: confirmYearButton });

confirmYearButton.addEventListener("click", () => {
  selectedYear = getActiveItemValue();
  console.log("Selected year:", selectedYear);
});
