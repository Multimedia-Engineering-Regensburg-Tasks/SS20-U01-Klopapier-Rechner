/* eslint-env browser */
/* global SpinnerView, LooRollCalculator  */

// Max value to be shown in each Spinner 
const MAX_VALUE = 100;

var calculator,
  resultView;

function init() {
  // App starts here ...
  calculator = new LooRollCalculator();
  initUI();
}

function initUI() {
  /* eslint-disable no-unused-vars */
  let rollSpinner = new SpinnerView(".loo-rolls .spinner", MAX_VALUE, onChange.bind(this, "rools")),
    layerSpinner = new SpinnerView(".layers .spinner", MAX_VALUE, onChange.bind(this, "layers")),
    peopleSpinner = new SpinnerView(".people .spinner", MAX_VALUE, onChange.bind(this, "people")),
    frequencySpinner = new SpinnerView(".frequency .spinner", MAX_VALUE, onChange.bind(this, "frequency")),
    usagePinner = new SpinnerView(".usage .spinner", MAX_VALUE, onChange.bind(this, "usage"));
    
  /* eslint-enable no-unused-vars */
  resultView = document.querySelector(".result-text");
  // Create and show inital info message by using default values in LooRollCalculator
  resultView.innerHTML = calculator.getInfoText();
}

/**
 * This function is called each time one of the Spinner's value is changed by the user
 * @param {Text} origin Text-identifier for each Spinner: This value is set in initUI by using .bind to preset the first parameter
 * @param {Number} value The new value of the changed Spinner: This value is passed by the actual Spinner 
 */
function onChange(origin, value) {
  // Updating LooRollCalculator with changed value
  switch (origin) {
    case "rools":
      calculator.rolls = value;
      break;
    case "layers":
      calculator.layers = value;
      break;
    case "people":
      calculator.people = value;
      break;
    case "frequency":
      calculator.frequency = value;
      break;
    case "usage":
      calculator.usage = value;
      break;
    default:
      break;
  }
  //  Create and show info message by using new values in LooRollCalculator
  resultView.innerHTML = calculator.getInfoText();
}

init();