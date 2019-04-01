(function ($) {

	// IDENTICAL HEIGHT OF ELEMENTS
	function heightses(){
		$('.page__catalog .catalog-products-list__title').height('auto').equalHeights();
	}
	$(window).on('load risize', heightses);
	// IDENTICAL HEIGHT OF ELEMENTS -END

	
	// SLIDER HEADER HOME
	var mySwiper = new Swiper ('#slider-products', {
		direction: 'horizontal',
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			992: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			576: {
				spaceBetween: 10,
				slidesPerView: 1,
			}
		}
	});
// SLIDER HEADER HOME -END


	// MAIN MENU BTN
	$('.main-menu a').on('click', function () {
		$('.overlay').addClass('hidden');
		$(".toggle-mnu").removeClass("on");
		$(".main-menu").addClass('d-mobile-none');
	});

	$(".toggle-mnu").on('click', function () {
		$(this).toggleClass("on");
		$(".main-menu").toggleClass('d-mobile-none');
		$('.overlay').toggleClass('hidden');
		return false;
	});

	$('.overlay').on('click', function () {
		$(this).toggleClass('hidden');
		$(".toggle-mnu").toggleClass("on");
		$(".main-menu").toggleClass('d-mobile-none');
	});
	// MAIN MENU BTN -END


	// SCROLL TOP BUTTON
	$('.scroll-top').on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 1500);
	});

	function showBtnScrollTop() {
		if ($(window).scrollTop() > 500 && $(window).scrollTop() > $(window).height()) {
			$('.scroll-top').fadeIn(900);
		}
		else {
			$('.scroll-top').fadeOut(900);
		}
	}
	$(window).on('load scroll', showBtnScrollTop);
	// SCROLL TOP BUTTON -END


	// SLIDER HOME OUR PRODUCTS
	var mySwiper = new Swiper ('#our-products-slider', {
		direction: 'horizontal',
		slidesPerView: 5,
		spaceBetween: 10,
		breakpoints: {
			375: {
				slidesPerView: 2,
				spaceBetween: 10
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 10
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 10
			}
		}
	});
	// SLIDER HOME OUR PRODUCTS -END


	// SLIDER HOME PARTNERS
	var mySwiper = new Swiper ('#partners-slider', {
		direction: 'horizontal',
		slidesPerView: 'auto',
		spaceBetween: 30,
		breakpoints: {
			992: {
				spaceBetween: 30
			}
		}
	});
	// SLIDER HOME PARTNERS -END


	// ВАЛИДАЦИЯ ФОРМЫ FORM-CALLBACK
	$("#callback-form").on('submit', function () {
		var th = $(this);
		let form =  $("#callback-form");
		let inputInfo = form.find('.callback-form__input-info');
		let inputName = form.find('input[name="name"]');
		let inputPhone = form.find('input[name="phone"]');
		let formInfo = form.find('.callback-form__info');
		let formBtnSubmit = form.find('.callback-form__button');
		var fail = false;
		// (func) подбирает регулярное выражение по имени
		function relesFunc(name, el) {
			if (name == 'name') {
				var regn = /^[a-zA-Zа-яёА-ЯЁ]{2,30}$/i;
				return regn.test(el.val());
			}if (name == 'phone') {
				var regp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
				return regp.test(el.val());
			}
		}
		// (func) проверяет по регулярым выражения
		function validateRegExp(varName, relesName, errorText1, errorText2) {
			if (!varName.val()) {
				varName.addClass('error');
				fail = true;
				varName.closest('.input-group').find('.input-info').html(errorText1);
			}else if (!relesFunc(relesName, varName)) {
				varName.addClass('error');
				fail = true;
				varName.closest('.input-group').find('.input-info').html(errorText2);
			}else {
				varName.removeClass('error');
				varName.addClass('success');
				varName.closest('.input-group').find('.input-info').html('');
			}
		}
		//  очищает прошлое сообщение
		formInfo.html('');
		formBtnSubmit.html('Отправка <i class="fas fa-spinner"></i>').addClass('disabled-btn');
		inputInfo.html('');
		// проверка полей
		validateRegExp(inputName, 'name', 'Обязательное поле! <span>*</span>', 'Некоректное Имя <span>*</span>');
		validateRegExp(inputPhone, 'phone', 'Обязательное поле! <span>*</span>', 'Некоректный телефон <span>*</span>');
		// вывод ошибки на экран
		if (fail) {
			formInfo.removeClass('info_acces');
			formInfo.addClass('info_error');
			formInfo.html('<p>Ошибка отправки формы, проверте поля на правильность. <span>*</span></p>');
			formBtnSubmit.html('Отправить').removeClass('disabled-btn');
			return false;
		}else {
			form.find('input').attr('readonly', '');
			formBtnSubmit.attr('readonly', '');
		}
		// отправка формы
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			// уберает показ ошибок
			form.find('input').removeClass('error success');
			formInfo.html('');
			// показывает сообщение успешной отправки
			formInfo.removeClass('info_error');
			formInfo.addClass('info_acces');
			setTimeout( function () {
				formInfo.html('<p>Форма успешно отправлена, спасибо. В ближайшее время мы с Вами свяжемся.</p>');
				formBtnSubmit.html('Отправить').removeClass('disabled-btn');
				form.find('input').removeAttr('readonly');
				formBtnSubmit.removeAttr('readonly');
				th.trigger("reset");
			}, 800);
		}).fail(function(){
			// уберает показ ошибок
			form.find('input').removeClass('error success');
			formInfo.html('');
			// показывает сообщение ошибки отправки
			formInfo.removeClass('info_acces');
			formInfo.addClass('info_error');
			setTimeout(function () {
				formInfo.html('<p>Ошибка отправки формы на сервер! Отправьте заявку позже. Приносим свои извинения. <span>*</span></p>');
				formBtnSubmit.html('Отправить').removeClass('disabled-btn');
				form.find('input').removeAttr('readonly');
				formBtnSubmit.removeAttr('readonly');
				th.trigger("reset");
			}, 800);
		});
		return false;
	});
	//ВАЛИДАЦИЯ ФОРМЫ FORM-CALLBACK -END


	// INPUT MASK
	$('#callback-form input[name="phone"]').mask('+7 (999) 999-99-99', {
		placeholder: "Ваш телефон",
		selectOnFocus: true
	});
	// INPUT MASK


	// SCROLL TO CALLBACK
	$('.contact-phone__callback').on('click', function (e) {
		e.preventDefault();
		let sectionLink = $(this).attr('href');
		let sectionOffsetTop = $(sectionLink).offset().top;
		let offset = 100;
		$('html, body').animate({ scrollTop: sectionOffsetTop - offset }, 1000);
	});
	// SCROLL TO CALLBACK -END


	// MAGNIFIC POPUP GALLERY HOME
	$('.modern-production_gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function (item) {
				return item.el.attr('title') + '';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}
	});
	// MAGNIFIC POPUP GALLERY HOME -END


	// PRODUCT TABS
	var tabMainWrapper = $('.product-block-info__block-characteristic');
	var tabs = $('.product-block-info__tab');
	var tabsContent = $('.product-block-info__tab-content');

	$('.product-block-info__tab-content:not(:first-of-type)').hide();
	$('.product-block-info__tab:first-of-type').addClass('active');

	tabs.each(function(index){
		$(this).attr('data-tab', index);
	});
	tabsContent.each(function(index){
		$(this).attr('data-tab', index);
	});

	tabs.on('click', function(){
		if( $(this).hasClass('active') )
			return false;
		let dataTab = $(this).attr('data-tab');
		tabs.removeClass('active');
		$(this).addClass('active');
		tabsContent.hide();
		let tabContent = tabMainWrapper.find('.product-block-info__tab-content[data-tab="' + dataTab + '"]');
		if( tabContent.length != 0 )
			tabContent.fadeIn();
	});
	// PRODUCT TABS -END


	// PRODUCT MAIN IMAGE SLIDER 
	var productMainImageWrapper =  $('.product-main-images');
	var productMainSrcLoad = productMainImageWrapper.find('.product-main-images__main-image img').attr('src');
	var productActiveThumbnail = productMainImageWrapper.find('.product-main-images__thumbnail img[src="'+productMainSrcLoad+'"]');

	// если, есть thumbnail с src = src главной картинки делаем его активным
	if( productActiveThumbnail.length != 0 ){
		productActiveThumbnail.closest('.product-main-images__thumbnail').addClass('active');
	}

	productMainImageWrapper.find('.product-main-images__thumbnail').on('click', function(){

		let productMainSrc = productMainImageWrapper.find('.product-main-images__main-image img').attr('src');
		let thumbnailSrc = $(this).children('img').attr('src');

		if( productMainSrc == thumbnailSrc ){return false;}

		productMainImageWrapper.find('.product-main-images__thumbnail').removeClass('active');
		$(this).addClass('active');
		productMainImageWrapper.find('.product-main-images__main-image img').attr('src', thumbnailSrc);
	});
	// PRODUCT MAIN IMAGE SLIDER -END


	// SLIDER PRODUCT FEEDBACK
	var mySwiper = new Swiper ('#feedback-slider', {
		direction: 'horizontal',
		slidesPerView: 4,
		spaceBetween: 30,
		breakpoints: {
			992: {
				spaceBetween: 10,
				slidesPerView: 4,
			},
			768: {
				spaceBetween: 30,
				slidesPerView: 3,
			},
			576: {
				spaceBetween: 20,
				slidesPerView: 3,
			},
			450: {
				spaceBetween: 10,
				slidesPerView: 2,
			}
		}
	});
	// SLIDER PRODUCT FEEDBACK -END


	// MAGNIFIC POPUP GALLERY HOME
	$('.feedback-slider__gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function (item) {
				return item.el.attr('title') + '';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}
	});
	// MAGNIFIC POPUP GALLERY HOME -END

	
	// PRELOADER (img load)
	var preloader =  $('.preloader-container'),
	imageCount = $('img').length,
	persent = 100 / imageCount,
	progress = 0,
	loaded_img = 0;

	console.log({'image_count': imageCount});
	for( let i = 0; i < imageCount; i++ ){
		var img_copy = new Image();
		img_copy.src = document.images[i].src;
		img_copy.onload = img_load;
		img_copy.onerror = img_load;
	}
	function img_load(){
		progress += persent;
		loaded_img++;
		if( progress >= 100 || loaded_img == imageCount ){
			$('html').removeClass('overflow-hidden');
			preloader.delay(400).fadeOut('slow');
		}
	}
	// PRELOADER (img load) -END


	// CATALOG MENU ON HOME PAGE
	$('.catalog-products_menu .catalog-products-list').on('click', function(){

		const windowWidth = Math.max(
			$(window).width(), $(window).innerWidth(),
			$(window).outerWidth(), $(window).outerWidth(true)
		);

		if( windowWidth < 768 ){
		
			if( $(this).hasClass('on') ){
				$(this).closest('.catalog-products_menu').find('.catalog-products-list').removeClass('on');
			}
			else{
				$(this).closest('.catalog-products_menu').find('.catalog-products-list').removeClass('on');
				$(this).addClass('on');
			}

			$(document).on('click', function(e){

				let element = $('.catalog-products_menu .catalog-products-list');
		
				if( !element.is(e.target) && element.has(e.target).length === 0 && element.hasClass('on') ){
					element.removeClass('on');
				}
			});
		}
	});
	// CATALOG MENU ON HOME PAGE -END


	// PRODUCT SERTS
	$('.popup-sert').magnificPopup({
		type: 'inline',
		preloader: true,
	});
	$('[data-fancybox="gallery"]').fancybox({});
	// PRODUCT SERTS


})(jQuery);


// IFRAME VIDEO YOUTUBE IN PROMO SECTION
'use strict';
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
	if (!document.getElementsByClassName) {
		// Поддержка IE8
		var getElementsByClassName = function(node, classname) {
				var a = [];
				var re = new RegExp('(^| )'+classname+'( |$)');
				var els = node.getElementsByTagName("*");
				for(var i=0,j=els.length; i<j; i++)
						if(re.test(els[i].className))a.push(els[i]);
				return a;
		}
		var videos = getElementsByClassName(document.body,"youtube");
	} else {
		var videos = document.getElementsByClassName("youtube");
	}

	var nb_videos = videos.length;
	for (var i=0; i<nb_videos; i++) {
		// Находим постер для видео, зная ID нашего видео
		videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

		// Размещаем над постером кнопку Play, чтобы создать эффект плеера
		var play = document.createElement("div");
		play.setAttribute("class","play");
		videos[i].appendChild(play);

		videos[i].onclick = function() {
			// Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
			var iframe = document.createElement("iframe");
			var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1";
			if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
			iframe.setAttribute("src",iframe_url);

			this.style.backgroundImage = '';
			this.removeChild(play);
			this.appendChild(iframe); 
		}
	}
});
// IFRAME VIDEO YOUTUBE IN PROMO SECTION -END