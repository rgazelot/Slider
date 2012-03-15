(function($) {
	$.fn.slider = function(args) {
		var $this = $(this);
		
		/* Defaults */
		var defaults = {
			speed: 300
		};
		
		/* Globals */
		var nb_img = args.imgs.length;
		var token = 0;
		
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
			
			/* List and buttons */
			$this.append('<ul></ul><a id="slider_next" href="next"></a><a id="slider_previous" href="previous"></a>');
			$('#slider_next').css({top:top+'px'});		
			$('#slider_previous').css({top:top+'px'});
			var $ul = $this.children('ul');
			for(i=0;i<nb_img;i++){
				if(i==0){
					$ul.append('<li class="enable"></li>');
				}else{
					$ul.append('<li class="disable"></li>');
				}
			}
			$ul.css({left:left+'px'});

		/* 
		 * Functions 
		 */
		
			setTimeout(Animate,5000);
			
			/* Rotate */
			function Animate(){
				if(token++ == (nb_img-1)) token = 0;
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
				setTimeout(Animate,5000);
			}
			
			/* Next */
			function Next(){
				if(token++ == (nb_img-1)) token = 0;
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
			}
			
			/* Previous */
			function Previous(){
				token--;
				if(token == -1){token = 2;}
				$('#slider_container').animate({left:'-'+(width*token)+'px'});
			}
		
		/* 
		 * Slider behavior 
		 */
		
			$this.on('mouseover',function(){
				$('#slider_next').stop().animate({right:'8px'},opts.speed);
				$('#slider_previous').stop().animate({left:'8px'},opts.speed);
				$ul.stop().animate({bottom:'15px'},opts.speed);
			});
			$this.on('mouseout',function(){
				$('#slider_next').stop().animate({right:'-35px'},opts.speed);
				$('#slider_previous').stop().animate({left:'-35px'},opts.speed);
				$ul.stop().animate({bottom:'-20px'},opts.speed);
			});
			$('#slider_next').on('click',function(){
				Next();
				return false;
			});
			$('#slider_previous').on('click',function(){
				Previous();
				return false;
			});
		
		return $this;
	};
})(jQuery);


/* TODO 


*/
	
