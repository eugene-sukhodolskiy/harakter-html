$(document).ready(function(){
	console.log("App Ready");
	
	searchHandlers();
	formHandlers();
	adaptiveMenuHandlers();
	new VideoPlayer();
	partnersCarousel();
	popupControl();
	signupControl();
	loginControl();
});

let searchObject;
let videoPlay;

function searchHandlers(){
	searchObject = new Search();
}

function formHandlers(){
	$('.form-container .input').on('focus', function(){
		$(this).parent().addClass('focus');
	}).on('blur', function(){
		if($(this).val().length){
			return false;
		}

		$(this).parent().removeClass('focus');
	});
}

function adaptiveMenuHandlers(){
	$('.sandwitch').on('click', function(){
		$('.navbar').addClass('active');
		setTimeout(function(){
			$('.social-bar').addClass('show');
		}, 200);
		$(this).hide();
		$('.close-nav').show();
	});

	$('.close-nav').on('click', function(){
		$(this).hide();
		$('.sandwitch').show();
		setTimeout(function(){
			$('.navbar').removeClass('active');
		}, 200);
		$('.social-bar').removeClass('show');
	});
}

function popupControl(){
	$('[data-popup]').on('click', function(e){
		e.preventDefault();
		$('.popup.active').removeClass('active');
		let popupName = $(this).attr('data-popup');
		$('.' + popupName).addClass('active');
		$('.popup-back').addClass('active');
		return false;
	});

	$('.popup-back').on('click', function(){
		$('.popup.active').removeClass('active');
		$(this).removeClass('active');
	});
}

function signupControl(){
	$('.signup form').on('submit', function(e){
		e.preventDefault();
		let data = {
			"action": 'th_signup',
			"email": $('.signup [name="email"]').val(),
			"password": $('.signup [name="password"]').val(),
			"password_repeat": $('.signup [name="password_repeat"]').val(),
		};

		$.post('/wp-admin/admin-ajax.php', data, function(resp){
			resp = JSON.parse(resp.split('}')[0]+'}');
			console.log(resp);
			if(resp.signup && resp.signup != 0){
				$('[data-popup="login"]').trigger('click');
			}
		});
	});
}

function loginControl(){
	$('.login form').on('submit', function(e){
		e.preventDefault();
		let data = {
			"action": 'th_login',
			"email": $('.signup [name="email"]').val(),
			"password": $('.signup [name="password"]').val(),
		};

		$.post('/wp-admin/admin-ajax.php', data, function(resp){
			console.log(resp);
			resp = JSON.parse(resp.split('}')[0]+'}');
			if(typeof resp.user != 'undefined'){
				$('.popup-back').trigger('click');
			}
		});
	});
}

function partnersCarousel(){
	$('.partners-carousel').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 6,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
}

function shareCounterPlus(){
	let postId = $(this).attr('data-post-id');
	let data = {
		'post_id': postId,
		'action': 'th_share_counter_plus'
	};

	console.log(data);

	$.post('/wp-admin/admin-ajax.php', data);
	let cc = $($(this).attr('data-counter-container'));
	let count = parseInt(cc.attr('data-counter')) + 1;
	cc.attr('data-counter', count);
	cc.html("(" + count + ")");
}