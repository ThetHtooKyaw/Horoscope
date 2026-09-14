export function createSliderItems({
  slider,
  min,
  max,
  currentItem,
  maxSelectableValue = max,
  formatItem = String,
}) {
  // Variables
  let activeItem = null;
  let animationFrameId = null;
  let snapTimer = null;

  // Create Slider Items
  for (let item = min; item <= max; item++) {
    const sliderItem = document.createElement("p");

    sliderItem.dataset.value = item;
    sliderItem.textContent = formatItem(item);

    slider.appendChild(sliderItem);
  }

  addEdgeSpace();
  setInitialItem();
  updateUnselectableItems();
  addScrollListener();
  slider.classList.add("is-ready");

  return {
    setMaxSelectableValue(value) {
      maxSelectableValue = value;
      updateUnselectableItems();
    },

    getValue() {
      return activeItem ? Number(activeItem.dataset.value) : null;
    },

    center() {
      addEdgeSpace();

      if (activeItem) {
        centerItem({ item: activeItem });
      }
    },

    animateActiveItem() {
      if (!activeItem) {
        return;
      }
      activeItem.classList.add("animate-scale-up");

      activeItem.addEventListener(
        "animationend",
        () => {
          activeItem.classList.remove("animate-scale-up");
        },
        { once: true },
      );
    },

    lockScroll() {
      slider.classList.add("is-locked");
    },

    unlockScroll() {
      slider.classList.remove("is-locked");
    },
  };

  function addEdgeSpace() {
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

  function setInitialItem() {
    activeItem = [...slider.children].find(
      (item) => Number(item.dataset.value) === currentItem,
    );

    if (!activeItem) {
      return;
    }

    activeItem.classList.add("active");
    centerItem({
      item: activeItem,
    });
  }

  function updateUnselectableItems() {
    [...slider.children].forEach((item) => {
      const value = Number(item.dataset.value);
      const isUnselectable = value > maxSelectableValue;

      item.classList.toggle("unselectable", isUnselectable);
    });
  }

  function addScrollListener() {
    slider.addEventListener("scroll", () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(() => {
          updateActiveItem();
          animationFrameId = null;
        });
      }

      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => snapToClosestItem(), 100);
    });
  }

  function updateActiveItem() {
    const closestItem = getClosestItem();

    if (closestItem === activeItem) {
      return;
    }

    activeItem?.classList.remove("active");
    closestItem.classList.add("active");
    activeItem = closestItem;
  }

  function snapToClosestItem() {
    const closestItem = getClosestItem();

    centerItem({ item: closestItem, smooth: true });
  }

  function getClosestItem() {
    const viewportCenter = slider.scrollLeft + slider.clientWidth / 2;
    const selectableItems = [...slider.children].filter(
      (item) => Number(item.dataset.value) <= maxSelectableValue,
    );

    let closestItem = selectableItems[0];
    let smallestDistance = Infinity;

    selectableItems.forEach((item) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestItem = item;
      }
    });

    return closestItem;
  }

  function centerItem({ item, smooth = false }) {
    const targetScrollLeft =
      item.offsetLeft - (slider.clientWidth - item.offsetWidth) / 2;

    slider.scrollTo({
      left: targetScrollLeft,
      behavior: smooth ? "smooth" : "auto",
    });
  }
}
