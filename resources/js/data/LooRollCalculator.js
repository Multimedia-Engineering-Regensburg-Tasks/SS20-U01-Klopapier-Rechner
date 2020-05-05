/* eslint-env browser */

const DEFAULT_NUMBER_OF_ROLLS = 5,
  DEFAULT_LAYERS = 4,
  DEFAULT_NUMBER_OF_PEOPLE = 2,
  DEFAULT_LOO_FREQUENCY = 3,
  DEFAULT_PAPER_USAGE = 10,
  DEFAULT_SHEETS_PER_ROLL = 150,
  DEFAULT_SAFETY_BUFFER_IN_DAYS = 4,
  DEFAULT_INFO_TEXT = "Dein Vorrat reicht noch<br /><span class=\"highlight\">{{DAYS}} Tage.</span><br />Frühestens am<br /><span class=\"highlight\">{{DATE}}</span><br />musst du beim Einkaufen wieder nach neuem Klopapier Ausschau halten.",
  DEFAULT_WARNING_TEXT = "Dein Vorrat reicht noch {{DAYS}} Tage. Du solltest neues Klopapier kaufen.",
  MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

class LooRollCalculator {

  constructor() {
    this.numberOfRolls = DEFAULT_NUMBER_OF_ROLLS;
    this.numberOfLayers = DEFAULT_LAYERS;
    this.numberOfPeople = DEFAULT_NUMBER_OF_PEOPLE;
    this.looFrequency = DEFAULT_LOO_FREQUENCY;
    this.paperUsage = DEFAULT_PAPER_USAGE;
  }

  set rolls(value) {
    this.numberOfRolls = value;
  }

  set layers(value) {
    this.numberOfLayers = value;
  }

  set people(value) {
    this.numberOfPeople = value;
  }

  set frequency(value) {
    this.looFrequency = value;
  }

  set usage(value) {
    this.paperUsage = value;
  }

  getInfoText() {
    let now = new Date(),
      sheetsTotal = this.numberOfRolls * DEFAULT_SHEETS_PER_ROLL,
      sheetPerDay = this.numberOfPeople * this.looFrequency * this.paperUsage,
      daysUntilLastSheet = parseInt(sheetsTotal / sheetPerDay),
      firstDayToRebuy = new Date(now.setDate(now.getDate() + (daysUntilLastSheet - DEFAULT_SAFETY_BUFFER_IN_DAYS))),
      dateString = firstDayToRebuy.getUTCDate() + ". " + MONTHS[firstDayToRebuy.getUTCMonth()];
    if (daysUntilLastSheet > DEFAULT_SAFETY_BUFFER_IN_DAYS) {
      return DEFAULT_INFO_TEXT.replace("{{DAYS}}", daysUntilLastSheet).replace("{{DATE}}", dateString);
    }
    return DEFAULT_WARNING_TEXT.replace("{{DAYS}}", daysUntilLastSheet);
  }

}