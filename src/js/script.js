var ww, scrollTop, wh;

ww = document.documentElement.clientWidth;
wh = document.documentElement.clientHeight;

$(document).ready(function() {

/*=========custom scroll table init==========*/
if (ww < 743) {
  $(".typical__table").mCustomScrollbar({
    axis:"x",
    mouseWheel: {
      enable: false
    },
    autoHideScrollbar: true,
  });
}

/*============HEADER===========*/
/*=========header-search==========*/

$('.search__btn').click(function(){
	if (ww < 743) $('.header__logo').animate({ opacity: 'toggle'});
	$('.search__field').animate({ width: 'toggle' });
});

$('.header-first__close').click(function(){
	$(this).closest($('.header-first')).hide();
	$('.header').removeClass('header--withpop');
	$('.menu').removeClass('menu--withpop');
	$('.list-aside').removeClass('list-aside--withpop');

});

$('.help__btn').click(function(e){
	e.preventDefault();
	$('.callback').show();
	$('.overlay-popup').show()
})

//хедер и меню при скроле страницы
document.addEventListener('scroll', headerScroll);
function headerScroll(e) {

	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if (scrollTop > 0) {
		$('.header').addClass('header--scrolled');
		$('.menu').addClass('menu--scrolled');
		$('.list-aside').addClass('list-aside--scrolled');
	} else {
		$('.header').removeClass('header--scrolled')
		$('.menu').removeClass('menu--scrolled')
		$('.list-aside').removeClass('list-aside--scrolled')
	}
}


if (ww < 960 ) {
	$('.help').mCustomScrollbar();
}

$('.checkout__login, .login__link, .reg-link').click(function(){
	$('.modal-login').show();
	$('.overlay-popup').show()
});

/*===========scroll basket==============*/

$('.mini-basket__scroll').mCustomScrollbar({
	theme: 'dark'
});

//==================Хедер и меню===============//
function ViewedBox() { //обьект для хедера и всплывающих попапов с оверлеем
	this._elemToShow; //текущий показываемый елемент
	this._hiddenElem; 

	this.render = function() {
		$(this._hiddenElem).hide();
		$(this._elemToShow).show();
		if (this._elemToShow) $('.overlay').show() //если текущий показываемый елемент не undefiend тo показываем overlay
		else $('.overlay').hide()
	}
}

ViewedBox.prototype.setElemToShow = function(elem) {
	this._hiddenElem = this._elemToShow; //скрываем предыдущий елемент
	this._elemToShow = elem; //показываем текущий

	this.render();
}
ViewedBox.prototype.hideElement = function() {
	this._hiddenElem = this._elemToShow;
	this._elemToShow = null;
	this.render();
}
ViewedBox.prototype.getElemToShow = function(elem) {
	return this._elemToShow;
}

function clicker(el) {
	if(viewedBox.getElemToShow()) { //берем текущий елемент
		if (viewedBox.getElemToShow().selector == el.selector) { //проверяем если кликнули на тотже елмент который у нас текущий в обьекте то скрываем его
			viewedBox.hideElement();
			return
		}
	}
	viewedBox.setElemToShow(el); //если нет по показываем
}

function bodyOverflower(el) { 
	if ($(el)[0] == $('.list-aside__opener')[0]) $('body').css('overflow', 'hidden'); 
	else $('body').css('overflow', 'auto'); 
	
}
var viewedBox = new ViewedBox();
if (ww < 1170) { //если планшет и ниже
$('.list-aside__opener').click(function(e){
	bodyOverflower(this);
	viewedBox.setElemToShow($('.list-aside'))
})

$('.list-aside__title').click(function(){
	bodyOverflower(this);
	viewedBox.hideElement()
})

$('.burger').click(function(){
	bodyOverflower(this);
	clicker($('.help'))
});

$('.header__menu-item--help').click(function(){
	bodyOverflower(this);
	clicker($('.help'))
});

$('.currency').click(function(){
	bodyOverflower(this);
	clicker($('.currency__sub'))
});

$('.overlay').click(function(){
	bodyOverflower(this);
	viewedBox.hideElement()
})
}
/*==========================*/

if( ww > 1170) {//если десктоп
	viewedBox.timerId;
	$('.header__menu-item--help, .help').hover(// меню хелп
		function(){
			clearInterval(viewedBox.timerId)
			viewedBox.setElemToShow($('.help'));
		}, 
		function(){
			viewedBox.timerId = setTimeout(function(){
				viewedBox.hideElement()
			}, 100);
		}
	);


	$('.header__item--hov').hover(function(){
		$('.overlay').toggle();
	})

	$('.header__menu-item--catalog, .catalog').hover( //каталог
		function(){
			clearInterval(viewedBox.timerId);
			viewedBox.setElemToShow($('.catalog'));
		},
		function(){
			viewedBox.timerId = setTimeout(function(){
				viewedBox.hideElement()
			}, 100);
		}
	);
}

if (ww < 960) {
	function setMenuPadding() {
		var contWidth = $('header .container').width()
		var padding = (ww - contWidth)/2;
		$('.help').css('paddingLeft', padding+'px');
	}
	setMenuPadding();
}

if (ww < 960) {
	function setAsidePadding() {
		var contWidth = $('header .container').width()
		var padding = (ww - contWidth)/2;
		$('.list-aside').css('left', padding+'px');
	}
	setAsidePadding();
}

/*============end of HEADER===========*/
//===========overlay=================//
$('.overlay-popup').click(function(){
	$('.modal').hide();
	$(this).hide();
	$('.videos__pop').hide();
})
//===============MODALS=============//

$('.modal__close').click(function(){
	$('.overlay-popup').hide();
	$(this).closest($('.modal')).hide();
})

$('.thanks__btn').click(function(){
	$(this).closest($('.thanks')).hide();
});

$('.modal-login__body').tabs();

$('.modal-login__link').click(function(){
	$('.modal-login__link').removeClass('modal-login__link--active');
	$(this).addClass('modal-login__link--active');
})

jQuery.validator.addMethod("tel", function (value) { 
  return /^\d[\d\(\)\ -]{4,14}\d$/i.test(value); 
}, 'введите телефон в формате Х-ХХХ-ХХХХХХХ');
$('#callback-form').validate({
	rules: {
		'name': {
			required: true,
			minlength: 2
		},
		'tel': {
			required: true,
			tel: true,
		}
	},
	messages: {
		'name': {
			required: "Необходимо ввести имя",
      minlength: "Имя должно состоять из не менее 3 символов",
		},
		'tel': {
			required: "Необходимо ввести номер телефона",
		}
	},
	submitHandler: function(form) {
      $(form).ajaxSubmit();
  },
  errorLabelContainer: "#messageBox",
  wrapper: "span",
});

$('#reg-form').validate({
	rules: {
		'email': {
			required: true,
			email: true,
		},
		'pass': {
			required: true,
		},
		'pass2': {
			required: true,
			equalTo: '#reg-password-1'
		}
	},
	messages: {
		'email': {
			required: "Необходимо ввести адрес электронной почты",
      email: "Не правильный формат электронной почты",
		},
		'pass': {
			required: "Необходимо ввести пароль",
		},
		'pass2': {
			required: "Необходимо повторно ввести пароль",
			equalTo: "Необходимо ввести одинаковые пароли"
		}
	},
	submitHandler: function(form) {
      $(form).ajaxSubmit();
  },
  errorLabelContainer: "#messageBox",
  wrapper: "span",
});

$('#login-form').validate({
	rules: {
		'email': {
			required: true,
			email: true,
		},
		'pass': {
			required: true,
		},
	},
	messages: {
		'email': {
			required: "Необходимо ввести адрес электронной почты",
      email: "Не правильный формат электронной почты",
		},
		'pass': {
			required: "Необходимо ввести пароль",
		},
	},
	submitHandler: function(form) {
      $(form).ajaxSubmit();
  },
  errorLabelContainer: "#messageBox",
  wrapper: "span",
});


/*============GOOD===========*/

$('.good__slider').slick({
	  infinite: false,
  	slidesToShow: 1,
  	slidesToScroll: 1,
  	arrows: true,
  	dots: false,
  	speed: 150,
});

$('.good').each(function(i, el){
	var btn = $(el).find($('.good__btn'));
	var tab = $(el).find($('.good__tab'));
	var isGoodPanelOpen = false;
	var goodBtnHtml = $(btn).html();

	var prise = $(el).find($('.good__price'))
	var discount = $(el).find($('.good__discount'))

	$(btn).click(function(e){
		e.preventDefault();
		isGoodPanelOpen = !isGoodPanelOpen;

		if (isGoodPanelOpen) $(this).html('Свернуть <img src="img/arrow-down.png" alt >');
		else ($(this).html(goodBtnHtml));

		$(tab).toggle();
		
		if ( ww < 1170) {
			$(prise).toggle();
			$(discount).toggle();
		}
	});
});



$('.good__like').click(function(e){
	e.preventDefault();
	$(this).addClass('good__like--active');
});

var goodTimerId;
$('.good__size').click(function(e){

	e.preventDefault();
	var counter = $(this).find($('.good__counter'));
	
	function fly() {
		$(counter).addClass('good__counter--flying');
	};

	function hide() {
		$(counter).removeClass('good__counter--flying').hide();
	}
	hide();
	clearTimeout(goodTimerId);

	var number = $(this).find($('.good__count-numb'));
	var numberValue = $(this).find($('.good__count-numb')).text();
	numberValue++;

	$(number).text(numberValue);
	$(counter).show();	
	setTimeout( fly, 10);
	goodTimerId = setTimeout(hide, 800);
})

/*============main page===========
================================*/

$('.banner').slick({
	infinite: true,
  	slidesToShow: 1,
  	slidesToScroll: 1,
  	arrows: false,
  	dots: true,
});
$('.viewed__slider').slick({
	infinite: false,
	slidesToShow: 4,
	speed: 200,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	draggable: false,
	swipe: false,
	responsive: [
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 744,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
});

$('.viewed__link').click(function(e){
	e.preventDefault();
	$('.viewed__link').removeClass('viewed__link--active');

	$(this).addClass('viewed__link--active');
	var href = $(this).attr('href');
	$('.viewed__tab').removeClass('viewed__tab--show')
	$(href).addClass('viewed__tab--show');

});



if (ww < 743) {
	$('.videos__body').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
	})
}

$('.videos__item').click(function(){
	var href = $(this).attr('href');
	//$('.videos__pop[data-id^="'+ href +'"]').show();
	$(href).show();
	$('.overlay-popup').show();
})

$('.videos__close').click(function(e){
	e.preventDefault();
	$('.videos__pop').hide();
	$('.overlay-popup').hide();
});

/*===============listing page=========*/

$('.list-aside__box').each(function(i, el){
	var btn = $(el).find($('.list-aside__title2'));
	var box = $(el).find($('.list-aside__items'));

	$(btn).click(function(e){
		e.preventDefault();
		$(this).toggleClass('list-aside__title2--closed');
		$(box).animate({height: 'toggle'}, 300);
	})
});

$('.list__sort--img').click(function(e){
	e.preventDefault();
	$(this).toggleClass('list__sort--invert');
})

if (ww < 959) {

	$('.list-aside').mCustomScrollbar();
}

$('.list__dropdown-btn').click(function(e){
	e.preventDefault();
	$('.list__dropdown').toggle();
})

function setSeoHeight() {
	var seoHeight = $('.list__seo').height();
	$('.list__seo-overlay').css('paddingTop', 50+seoHeight+'px');
}
setSeoHeight();
$( window ).resize(setSeoHeight)

//===============tabs===================//
$('.tabs-nav__item').click(function(){
	$('.tabs-nav__item').removeClass('tabs-nav__item--active');
	$(this).addClass('tabs-nav__item--active');
})

//=====================lookbook============//

$('.look-list__item').each(function(index, item){
	$(item).click(function(){
		$('.look-list__overlay').hide();
		$(this).find('.look-list__overlay').show();
	})
})

$('.look__slider').slick({
	centerMode: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	speed: 300,
  centerPadding: '0',
  responsive: [
    {
      breakpoint: 744,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        adaptiveHeight: true,
      }
    },
  ]
})
//====================delpay FAQ+=============//
$('.delpay__item').each(function(i, item){
	var btn = $(item).find('.delpay__title');
	var content = $(item).find('.delpay__text');

	$(btn).click(function(e){
		e.preventDefault();
		$(this).toggleClass('delpay__title--opened');
		$(content).animate({height: 'toggle'});
	})
})

$('.delpay__nav-item').click(function(){
	$('.delpay__tab').hide();
	var href = $(this).attr('data-link');
	$('.delpay__'+ href +'').show();
})

//====================review + outlet=============//

$('.review__nav').click(function(){
	$('.review__tab').hide();
	var href = $(this).attr('data-link');
	$('.review__tab[data-content^="'+ href +'"]').show();
})

$('.review__add').click(function(){
	$(this).hide();
	$('.review__form form').show();
})

if ( ww < 1170) {
	$('.outlet__item').each(function(index, item){
		$(item).click(function(){
			$('.outlet__overlay').hide();
			var overlay = $(this).find('.outlet__overlay');
			$(overlay).show();
		})
	})
};
//======================end==============//
//===================личный кабинет=========//
	;(function(){

		$('#lkAvatarInput').change(function(){
				var path = URL.createObjectURL(this.files[0]);
				
				$('#lkAvatarImg').attr('src', path);
		})

	})();

	//tabs в ЛК вкладка заказы
	$('.lk-orders__nav').click(function(){
		$('.lk-orders__item').hide();
		var href = $(this).attr('data-link');
		$('#'+ href ).show();
	})

	$('.lk__nav').click(function(){
		$('.lk__nav').removeClass('aside__link--active');
		$(this).addClass('aside__link--active')

		$('.lk').hide();
		var href = $(this).attr('data-link');

		$('#'+ href ).show();
	})

	$('.managers').slick({
		
	})
//======================end==============//
});

$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});


 //init video 
var tag = document.createElement('script');

tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player1, player2, player3;
//var ids = [ 'video1', 'video2', 'video3' ];
function onYouTubePlayerAPIReady() {
		player1 = new YT.Player('video1', {
	    events: {
	      'onReady': onPlayerReady,
	    }
	  });

	  player2 = new YT.Player('video2', {
	    events: {
	      'onReady': onPlayerReady,
	    }
	  });

	  player3 = new YT.Player('video3', {
	    events: {
	      'onReady': onPlayerReady,
	    }
	  });
}

function onPlayerReady(event) {
  $('.videos__close').click(function(){
  	player1.pauseVideo();
  	player2.pauseVideo();
  	player3.pauseVideo();
  })
}
