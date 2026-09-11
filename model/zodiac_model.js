class ZodiacModel {
  constructor(name, startMonth, startDate, endMonth, endDate, img ,symbol, element) {
    this.name = name;
    this.startMonth = startMonth;
    this.startDate = startDate;
    this.endMonth = endMonth;
    this.endDate = endDate;
    this.img = img;
    this.symbol = symbol;
    this.element = element;
  }
}

export const zodiacList = [
  new ZodiacModel("aries", 3, 21, 4, 19, "aries.png", "♈", "fire.png"),
  new ZodiacModel("taurus", 4, 20, 5, 20, "taurus.png", "♉", "earth.png"),
  new ZodiacModel("gemini", 5, 21, 6, 20, "gemini.png", "♊", "air.png"),
  new ZodiacModel("cancer", 6, 21, 7, 22, "cancer.png", "♋", "water.png"),
  new ZodiacModel("leo", 7, 23, 8, 22, "leo.png", "♌", "fire.png"),
  new ZodiacModel("virgo", 8, 23, 9, 22, "virgo.png", "♍", "earth.png"),
  new ZodiacModel("libra", 9, 23, 10, 22, "libra.png", "♎", "air.png"),
  new ZodiacModel("scorpio", 10, 23, 11, 21, "scorpio.png", "♏", "water.png"),
  new ZodiacModel("sagittarius", 11, 22, 12, 21, "sagittarius.png", "♐", "fire.png"),
  new ZodiacModel("capricorn", 12, 22, 1, 19, "capricorn.png", "♑", "earth.png"),
  new ZodiacModel("aquarius", 1, 20, 2, 18, "aquarius.png", "♒", "air.png"),
  new ZodiacModel("pisces", 2, 19, 3, 20, "pisces.png", "♓", "water.png")
];