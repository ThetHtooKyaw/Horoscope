// Variables
let activeItem = null;
let animationFrameId = null;
let snapTimer = null;

export function getActiveItemValue() {
  return activeItem ? Number(activeItem.textContent) : null;
}

export function createSliderItems({ slider, min, max, currentItem }) {
  // Create Slider Items
  for (let item = min; item <= max; item++) {
    const sliderItem = document.createElement("p");
    sliderItem.textContent = item;
    slider.appendChild(sliderItem);
  }

  addEdgeSpace({ slider: slider }); // Add Edge Space
  findCurrentItem({ slider: slider, currentItem: currentItem }); // Scroll to Current Year Item
  animateSlider({ slider: slider }); // Animate Slider
  slider.classList.add("is-ready");
}

function addEdgeSpace({ slider }) {
  const firstItem = slider.firstElementChild;
  const lastItem = slider.lastElementChild;

  if (!firstItem || !lastItem) {
    return;
  }

  const leftSpace = (slider.clientWidth - firstItem.offsetWidth) / 2;
  const rightSpace = (slider.clientWidth - lastItem.offsetWidth) / 2;

  slider.style.paddingLeft = `${leftSpace}px`;
  slider.style.paddingRight = `${rightSpace}px`;
}

function findCurrentItem({ slider, currentItem }) {
  const currentItemElement = [...slider.children].find(
    (item) => Number(item.textContent) === currentItem,
  );

  if (currentItemElement) {
    centerItem({ slider, item: currentItemElement });
  }

  updateActiveItem({ slider });
}

function animateSlider({ slider }) {
  slider.addEventListener("scroll", () => {
    if (animationFrameId === null) {
      animationFrameId = requestAnimationFrame(() => {
        updateActiveItem({ slider });
        animationFrameId = null;
      });
    }

    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => snapToClosestItem({ slider }), 100);
  });
}

function updateActiveItem({ slider }) {
  const closestItem = getClosestItem({ slider });

  if (closestItem === activeItem) {
    return;
  }

  activeItem?.classList.remove("active");
  closestItem.classList.add("active");
  activeItem = closestItem;
}

function getClosestItem({ slider }) {
  const viewportCenter = slider.scrollLeft + slider.clientWidth / 2;
  const items = [...slider.children];

  let closestItem = items[0];
  let smallestDistance = Infinity;

  items.forEach((item) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const distance = Math.abs(viewportCenter - itemCenter);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestItem = item;
    }
  });

  return closestItem;
}

function snapToClosestItem({ slider }) {
  const closestItem = getClosestItem({ slider });

  centerItem({ slider, item: closestItem, smooth: true });
}

function centerItem({ slider, item, smooth = false }) {
  const targetScrollLeft =
    item.offsetLeft - (slider.clientWidth - item.offsetWidth) / 2;

  slider.scrollTo({
    left: targetScrollLeft,
    behavior: smooth ? "smooth" : "auto",
  });
}
