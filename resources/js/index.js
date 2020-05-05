/* eslint-env browser */
/* global SpinnerView, LooRollCalculator  */

const MAX_VALUE = 100;

var calculator,
  resultView,
  rollSpinner,
  layerSpinner,
  peopleSpinner,
  frequencySpinner,
  usagePinner;

function init() {
  calculator = new LooRollCalculator();
  initUI();
}

function initUI() {
  resultView = document.querySelector(".result-text");
  rollSpinner = new SpinnerView(".loo-rolls .spinner", MAX_VALUE, onChange.bind(this, "rools"));
  layerSpinner = new SpinnerView(".layers .spinner", MAX_VALUE, onChange.bind(this, "layers"));
  peopleSpinner = new SpinnerView(".people .spinner", MAX_VALUE, onChange.bind(this, "people"));
  frequencySpinner = new SpinnerView(".frequency .spinner", MAX_VALUE, onChange.bind(this, "frequency"));
  usagePinner = new SpinnerView(".usage .spinner", MAX_VALUE, onChange.bind(this, "usage"));
  resultView.innerHTML = calculator.getInfoText();
}

function onChange(origin, value) {
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
  resultView.innerHTML = calculator.getInfoText();
}

init();