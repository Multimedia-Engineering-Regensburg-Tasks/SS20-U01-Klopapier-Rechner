/**
 * SpinnerView represents a User Interface element to indecreas and decrease a value
 * by pressing "Plus"- and "Minus"-Button. The current value is shown in a <span>-Element.
 */

class SpinnerView {

	/**
	 * Erstellt ein neuen SpinnerView
	 * @param {Text} selector CSS selector for the root element of this Spinner including both buttons and the output element
	 * @param {Number} max Maximal value to be displayed in this Spinner
	 * @param {Function} onChange Callbcack to be called when this Spinner's value has changed
	 */
	constructor(selector, max, onChange) {
		// Select main Spinner element by using givenselector, than selecting output element from that DOM level
		this.el = document.querySelector(selector).querySelector(".value");
		this.maxValue = max;
		// Save onChange callback in object properties: Functions are first-class-citizens, we can use them as parameters and 
		// store them in variables
		this.onChange = onChange;
		// LInk increase and decrease functions to Click events, binding this object's context (this) to the callback function.
		// This makes sure that we will be able to access the original context when handling the Click events.
		document.querySelector(selector).querySelector(".button.minus").addEventListener("click", this.decrease.bind(this));
		document.querySelector(selector).querySelector(".button.plus").addEventListener("click", this.increase.bind(this));
	}

	increase() {
		let value = parseInt(this.el.innerHTML) + 1;
		if(value > this.maxValue) {
			value = this.maxValue;
		}
		this.el.innerHTML = value;
		this.onChange(value);
	}

	decrease() {
		let value = parseInt(this.el.innerHTML) - 1;
		if(value < 0) {
			value = 0;
		}
		this.el.innerHTML = value;
		this.onChange(value);
	}	

}