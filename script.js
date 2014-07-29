//------------------------------------------------------- get initial values for scaling

	var stored_width  = $('#noscroll').width();
	var stored_height = $('#noscroll').height();

	var orig_scroll = $('#scroller').offset().left;
	var aspect = stored_width/stored_height;

//------------------------------------------------------- beginning named function

	function redraw(){

	//------------------------------------------------------- calculate scaled size of content
	// need x offset, y offset and scale

		var win_w = $(window).width();
		var win_h = $(window).height();

		var scale = 0;
		var offset_x = 0;
		var offset_y = 0;

	//------------------------------------------------------- calculate offsets & scale of content

		if (win_w/win_h > aspect){ // screen is too wide
			offset_y= 0;
			scale = win_h / stored_height;

			offset_x = Math.round((win_w - (scale * aspect * stored_height)) / 2);
		}
		else{ // screen is too narrow
			offset_x = 0;
			scale = win_w / (stored_height * aspect);

			offset_y = Math.round((win_h - (scale * stored_height)) / 2);
		}

	//------------------------------------------------------- fix font size
	// all other font sizes are a percentage of this one, NOT of their parent containers
	// god knows why but 200% works and 100% does not

		$('body').css('font-size',scale*200+'%');

	//------------------------------------------------------- cinema bars
	// draw black bars top & bottom if page too narrow

		cinema(offset_y, stored_height, scale);

	//------------------------------------------------------- fixed content
	// adjust fixed content size

		stylestr = 	'top:'		+ offset_y							+'px;'+
					'left:'		+ offset_x							+'px;'+
					'width:'	+ Math.round(stored_width * scale)	+'px;'+
					'height:'	+ Math.round(stored_height * scale)	+'px;';

		$('#noscroll').attr('style', stylestr);

	//------------------------------------------------------- scrolling content
	// adjust scrolling content size

		stylestr =	'left:'		+ (Math.round(orig_scroll * scale) + offset_x)   +'px;'+
					'width:'	+ Math.round(stored_height * scale)  				 +'px;';

		$('#scroller').attr('style', stylestr);

	//------------------------------------------------------- end named function

}

//------------------------------------------------------- first run

	function firstrun(){
		redraw();
		$('#masque-haut').css('background-color','hsla(0,0%,0%,1)');
		$('#masque-bas' ).css('background-color','hsla(0,0%,0%,1)');
	}

//------------------------------------------------------- clicks on logo & accueil

	$(document).ready(function() {
		firstrun();

		// if you click on logo it goes back to home page
		$('#logo').click(function(event){ window.location = '/'; });

		// interval to check if screen changed
		setInterval(function(){
			if(screenchanged($('#noscroll').width(),$('#noscroll').width()))
				redraw();
		},1000);

	});

//------------------------------------------------------- has screen size changed?

	function screenchanged(w, h){
		if (w != stored_width || h != stored_height) return true;
		else return false;
	}

//------------------------------------------------------- fin
