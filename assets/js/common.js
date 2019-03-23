(function ($) {

	// SLIDER HEADER HOME
	var mySwiper = new Swiper ('#slider-products', {
		direction: 'horizontal',
		slidesPerView: 'auto',
		spaceBetween: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
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
		spaceBetween: 40,
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

})(jQuery);