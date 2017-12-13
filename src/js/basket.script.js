$(document).ready(function() {
	$('.b-counter').each(function(id, item) {
		$(item).counter('.b-counter__incr', '.b-counter__decr');
	})

	//remove from basket
	;(function(){
		$('.b-good').on('click', '.b-good__remove', remove);
		$('.b-good').on('click', '.b-good__close', remove);

		function remove() {
			var $el = $(this).parents('.b-good');
			$el.slideUp(200, callback);

			function callback() {
					$el.remove()
					//дописать Ajax запрос в БД
			}
		}
	})()

	//change color on good in basket
	;(function(){
		$('.b-good').on('click', '.card-color', changeColor);

		function changeColor() {
			$(this).parents('.b-good').find('.card-color').removeClass('card-color--active');
			$(this).addClass('card-color--active')
		}
	})();

	//edit/submit on good in basket
	;(function(){
		$('.b-good').on('click', '.b-good__toedit', edit);
		$('.b-good').on('click', '.b-good__submit', submit);
		
		function edit() {
			$(this).parents('.b-good__body').addClass('b-good__body--onedit');
			$(this).parents('.b-good').find('.b-good__info').hide();
			$(this).parents('.b-good').find('.b-good__edit').show();
			$(this).hide();
			$(this).siblings('.b-good__remove').hide();
		}

		function submit() {
			$(this).parents('.b-good__body').removeClass('b-good__body--onedit');
			$(this).parents('.b-good').find('.b-good__info').show();
			$(this).parents('.b-good').find('.b-good__edit').hide();
			$(this).parents('.b-good').find('.b-good__toedit').show();
			$(this).parents('.b-good').find('.b-good__remove').show();
		}

	})();

	//button on promocode
	(function(){

		$('.checkout__input input').on('input', function(e){
			var length = $(this).val().length;
			if (length > 0) $('.checkout__confirm').show()
			else $('.checkout__confirm').hide()
		})

	})();

	//set disable class on good in basket
	;(function(){
		$('.b-good').on('click', '.b-counter__decr', setDisableClass);
		$('.b-good').on('click', '.b-counter__incr', removeDisableClass);
		$('.b-good').on('change', '.b-counter__input', setDisableClass);

		function setDisableClass() {
			var value = +$(this).parents('.b-good').find('.b-counter__input').val();

			if (value == 0) {
				$(this).parents('.b-good').addClass('b-good--disabled')
			}
		}

		function removeDisableClass() {
			var value = +$(this).parents('.b-good').find('.b-counter__input').val();

			if (value < 2) {
				$(this).parents('.b-good').removeClass('b-good--disabled');
			}
		}
	})();

})

