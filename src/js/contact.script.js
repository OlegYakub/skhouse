var offices = [
	{
		position: {lat: 49.994495, lng: 36.232682},
		elementId: 'contact-map1',
		information: {
			adress: 'Украина, г. Харьков, ст. м. «Исторический музей», ул. Сумская, 10, ТЦ «AVE PLAZA», 3 этаж,',
			tel: '+38 (093) 761-78-21',
			time: 'График работы: с 10:00 до 21:00 без перерывов и выходных '
		}
	},
	{
		position: {lat: 50.429608, lng: 30.360301},
		elementId: 'contact-map2',
		information: {
			adress: 'Украина, г. Киев, ул. Большая кольцевая, 4',
			tel: '+38 (044) 511-11-25',
			time: ''
		}
	},
	{
		position: {lat: 55.728068, lng: 37.612674},
		elementId: 'contact-map3',
		information: {
			adress: 'Россия, г. Москва, Калужская пл., 1',
			tel: '+7 (499) 404-00-27',
			time: ''
		}
	},
]

function initMap() {

	offices.forEach(function(item, index){
		var map = new google.maps.Map(document.getElementById(item.elementId), {
	    center: item.position,
	    zoom: 16,
	    fullscreenControl: false,

	  });

	  var marker = new google.maps.Marker({
			position: item.position,
	    map: map,
	    icon: 'data:image/svg+xml;utf-8,\
	    	<svg \
					xmlns="http://www.w3.org/2000/svg"\
					xmlns:xlink="http://www.w3.org/1999/xlink"\
					width="30px" height="40px">\
					<path fill-rule="evenodd"  fill="rgb(204, 29, 141)"\
					 d="M15.000,0.001 C6.729,0.001 0.000,6.607 0.000,14.726 C0.000,16.844 0.442,18.866 1.312,20.737 C5.062,28.793 12.252,37.299 14.367,39.714 C14.526,39.894 14.757,39.999 15.000,39.999 C15.243,39.999 15.474,39.894 15.633,39.714 C17.747,37.299 24.937,28.795 28.688,20.737 C29.558,18.866 30.000,16.844 30.000,14.726 C29.999,6.607 23.270,0.001 15.000,0.001 ZM15.000,22.375 C10.703,22.375 7.208,18.943 7.208,14.726 C7.208,10.508 10.703,7.077 15.000,7.077 C19.296,7.077 22.791,10.508 22.791,14.726 C22.791,18.943 19.296,22.375 15.000,22.375 Z"/>\
				</svg>',
	  });

	  var info = '<div>\
	  	<div class="info-window__container">\
		  	<div class="info-window__p">'+ item.information.adress +'</div>\
		  	<div class="info-window__p">тел.: '+ item.information.tel +'</div>\
		  	<div class="info-window__p">'+ item.information.time +'</div>\
	  	</div>\
	  </div>'

	  var infowindow = new google.maps.InfoWindow({
	  	content: info,
	  	maxWidth: 370,
	  });

	  google.maps.event.addListener(marker, 'mouseover', function() {
	    infowindow.open(map, marker);
	  });

	  google.maps.event.addListener(marker, 'mouseout', function() {
	    infowindow.close(map, marker);
	  });
	})
}



