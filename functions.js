//------------------------------------------------------- receives events from svg images

	function svgevent(evt){
		alert(evt.target.id)
	}

//------------------------------------------------------- first run

	function firstrun(){
		redraw();
		$('#masque-haut').css('background-color','hsla(0,100%,0%,1)');
		$('#masque-bas' ).css('background-color','hsla(0,100%,0%,1)');
	}

//------------------------------------------------------- redraw screen when dimensions change

	function redraw(){

	//------------------------------------------------------- calculate scaled size of content
	// need x offset, y offset and scale

		stored_width = window.innerWidth;
		stored_height = window.innerHeight;
		$('#feedback').val(stored_width+'x'+stored_height);

		var scale = 0;
		var offset_x = 0;
		var offset_y = 0;

		var used_width = stored_width;
		var used_height = stored_height;

	//------------------------------------------------------- fixed content
	// fix for iPhone landscape background

		if (iphonelandscape()) {
			used_height += 60;
		}

	//------------------------------------------------------- calculate offsets & scale of content

		if (used_width/used_height > aspect){ // screen is too wide
			offset_y= 0;
			scale = used_height / reference_height;

			offset_x = Math.round((used_width - (scale * aspect * reference_height)) / 2);
		}
		else{ // screen is too narrow
			offset_x = 0;
			scale = used_width / (reference_height * aspect);

			offset_y = Math.round((used_height - (scale * reference_height)) / 2);
		}

	//------------------------------------------------------- fixed content
	// fix for iPhone landscape background

		if (iphonelandscape()) {
			offset_y -= 60;
		}

	//------------------------------------------------------- fix font size
	// all other font sizes are a percentage of this one, NOT of their parent containers
	// god knows why but 200% works and 100% does not

		$('body').css('font-size',scale*200+'%');

	//------------------------------------------------------- cinema bars
	// draw black bars top & bottom if page too narrow

		cinema(offset_y, reference_height, scale);

	//------------------------------------------------------- fixed content
	// adjust fixed content size

		stylestr = 	'top:'		+ offset_y							+'px;'+
					'left:'		+ offset_x							+'px;'+
					'width:'	+ Math.round(reference_width * scale)	+'px;'+
					'height:'	+ Math.round(reference_height * scale)	+'px;';

		$('#noscroll').attr('style', stylestr);

	//------------------------------------------------------- scrolling content
	// adjust scrolling content size

		stylestr =	'left:'		+ (Math.round(orig_scroll * scale) + offset_x)   +'px;'+
					'width:'	+ Math.round(reference_height * scale)  				 +'px;';

		$('#scroller').attr('style', stylestr);

	//------------------------------------------------------- end named function

}

//------------------------------------------------------- cinema
// adds black bars top & bottom of page and adjusts background image

	function cinema(offset_y,orig_height,scale){
	
		if (offset_y > 0){
			$('#haut, #masque-haut, #masque-bas').css('display','block');

			$('#haut'       ).css('height',offset_y);
			$('#masque-haut').css('height',offset_y);

			$('#masque-bas' ).css('top',offset_y + orig_height * scale);

			// make sure you can scroll to end of images (fills behind masque-bas)
			$('#last').css('padding-bottom',offset_y-1);
		}
		else {
			$('#haut, #masque-haut, #masque-bas').css('display','none');
		}

	}

//------------------------------------------------------- has screen size changed?

	function screenchanged(w, h){
		// $('#feedback').val('iH: '+window.innerHeight+', width: '+stored_width+', height: '+stored_height);
		// $('#feedback').val($('#background').css('top'));
		// $('#feedback').val(stored_width+':'+stored_height);
//		s  = ' '+window.innerHeight;
//		$('#feedback').val(s);
		if (w != stored_width || h != stored_height) return true;
		else return false;
	}

//------------------------------------------------------- test if client is iPhone

	function iphonelandscape(){
		if (stored_width==568 && stored_height==276) return true;
		else return false; 
	}

//------------------------------------------------------- fin
