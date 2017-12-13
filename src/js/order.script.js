//===================ORDER PAGE=============//
$(document).ready(function() {

$('.order__body').tabs();

$('.styled-select').styler({
	selectSmartPositioning: false,
});


$('#ukraine-form').validate({
	rules: {
		'country': {
			required: true,
		},
		'city': {
			required: true,
		},
		'area': {
			required: true,
		},
		'departament': {
			required: true,
		},
		'tel': {
			required: true,
			tel: true,
		},
		'email': {
			required: true,
			email: true,
		},
		'surname': {
			required: true,
		},
		'name': {
			required: true,
		},
		'fathername': {
			required: true,
		},
	},
	messages: {
		
		'country': {
			required: 'Необходимо указать свою страну',
		},
		'city': {
			required: 'Необходимо указать свой город',
		},
		'area': {
			required: 'Необходимо указать свою область',
		},
		'departament': {
			required: 'Необходимо указать отделение',
		},
		'tel': {
			required: "Необходимо ввести номер телефона",
		},
		'email': {
			required: "Необходимо ввести адрес электронной почты",
      email: "Не правильный формат электронной почты",
		},
		'surname': {
			required: 'Необходимо указать свою фамилию',
		},
		'name': {
			required: 'Необходимо указать свое Имя',
		},
		'fathername': {
			required: 'Необходимо указать свое Отчество',
		},
	},
	submitHandler: function(form) {
      $(form).ajaxSubmit();
  },
  errorLabelContainer: "#messageBox",
  wrapper: "span",
});

$('#another-form').validate({
	rules: {
		'country': {
			required: true,
		},
		'city': {
			required: true,
		},
		'area': {
			required: true,
		},
		'departament': {
			required: true,
		},
		'tel': {
			required: true,
			tel: true,
		},
		'email': {
			required: true,
			email: true,
		},
		'surname': {
			required: true,
		},
		'name': {
			required: true,
		},
		'fathername': {
			required: true,
		},
	},
	messages: {
		
		'country': {
			required: 'Необходимо указать свою страну',
		},
		'city': {
			required: 'Необходимо указать свой город',
		},
		'area': {
			required: 'Необходимо указать свою область',
		},
		'departament': {
			required: 'Необходимо указать отделение',
		},
		'tel': {
			required: "Необходимо ввести номер телефона",
		},
		'email': {
			required: "Необходимо ввести адрес электронной почты",
      email: "Не правильный формат электронной почты",
		},
		'surname': {
			required: 'Необходимо указать свою фамилию',
		},
		'name': {
			required: 'Необходимо указать свое Имя',
		},
		'fathername': {
			required: 'Необходимо указать свое Отчество',
		},
	},
	submitHandler: function(form) {
      $(form).ajaxSubmit();
  },
  errorLabelContainer: "#messageBox",
  wrapper: "span",
});
});