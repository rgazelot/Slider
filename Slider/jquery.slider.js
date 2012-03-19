(function($) {
	$.fn.slider = function(args) {
		var $this = $(this);
		
		/* Defaults */
		var defaults = {
			speedDisplay: 300,
			speedAnimation: 5000,
			arrows : true,
			frame : false,
			loader : false,
			colorLoader : '#eee',
		};
		
		/* Globals */
		var nb_img = args.imgs.length,token = 0,t,l,nb;
		
		/* Options */
		var opts = $.extend(defaults, args);
		
		/* 
		 * Slider properties 
		 */
			var height = $this.css('height'),
			    width  = $this.css('width');
			height = height.substr(0,(height.length-2));
			width = width.substr(0,(width.length-2));
			var left = ((width*50)/100)-(nb_img*26)/2;
			
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
			
			/* Buttons */
			if(opts.arrows === true){
				$this.append('<a id="slider_next" href="next"></a><a id="slider_previous" href="previous"></a>');
				var buttonHeight = $('#slider_next').css('height'),
					buttonWidth  = $('#slider_next').css('width');
				buttonHeight = (buttonHeight.substr(0,(buttonHeight.length-2)))/2;
				buttonWidth = Math.ceil(buttonWidth.substr(0,(buttonWidth.length-2)));
				var top = ((height*50)/100)-buttonHeight;
			   	$('#slider_next').css({top:top+'px',right:'-'+(buttonWidth+4)+'px'});		
				$('#slider_previous').css({top:top+'px',left:'-'+(buttonWidth+4)+'px'});
			}
			
			/* List */
			$this.append('<ul></ul>');
			var $ul = $this.children('ul');
			for(i=0;i<nb_img;i++){
				if(i==0){
					$ul.append('<li nb="'+(i+1)+'" class="slider_enable"></li>');
				}else{
					$ul.append('<li nb="'+(i+1)+'" class="slider_disable"></li>');
				}
			}
			$ul.css({left:left+'px'});
			
			/* Frame */
			if(opts.frame === true){
				$this.append('<div id="slider_frame"></div>');
			}
			
			/* Loader */
			if(opts.loader === true){
				$this.append('<div id="slider_container_loader"><div id="slider_loader" style="background-color:'+opts.colorLoader+'"></div></div>');
			}

		/* 
		 * Functions 
		 */
			Animate();
			if(opts.loader === true){
				Loader();
			}
			
			
			/* Rotate */
			function Animate(){
				t = setInterval(function(){	
					$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_enable').addClass('slider_disable');
					if(token++ == (nb_img-1)) token = 0;
					$('#slider_container').animate({left:'-'+(width*token)+'px'},'easeInOutElastic');
					$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_disable').addClass('slider_enable');
					if(opts.loader === true){
						$('#slider_loader').stop().css({width:'0%'});
						Loader();
					}
				},opts.speedAnimation);
			}
			
			function Loader(){
				$('#slider_loader').animate({width:'100%'},(opts.speedAnimation-10),'linear',function(){
					$('#slider_loader').css({width:'0%'});
				});
			}
		
			/* Next */
			function Next(){
				$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_enable').addClass('slider_disable');
				if(token++ == (nb_img-1)) token = 0;
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_disable').addClass('slider_enable');
				if(opts.loader === true){
					$('#slider_loader').stop().css({width:'0%'});
					Loader();
				}
			}
			
			/* Previous */
			function Previous(){
				$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_enable').addClass('slider_disable');
				token--;
				console.log(token);
				if(token == -1){token = (nb_img-1);}
				console.log(token);
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_disable').addClass('slider_enable');
				if(opts.loader === true){
					$('#slider_loader').stop().css({width:'0%'});
					Loader();
				}
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
				$('#slider_next').stop().animate({right:'-'+(buttonWidth+4)+'px'},opts.speedDisplay);
				$('#slider_previous').stop().animate({left:'-'+(buttonWidth+4)+'px'},opts.speedDisplay);
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
				$ul.children('li:nth-child('+(token+1)+')').removeClass('slider_enable').addClass('slider_disable');
				token = nb-1;
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				$ul.children('li:nth-child('+nb+')').removeClass('slider_disable').addClass('slider_enable');
				if(opts.loader === true){
					$('#slider_loader').stop().css({width:'0%'});
					Loader();
				}
				Animate();
			});
		
		return $this;
	};
})(jQuery);