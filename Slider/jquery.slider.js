(function($) {
	$.fn.slider = function(args) {
		var $this = $(this);
		
		/* Defaults */
		var defaults = {
			speedDisplay: 300,
			speedAnimation: 5000,
		};
		
		/* Globals */
		var nb_img = args.imgs.length,token = 0,t,nb;
		
		/* Options */
		var opts = $.extend(defaults, args);
		
		/* 
		 * Slider properties 
		 */
			var height = $this.css('height'),
			    width  = $this.css('width');
			height = height.substr(0,(height.length-2));
			width = width.substr(0,(width.length-2));
			var top = ((height*50)/100)-17,
			    left = ((width*50)/100)-(nb_img*26)/2;
		
		/* 
		 * Creating elements 
		 */
		 	/* Slider container */
			$this.append('<div id="slider_container"></div>');
			$('#slider_container').css({height:height+'px', width:(width*nb_img)+'px'});
			
			/* Images */
			for(i=0;i<nb_img;i++){
				$('#slider_container').append('<img src="'+opts.imgs[i]+'" height="" widht=""/>');
			}
			
			/* List */
			$this.append('<ul></ul><a id="slider_next" href="next"></a><a id="slider_previous" href="previous"></a>');
			$('#slider_next').css({top:top+'px'});		
			$('#slider_previous').css({top:top+'px'});
			var $ul = $this.children('ul');
			
			for(i=0;i<nb_img;i++){
				if(i==0){
					$ul.append('<li nb="'+(i+1)+'" class="enable"></li>');
				}else{
					$ul.append('<li nb="'+(i+1)+'" class="disable"></li>');
				}
			}
			
			$ul.css({left:left+'px'});

		/* 
		 * Functions 
		 */
			Animate();
			
			/* Rotate */
			function Animate(){
				t = setInterval(function(){	
					$ul.children('li:nth-child('+(token+1)+')').removeClass('enable').addClass('disable');
					if(token++ == (nb_img-1)) token = 0;
					$('#slider_container').animate({left:'-'+(width*token)+'px'});
					$ul.children('li:nth-child('+(token+1)+')').removeClass('disable').addClass('enable');
				},opts.speedAnimation);
			}
			
			/* Next */
			function Next(){
				$ul.children('li:nth-child('+(token+1)+')').removeClass('enable').addClass('disable');
				if(token++ == (nb_img-1)) token = 0;
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				$ul.children('li:nth-child('+(token+1)+')').removeClass('disable').addClass('enable');
			}
			
			/* Previous */
			function Previous(){
				$ul.children('li:nth-child('+(token+1)+')').removeClass('enable').addClass('disable');
				token--;
				if(token == -1){token = 2;}
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				$ul.children('li:nth-child('+(token+1)+')').removeClass('disable').addClass('enable');
			}
		
		/* 
		 * Slider behavior 
		 */
		 	/* Mouseover Slider */
			$this.on('mouseover',function(){
				$('#slider_next').stop().animate({right:'8px'},opts.speedDisplay);
				$('#slider_previous').stop().animate({left:'8px'},opts.speedDisplay);
				$ul.stop().animate({bottom:'15px'},opts.speedDisplay);
			});
			
			/* Mouseout Slider */
			$this.on('mouseout',function(){
				$('#slider_next').stop().animate({right:'-35px'},opts.speedDisplay);
				$('#slider_previous').stop().animate({left:'-35px'},opts.speedDisplay);
				$ul.stop().animate({bottom:'-20px'},opts.speedDisplay);
			});
			
			/* Click Next */
			$('#slider_next').on('click',function(){
				clearInterval(t);
				Next();
				Animate();
				return false;
			});
			
			/* Click Previous */
			$('#slider_previous').on('click',function(){
				clearInterval(t);
				Previous();
				Animate();
				return false;
			});
			
			/* Click list */
			$ul.children('li').on('click',function(){
				clearInterval(t);
				nb = $(this).attr('nb');
				$ul.children('li:nth-child('+(token+1)+')').removeClass('enable').addClass('disable');
				token = nb-1;
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				$ul.children('li:nth-child('+nb+')').removeClass('disable').addClass('enable');
				Animate();
			});
		
		return $this;
	};
})(jQuery);