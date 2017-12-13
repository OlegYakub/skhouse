(function($){

		function init(el, increaseEl, decreaseEl) {
			var counterEl = el;

			counterEl.on('change', '.b-counter__input', validation);

    	counterEl.on('click', increaseEl, function(e) {
    		e.preventDefault();
				increase(counterEl)
			});

    	counterEl.on('click', decreaseEl, function(e) {
    		e.preventDefault();
				decrease(counterEl)
			});

		}

		function validation() {
			var $this = $(this);
			if ($this.val() < 0) $this.val(Math.abs(+$this.val()))
		}

		function increase(counterEl) {
			var value = +counterEl.find('.b-counter__input').val();

			value++;
			counterEl.find('.b-counter__input').val(value);
		}

		function decrease(counterEl) {
			var value = +counterEl.find('.b-counter__input').val();

			value--;
			if (value < 0)  value = 0;
			counterEl.find('.b-counter__input').val(value);
		}

    jQuery.fn.counter = function(increaseEl, decreaseEl){
    	init(this, increaseEl, decreaseEl)
    };

})(jQuery);
