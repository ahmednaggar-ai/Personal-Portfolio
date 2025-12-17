( function ( $ ) {
	'use strict';
	
	jQuery(document).ready(function() {
	
		// Fullwidth slider
		
		$( '.fullwidth-section' ).each( function() {
		
			$(this).closest( '.vc_row' ).addClass( 'vc_row-fullwidth' );
		
		});
	
		// Veented Slider
		    
    	if( $('.veented-slider').length ) {
    		
    		var previousSlideID = 0;
    						
			var varAutoplay = jQuery('.veented-slider-holder').data('slider-autoplay');
			var varSpeed = jQuery('.veented-slider-holder').data('slider-speed');
			var varLoop = jQuery('.veented-slider-holder').data('slider-loop');
			var varTouch = jQuery('.veented-slider-holder').data('slider-touch');
			var varEffect = jQuery('.veented-slider-holder').data('slider-effect');
			var varDirection = jQuery('.veented-slider-holder').data('slider-direction');
			
			if ( $('#wrapper').hasClass( 'header-transparent' ) ) {
				$('.veented-slider').closest('section').css({ 'paddingTop' : 0 });
			}
			
			var swiper = new Swiper('.veented-slider-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				loop: varLoop,
				autoplay: varAutoplay,
				speed: varSpeed,
				direction: varDirection,
				effect: varEffect,
				simulateTouch: varTouch,
				onInit: function(swiper) {
					swiper.stopAutoplay();
				},
				onImagesReady: function(swiper) {
				
					$('.veented-slider-loader').fadeOut();
					
					swiper.startAutoplay();
					
					if( !$('.veented-slider').hasClass('veented-slider-loaded') ) {
						
						$('.veented-slider').addClass('veented-slider-loaded');
						
						animateSliderContent( true );
						
					}
					
				},
				onSlideChangeStart: function( swiper ) {
				
					if( $('.swiper-slide-active').hasClass('color-scheme-dark') ) {
					
						if( !$('#main-navigation').hasClass('header-scheme-dark') ) {
							$('#main-navigation').addClass('header-scheme-dark');
							$('.veented-slider').removeClass('veented-slider-navigation-white').addClass('veented-slider-navigation-dark');
						}
						
					} else {
						$('#main-navigation').removeClass('header-scheme-dark');
						$('.veented-slider').removeClass('veented-slider-navigation-dark').addClass('veented-slider-navigation-white');
					}
					
				},
				onSlideChangeEnd: function( swiper ) {
					
					if( $('.veented-slider').hasClass('veented-slider-loaded') ) { 
						
						animateSliderContent();
					
					}
					
					
				}
				
			});	
			
			function animateSliderContent( first = false ) {
			
				var sliderElements = [
					".veented-slide-top-heading",
					".veented-slide-heading",
					".veented-slide-subtitle",
					".veented-slide-buttons"
				];
				
				var delay = 50;
				
				if( first == true ) {
					delay = 500;
				}
				
				var activeSlideID = $('.swiper-slide-active').attr('id');
				
				$.each(sliderElements, function(element, elementClass) {
				
					if( $('.' + activeSlideID + ' ' +elementClass).length > 0) {
					
						setTimeout(function(){

						    $('.' + activeSlideID + ' ' +elementClass).addClass( "fadeInUp visible" );
						    
						  }, delay);
						  
						delay += 200;
					  
					}
					  
				});
				
				$('.swiper-slide').not('.swiper-slide-active').find('.animated').stop().removeClass('visible').removeClass('fadeInUp');
				
			}
			
			
			// Scroll after slider button
			
			$('.button-scroll-after-slider').on( 'click', function( event ) {
			
				var sliderHeight = $(this).closest('.veented-slider-holder').height();
				
				jQuery('html,body').stop().animate({ 
					scrollTop: sliderHeight + "px"
				}, 1200);
				
				event.preventDefault();
			
			});
    		
    	}
    	
    	$('.button-scroll').on( 'click', function( event ) {
    	
    		jQuery('html,body').stop().animate({ 
    			scrollTop: jQuery( $anchor.attr('href') ).offset().top + "px"
    		}, 1200, 'easeInOutExpo');
    		event.preventDefault();
    	
    	});
	
		// Hero Slider
		
		if( $('.hero-slider').length ) {
		
			var $heroSlider = $( '.hero-slider-holder' );
			var varAutoplay = $heroSlider.data('autoplay');
			var varSpeed = $heroSlider.data('speed');
			var varLoop = $heroSlider.data('loop');
			var varTouch = $heroSlider.data('touch');
			var varEffect = $heroSlider.data('effect');
			var varDirection = $heroSlider.data('direction');
			
			varSpeed = 300;
			varAutoplay = 7000;

			var swiperHero = new Swiper( '.hero-slider', {
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				autoplay: varAutoplay,
				speed: varSpeed,
				direction: varDirection,
				loop: true,
				onInit: function( swiper ) {
					swiper.stopAutoplay();
				},
				onImagesReady: function( swiper ) {
				
					$('.hero-slider-loader').fadeOut();
					
					swiper.startAutoplay();
					
					if( !$('.hero-slider').hasClass('hero-slider-loaded') ) {
						
						$('.hero-slider').addClass('hero-slider-loaded');
						
					}
					
				},
				onSlideChangeStart: function( swiper ) {
					
					if ( $(window).width() > 1000 && $('#wrapper').hasClass( 'header-transparent' ) ) {
						if( $('.swiper-slide-active').hasClass('color-scheme-dark') ) {
							if( !$('#header').hasClass('header-light') ) {
								$('#header').removeClass('header-dark').addClass('header-light');
							}
							
						} else {
							if( !$('#header').hasClass('header-dark') ) {
								$('#header').removeClass('header-light').addClass('header-dark');
							}
						}
					}
					
				}
				
			});
			
		}
		
		// Simple Swiper Slider
		
		if( $( '.engage-swiper-slider' ).length > 0 ) {
			//engage_swiper_slider();
			$( '.engage-swiper-slider' ).each( function() {
				engage_init_swiper( $(this) );
			});
		}
	
	}); // End (document).ready
	
}( jQuery ));

function engage_get_swiper_settings( $sliderInstance ) {

	var varSpeed = 700;
	var varAutoplay = 24000;
	
	var effect = 'slide';
	
	if ( $sliderInstance.hasClass( 'hero-bg' ) ) {
		effect = 'fade';
	}	
	
	var autoHeight = false;
	
	if ( $sliderInstance.hasClass( 'swiper-auto-height' ) ) {
		autoHeight = true;
	}
	
	var swiperSettings = {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true,
		autoplay: varAutoplay,
		speed: varSpeed,
		effect: effect,
		autoHeight: autoHeight,
		onInit: function( swiper ) {
			jQuery( '.vntd-image-slider li a' ).each( function() {
				jQuery(this).magnificPopup({ 
				  type: 'image',
				  gallery: {
				     enabled:true
				   }
					// other options
				});
			});
			//console.log( swiper );
		}		
	};
	
	return swiperSettings;
	
}

// Init singular slider

function engage_init_swiper( $sliderInstance ) {

	var swiperSettings = engage_get_swiper_settings( $sliderInstance );
	
	if ( $sliderInstance.closest( '.blog-style-masonry' ).length > 0 && ! $sliderInstance.closest( '.blog-style-masonry' ).hasClass( 'cbp-ready' ) ) {
		$sliderInstance.closest( '.blog-style-masonry' ).on( 'initComplete.cbp', function() {
			var swiperEngageSlider = new Swiper( $sliderInstance, swiperSettings );
		});
	} else {
		var swiperEngageSlider = new Swiper( $sliderInstance, swiperSettings );
	}
	
	$sliderInstance.addClass( 'vntd-ready' );
	
}

function engage_swiper_slider() {

	varSpeed = 700;
	varAutoplay = 7000;
	var sliderSelector = '.engage-swiper-slider';
	var $slider = jQuery( '.engage-swiper-slider' );
	
	var swiperSettings = engage_get_swiper_settings();
	
	if ( jQuery( '.engage-swiper-slider' ).closest( '.blog-style-masonry' ).length > 0 && ! jQuery( '.engage-swiper-slider' ).closest( '.blog-style-masonry' ).hasClass( 'cbp-ready' ) ) {
		jQuery( '.engage-swiper-slider' ).closest( '.blog-style-masonry' ).on( 'initComplete.cbp', function() {
			var swiperEngageSlider = new Swiper( sliderSelector, swiperSettings );
		});
	} else {
		var swiperEngageSlider = new Swiper( sliderSelector, swiperSettings );
	}
	
}