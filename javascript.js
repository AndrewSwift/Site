//------------------------------------------------------- functions

	function dessiner(w,h){
	// envoie le format de chaque élément de la page
	// 4+37+100+9 = 150%

			// ratio pour convertir de pourcent en pixels
			ratio = h/100;

			// montant de supp' de chaque côté de notre page
			extra = Math.round((w-(h*1.5))/2);

			// positionnement des images de portfolio
			marge = Math.round((4+37)*ratio);

			$('#scroller').css({width:h, left:extra+marge});

			// marge blanche autour des images de portfolio
			marge = Math.round(h*.05);
			$('#scroller img').css({width:h-marge,padding:marge/2});

			$('#accueil').css({width:h,padding:0});
	}

	function haschanged(){
		if (realw != $(window).width() || realh != $(window).height()){
			realw = $(window).width();
			realh = $(window).height();
			workh = narrow(realw,realh);

			cinema(realw,realh,workh);
			//desslogo(realw,realh,workh);
		}
	}

	function cinema(realw,realh,workh){
	// rajoute des barres noires dessus/dessous si la page est trop étroite
	
		if (realh != workh){
			d = Math.round((realh-workh)/2);

			topp = workh+d;

			$('#haut').css('height',d+'px');
			$('#masque-haut').css('height',d+'px');
			$('#masque-bas').css('top',topp+'px');
		}
		else {
			$('#haut').css('height','0px');
			$('#masque-haut').css('height','0px');
			$('#masque-bas').css('height','0px');
		}
	}

	function cinema_old(realw,realh,workh){
	// rajoute des barres noires dessus/dessous si la page est trop étroite
	
		if (realh != workh){
			d = Math.round((realh-workh)/2);

			$('#haut').css('height',d+'px');
			$('#masque-haut').css('height',d+'px');
			$('#masque-bas').css('height',d+'px');
		}
		else {
			$('#haut').css('height','0px');
			$('#masque-haut').css('height','0px');
			$('#masque-bas').css('height','0px');
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

//------------------------------------------------------- global variables

	ratio = 3/2; // width and height of main image

	// to see if window changes size, we need to keep
	// a record of its size at all times
	realw = $(window).width();
	realh = $(window).height();

	// if the screen is too narrow, we use an artificial height
	// and put black bars above and below

	if (realw/realh>ratio){ // screen is too wide
		workw = Math.round(realh*ratio);
		workh = realh;
		extrax = Math.round((realw-workw)/2);
		extray = 0;
	}
	else{ // screen is too narrow
		workw = realw;
		workh = Math.round(workw/1.5);
		extray = Math.round((realh-workh)/2);
		extrax = 0;
	}

	conversion = workh/1000;


//------------------------------------------------------- startup

	cinema(realw,realh,workh);
	dessiner(realw,workh);

	fontsize = Math.round(100*conversion);
	$('body').css('font','normal '+fontsize+'px/'+fontsize+'px Abel');

	dimlogo   = ['#logo',  'width' ,350,'right',1500-380,'top',374];

	dimombreg = ['#ombreg','height',667,'right',1500-410,'top',250 ];
	dimombred = ['#ombred','height',667,'left' ,1410    ,'top',250 ];

	dimombreh = ['#ombreh','width',1700,'left',-100,     'top' ,440];
	dimombreb = ['#ombreb','width',1700,'left',-100,     'top' ,780];

	dimmenu    = ['#menu   ','width',170,'right',1500-380,'top',525];
	dimcontact = ['#contact','height',25,'right',1500-380,'top',815];

	desslogo(dimlogo);
	desslogo(dimombreg);
	desslogo(dimombred);
	desslogo(dimombreh);
	desslogo(dimombreb);
	desslogo(dimmenu);
	desslogo(dimcontact);

//------------------------------------------------------- descend quand on clique sur l'image d'accueil

	$(document).ready(function() {
		$("#accueil").click(function(event){
		    $('html, body').animate({scrollTop:workh/5}, 300);
		});
	});

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

//------------------------------------------------------- fin
