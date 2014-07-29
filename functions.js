//------------------------------------------------------- cinema
// adds black bars top & bottom of page and adjusts background image

	function cinema(offset_y,orig_height,scale){
	
		if (offset_y > 0){
			$('#haut'       ).css('display','block');
			$('#masque-haut').css('display','block');
			$('#masque-bas' ).css('display','block');

			$('#haut'       ).css('height',offset_y);
			$('#masque-haut').css('height',offset_y);

			$('#masque-bas' ).css('top',offset_y + orig_height * scale);
		}
		else {
			$('#haut'       ).css('display','none');
			$('#masque-haut').css('display','none');
			$('#masque-bas' ).css('display','none');
		}

		bgheight = Math.round(orig_height * scale);
		stylestr =  'top:'    + offset_y +'px;'+
					'height:' + bgheight +'px;';

		$('#background').attr('style', stylestr);
	}

//------------------------------------------------------- receives events from svg images

	function svgevent(evt){
		alert(evt.target.id)
	}

//------------------------------------------------------- fin
