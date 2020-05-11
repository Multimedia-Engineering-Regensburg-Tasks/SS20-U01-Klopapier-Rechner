/* eslint-env browser */

/**
 * Configuration values used by the LooRollCalculator
 */
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

/**
 * A LooRoolCalculator informs users on their current loo roll supply and suggest when to buy new rools.
 */
class LooRollCalculator {

  constructor() {
    this.numberOfRolls = DEFAULT_NUMBER_OF_ROLLS;
    this.numberOfLayers = DEFAULT_LAYERS;
    this.numberOfPeople = DEFAULT_NUMBER_OF_PEOPLE;
    this.looFrequency = DEFAULT_LOO_FREQUENCY;
    this.paperUsage = DEFAULT_PAPER_USAGE;
  }

  /**
   * Sets the current number of available rolls
   */
  set rolls(value) {
    this.numberOfRolls = value;
  }

  /**
   * Sets the number of layers on each roll
   */
  set layers(value) {
    this.numberOfLayers = value;
  }

  /**
   * Sets the number of people living in this household
   */
  set people(value) {
    this.numberOfPeople = value;
  }

  /**
   * Sets the toilet frequency
   */
  set frequency(value) {
    this.looFrequency = value;
  }

  /**
   * Sets the average number of sheets used in each sitting
   */
  set usage(value) {
    this.paperUsage = value;
  }

  /**
   * Returns a HTML formatted message including the number of days the current suplly will last and proposing a date
   * on which the user should buy new rolls.
   */
  getInfoText() {
    let now = new Date(),
      // TODO: This might not work that well: 
      // We use the currently selected number of layers to increase or decrease the number of sheets per roll
      sheetsTotal = this.numberOfRolls * (DEFAULT_SHEETS_PER_ROLL * DEFAULT_LAYERS/this.numberOfLayers),
      sheetPerDay = this.numberOfPeople * this.looFrequency * this.paperUsage,
      daysUntilLastSheet = parseInt(sheetsTotal / sheetPerDay),
      firstDayToRebuy = new Date(now.setDate(now.getDate() + (daysUntilLastSheet - DEFAULT_SAFETY_BUFFER_IN_DAYS))),
      dateString = firstDayToRebuy.getUTCDate() + ". " + MONTHS[firstDayToRebuy.getUTCMonth()];
    if (daysUntilLastSheet > DEFAULT_SAFETY_BUFFER_IN_DAYS) {
      // Build message by replacing placeholders with actual data
      return DEFAULT_INFO_TEXT.replace("{{DAYS}}", daysUntilLastSheet).replace("{{DATE}}", dateString);
    }
    return DEFAULT_WARNING_TEXT.replace("{{DAYS}}", daysUntilLastSheet);
  }

}