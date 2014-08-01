//------------------------------------------------------- get initial values for scaling

	var reference_width  = $('#noscroll').width();
	var reference_height = $('#noscroll').height();

	var orig_scroll = $('#scroller').offset().left;
	var aspect      = reference_width/reference_height;

//------------------------------------------------------- beginning named function
//
	var stored_width  = window.innerWidth;
	var stored_height = window.innerHeight;

//------------------------------------------------------- clicks on logo & accueil

	$(document).ready(function() {
		firstrun();

		// if you click on logo it goes back to home page
		$('#logo').click(function(event){ window.location = '/'; });

		// interval to check if screen changed
		setInterval(function(){
			if(screenchanged(window.innerWidth,window.innerHeight))
				redraw();
		},300);

	});

//------------------------------------------------------- fin
