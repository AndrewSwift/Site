//------------------------------------------------------- functions

	function haschanged(){
		if (realw != $(window).width() || realh != $(window).height()){
			realw = $(window).width();
			realh = $(window).height();
			workh = narrow(realw,realh);

			cinema(realw,realh,workh);
			//desslogo(realw,realh,workh);
		}
	}


	function desslogo(obj){

			// logodim = ['#logo','width',350,'right',1500-380,'bottom',1000-490];
			t = Math.round(obj[2] * conversion);
			x = Math.round(obj[4] * conversion + extrax);
			y = Math.round(obj[6] * conversion + extray);

			str = obj[1]+':'+t+'px;'+obj[3]+':'+x+'px;'+obj[5]+':'+y+'px;';
			$(obj[0]).attr('style',str);

	}

//------------------------------------------------------- fin

	function msup(obj){
		$('#zoomimg').hide();

		$('#zoom').css('width','0%');
		$('#zoomtxt').css('left',-10000);
	}

	function msdown(obj,marj,txtg,txth){

		ow = obj.width;
		oh = obj.height;
		or = ow/oh;

		ww = realw
		wh = realh
		wr = ww/wh;


		if (or<wr){ // TALL: if the image is narrower than the screen, we limit the height and calculate the width
			newh = realh * .8;
			newp = newh * 0.001 * marj;
			newh -= newp * 2;

			neww = newh * or;
			newm = (realh-newh-newp*2)/2;

		}
		else { // WIDE: if the image is shorter than the screen, we limit the width and calculate the height
			neww = realw * .8;
			newp = neww * 0.001 * marj;
			neww -= newp * 2;

			newh = neww / or;
			newm = (realh-newh-newp*2)/2;


		}

		// newm -= newp;

		$('#zoomimg').css('width',Math.round(neww));
		$('#zoomimg').css('height',Math.round(newh));
		$('#zoomimg').css('margin-top',Math.round(newm));

		$('#zoomimg').css('padding',Math.round(newp));
		$('#zoomimg').attr('src',obj.src);
		$('#zoomimg').show();
		$('#zoom').css('width','100%');

		updatetext(obj,txtg,txth);
	}

	function updatetext(obj,txtg,txth){
		// $(".text").load("helloworld.txt");
		s = obj.src + '.txt?' + Math.random();
		$('#zoomtxt').load(s);
		$('#zoomtxt').css('left',txtg);
		$('#zoomtxt').css('top',txth);
// if text is to right, reverse rotation
	}

//------------------------------------------------------- cinema
// adds black bars top & bottom of page and adjusts background image

	function cinema(offset_y,orig_height,scale){
	
		if (offset_y > 0){
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

//------------------------------------------------------- content

	function content(offset, wid){
			$('#scroller').css({left:offset, width:wid});
	}

//------------------------------------------------------- fin
