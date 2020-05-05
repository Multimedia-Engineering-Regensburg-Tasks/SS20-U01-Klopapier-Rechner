class SpinnerView {
	constructor(selector, max, onChange) {
		this.el = document.querySelector(selector).querySelector(".value");
		this.maxValue = max;
		this.onChange = onChange;
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