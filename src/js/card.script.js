/*=================CARD page===========*/
/*=====================================*/
$(document).ready(function() {
$('.card-for__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.card-nav__slider',
  responsive: [
    {
      breakpoint: 743,
      settings: {
        adaptiveHeight: true
      }
    }
  ]
});

$('.card-nav__slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  arrows: false,
  asNavFor: '.card-for__slider',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  verticalSwiping: true,
  centerPadding: '0px'
});

var magnifiersize;
if (ww > 1170)  magnifiersize =  [585+"px", $('.card-for__item').height() - 4 +"px"]
if (ww < 1170 && ww > 959) magnifiersize =  [460+"px", $('.card-for__item').height() - 4 +"px"]
if (ww < 959 && ww > 744) magnifiersize =  [355+"px", $('.card-for__item').height() - 4 +"px"]

if (ww < 744) {
	jQuery(function(){
		$(".card-for__pict img").imagezoomsl({
			zoomrange: [1, 12],
      zoomstart: 4,
      innerzoom: true,
      magnifierborder: "none"
		});
	});  
} else  {
	jQuery(function(){
		$(".card-for__pict img").imagezoomsl({
			zoomrange: [1, 12],
			magnifiersize: magnifiersize,
			//innerzoommagnifier: true,
			//innerzoom: true,
			switchsides: true,
			magnifierborder: '2px solid #e42d7b'
		});
	});  
}

function Card() {
	this._price = parseInt($('.card-price__num--main').text());
	this._items = 0;
	this._total = this._items * this._price;

  this.setItems = function(quan) {
    var items = 0;
    cardFields.forEach(function(item, index){
      items = items + item.value
    })
    this._items = items;
    this.render();
  }

	this.render = function() {
    this._calcTotal();
		$('.card-price__num--total').text(this._total);
	}

	this._calcTotal = function() {
		this._total = this._items * this._price;
	}
}

function CardField(el, value) {
  this.value = parseInt(value);
  this.el = el;

  this._input = $(this.el).find('.c-counter__input')

  this.updateValue = function(val) {
    if ( this.value + parseInt(val) <= 0) this.value = 0;
    else if ( isNaN(parseInt(val)) ) this.value = 0;
    else this.value = parseInt(val);
    this.render();
  }

  this.increment = function() {
    this.value++;
    this.render();
  }

   this.decrement = function() {
    if (this.value == 0) return
    this.value--;
    this.render();
  }

  this.render = function(){
    console.log(cardFields);
    $(this._input).val(this.value);
    card.setItems();
  }
}
var cardFields = [];
var card = new Card();
card.render();
$('.card__row').each(function(i, el){
  var value = $(el).find('.c-counter__input').val()
  var cardField = new CardField(el, value);

  cardFields.push(cardField);
  var incrBtn = $(el).find('.c-counter__incr')
  var decrBtn = $(el).find('.c-counter__decr')
  var input = $(el).find('.c-counter__input')

  $(incrBtn).click(function(e){
    e.preventDefault();
    cardField.increment()
  })

  $(decrBtn).click(function(e){
    e.preventDefault();
    cardField.decrement()
  })

  $(input).change(function(){
    cardField.updateValue($(this).val());
  })

  cardField.render();
})


$('.card__link--disc').click(function(){
  $('.callback').show();
  $('.overlay-popup').show();
})

$('.c-desc__sizes').click(function(){
  $('.size-table').show()
  $('.overlay-popup').show();
})

$('.c-reviews__btn').click(function(){
  $('.toreview').show();
  $('.overlay-popup').show();
})


$('.toreview__form').validate({
  rules: {
    'name': {
      required: true,
    },
    'message': {
      required: true,
    },
  },
  messages: {
    'name': {
      required: "Необходимо ввести свое имя",
    },
    'message': {
      required: "Необходимо ввести сообщение",
    },
  },
  submitHandler: function(form) {
      $(form).ajaxSubmit();
  },
  errorLabelContainer: "#messageBox",
  wrapper: "span",
});

//табы на странице товара
if (ww > 743 ) $('.c-tabs').tabs();

$('.c-desc__drop').click(function(){
  $(this).toggleClass('c-desc__drop--open');
  $('.c-desc__body').animate({height: 'toggle'});
})
$('.c-reviews__drop').click(function(){
  $(this).toggleClass('c-reviews__drop--open');
  $('.c-reviews__body').animate({height: 'toggle'});
})

});