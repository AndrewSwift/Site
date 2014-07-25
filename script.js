//------------------------------------------------------- get initial values for scaling

	var orig_width  = $('#noscroll').width();
	var orig_height = $('#noscroll').height();

	var aspect = orig_width/orig_height;

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
		scale = win_h / orig_height;

		offset_x = Math.round((win_w - (scale * aspect * orig_height)) / 2);
	}
	else{ // screen is too narrow
		offset_x = 0;
		scale = win_w / (orig_height * aspect);

		offset_y = Math.round((win_h - (scale * orig_height)) / 2);
	}

//------------------------------------------------------- fix font size
// all other font sizes are a percentage of this one, NOT of their parent containers
// god knows why but 200% works and 100% does not

	$('body').css('font-size',scale*200+'%');

//------------------------------------------------------- cinema bars
// draw black bars top & bottom if page too narrow

	cinema(offset_y, orig_height, scale);

//------------------------------------------------------- content box
// fix content size

	stylestr = 	'top:'		+ offset_y							+'px;'+
				'left:'		+ offset_x							+'px;'+
				'width:'	+ Math.round(orig_width * scale)	+'px;'+
				'height:'	+ Math.round(orig_height * scale)	+'px;';

	$('#noscroll').attr('style', stylestr);

	throw new Error('end of js');

//------------------------------------------------------- unfinished

	// draw main scrolling content
	content(offset_x + (content_x * scale), orig_height * scale);

	fontsize = math.round(100*conversion);
	$('body').css('font','normal '+fontsize+'px/'+fontsize+'px abel');

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

//------------------------------------------------------- clicks on logo & accueil

	$(document).ready(function() {
		// if you click on welcome image it scrolls a little
		$("#accueil").click(function(event){
		    $('html, body').animate({scrollTop:workh/5}, 300);
		});

		// if you click on logo it goes back to home page
		$("#logo").click(function(event){
			window.location = '/';
		});
	});

//------------------------------------------------------- fin

