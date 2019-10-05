//	vars
var $bdy = $('body'),
	$win = $(window),
	$wrp = $('#wrap'),
	activatedSlides = [1];

function getYear() {
	var date = new Date(),
		year = date.getFullYear();

	return year;
}

function getMaxValue(array) {
	var max = array[0];
	for (var i = 0; i < array.length; i++) {
		if (max < array[i]) max = array[i];
	}
	return max;
}

function pageToScrolled() {
	if ($win.width() < 960) {
		$('#m-sections').find('.section').each(function () {
			var $section = $(this),
				screen = $win.scrollTop() + $win.height(),
				offTop = $section.offset().top + $section.height();

			if (screen >= offTop) {
				var activePageNum = $section.index() + 1;

				for (var c = 0; c < activatedSlides.length; c++) {
					var maxVal = getMaxValue(activatedSlides);

					if (activePageNum > maxVal) {
						activatedSlides.push(activePageNum);
						//ga('send', 'event', 'Scroll to ' + getMaxValue(activatedSlides));
						console.log('Scroll to ' + getMaxValue(activatedSlides));
					}
				}
			}
		});
	}
}

$win.on('load scroll', function () {
	pageToScrolled();
});

//	doc ready
$(function () {

	//	load
	$('.contents__image img').imagesLoaded(function () {
		$bdy.addClass('loaded');
	});

	//	date
	$('.currentYear').text(getYear());

	//	slider
	

	//ga('send', 'event', 'Scroll to 1');
	console.log('Scroll to ' + getMaxValue(activatedSlides));

	var $sliderFake = $('.slider--fake'),
		$sliderTrue = $('.slider--true'),
		iSlide = $('.slider--fake').find('.slide').length,
		isMoving = false,
		i = 0;

	$sliderFake
		.slick({
			vertical: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchMove: false,
			infinite: false,
			arrows: false,
			initialSlide: iSlide
		});

	$sliderTrue
		.slick({
			vertical: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			verticalSwiping: true,
			touchMove: false,
			infinite: false,
			arrows: false,
			dots: true,
			appendDots: $('.half--right'),
			dotsClass: 'nav'

		})
		.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var nextSlideNum = nextSlide + 1;

			for (var c = 0; c < activatedSlides.length; c++) {
				var maxVal = getMaxValue(activatedSlides);

				if (nextSlideNum > maxVal) {
					activatedSlides.push(nextSlideNum);
					//ga('send', 'event', 'Scroll to ' + getMaxValue(activatedSlides));
					console.log('Scroll to ' + getMaxValue(activatedSlides));
				}
			}

			isMoving = true;
			$sliderFake.slick('slickGoTo', iSlide - nextSlide - 1);
		})
		.on('afterChange', function (event, slick, currentSlide) {
			isMoving = false;
			i = 0;
		})
		.on('mousewheel', function (event) {
			if (isMoving === false && i === 0) {
				if (event.deltaY > 0) {
					$sliderTrue.slick('slickPrev');
				} else {
					$sliderTrue.slick('slickNext');
				}
			}
			i++;
		});

});
